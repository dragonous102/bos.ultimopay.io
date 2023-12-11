<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

date_default_timezone_set('Asia/Tokyo');

$base_path = "/var/www/bos.ultimopay.io/bos_pdf_api";
$site_path = "https://bos.ultimopay.io/bos_pdf_api";

use \setasign\Fpdi\Fpdi;
require_once('../classes/fpdf/fpdf.php');

require_once('../classes/fpdi2/src/autoload.php');

$data = array('msg' => 'proc_ok', 'msg_ex' => '', 'whichform' => 0, 'form2_page1_screenshot' => '', 'form2_page4_screenshot' => '');
$session_expired = 1;
if ($session_expired == 1) {

	

	//$data = array('msg' => '', 'msg_ex' => '', 'whichform' => 0, 'form1_signature_newname' => '', 'form2_signature_newname' => '');

	function _log($line) {
        // $base_path = "/home1/webwiqpq/public_html/WEB01/bos_pdf_api";
		// $fl = @fopen($base_path."/log/fileupload-test.log" , 'a');
		// $fline = date('[Ymd H:i:s] ') . $line."\n";
		// fwrite($fl, $fline);
		// fclose($fl );
		//echo date('[Ymd H:i:s] ').$line."\n";
		//@ob_flush(); 
		//flush();
	}
	

	$direction = 'landscape';
	$thefile = (isset($_POST['mydata']))?trim($_POST['mydata']):'';
	$email_address = isset($_POST['email_address'])?($_POST['email_address']):'';
	$profile_id = md5($email_address);	
	$whichform = (isset($_POST['whichform']))?trim($_POST['whichform']):'';
	$direction = (isset($_POST['direction']))?trim($_POST['direction']):'landscape';
	_log("whichform = " . $whichform . ", profile = " . $profile_id . ", direction = " . $direction);
	$img_filename = $profile_id . "_form_" . $whichform . ".png";
	$img_filename_rotate = $profile_id . "_form_" . $whichform . "_rotate.png";
	
	
	if ($profile_id != '') {
		
			
			
			
				//dlkafjsdlafjlsa	
				if ($thefile != '') {
					$encoded_image = explode(",", $thefile)[1];
					$decoded_image = base64_decode($encoded_image);
					file_put_contents($base_path."/jdb/data/upload/" . $img_filename, $decoded_image);
					sleep(1);
					if (file_exists($base_path."/jdb/data/upload/" . $img_filename)) {
						_log("upload thanh cong !");
						//images (300dpi, A4 paper)
						$paper_width_px = 2480;
						$paper_height_px = 3508;
						//////////////////////////////////////////////////////////////
						if (intval($whichform) == 1) {
							//export pdf from templates
							$application_form_1_filename = 'application_form_1_' . $profile_id . '.pdf';
							$application_form_1_temp_page_1_filename = 'application_form_1_' . $profile_id . '_page_1_temp.pdf';
							$application_form_1_temp_page_2_filename = 'application_form_1_' . $profile_id . '_page_2_temp.pdf';
							$application_form_1_screenshot_page_1_filename = 'application_form_1_screenshot_page_1_' . $profile_id . '.png';
							$application_form_1_screenshot_page_2_filename = 'application_form_1_screenshot_page_2_' . $profile_id . '.png';
							$application_form_1_filepath = $base_path.'/jdb/data/download/' . $application_form_1_filename;
							$application_form_1_temp_page_1_filepath = $base_path.'/jdb/data/download/' . $application_form_1_temp_page_1_filename;
							$application_form_1_temp_page_2_filepath = $base_path.'/jdb/data/download/' . $application_form_1_temp_page_2_filename;
							$application_form_1_screenshot_page_1_filepath = $base_path.'/jdb/data/download/' . $application_form_1_screenshot_page_1_filename;
							$application_form_1_screenshot_page_2_filepath = $base_path.'/jdb/data/download/' . $application_form_1_screenshot_page_2_filename;
							/*
							$application_form_2_filename = 'application_form_2_' . $profile_id . '.pdf';
							$application_form_2_screenshot_filename = 'application_form_2_screenshot_' . $profile_id;
							$application_form_2_filepath = $base_path.'/jdb/data/download/' . $application_form_2_filename;
							$application_form_2_screenshot_filepath = $base_path.'/jdb/data/download/' . $application_form_2_screenshot_filename;
							*/
							
							if (file_exists($application_form_1_filepath)) {
								
								//////////////////////////////////////////////////////////
								$paper_scale = 210 / $paper_width_px;
								$myscale = 3.74;
								if ($direction=="portrait") {
									// open the image file
									$im = imagecreatefrompng( $base_path."/jdb/data/upload/" . $img_filename );
									// create a transparent "color" for the areas which will be new after rotation
									// r=255,b=255,g=255 ( white ), 127 = 100% transparency - we choose "invisible black"
									$transparency = imagecolorallocatealpha( $im,255,255,255,0 );

									// rotate, last parameter preserves alpha when true
									$rotated = imagerotate( $im, 270, $transparency, 1);

									//maybe there have make white color is transparent
									$background = imagecolorallocate($rotated , 255,  255,  255);
									imagecolortransparent($rotated,$background);

									// disable blendmode, we want real transparency
									imagealphablending( $rotated, false );
									// set the flag to save full alpha channel information
									imagesavealpha( $rotated, true );

									imagepng( $rotated , $base_path."/jdb/data/upload/" . $img_filename);
									// clean up the garbage
									imagedestroy( $im );
									imagedestroy( $rotated );
								}

								for ($form_1_page = 1; $form_1_page <= 2; $form_1_page++) {
									// initiate FPDI
									$pdf = new Fpdi();							
									//try to export application form 1
									///////////////////////////////////////////////////////////////////////////////////////////
									// get the page count
									$pageCount = $pdf->setSourceFile($application_form_1_filepath);				
									$templateId = $pdf->importPage($form_1_page);							
									$pdf->AddPage();
									$pdf->useImportedPage($templateId, 0, 17, 210 , 268, false);

									// $pdf->Image($base_path."/jdb/data/upload/" . $img_filename, 30, 48, 55, 55/$myscale );
									if($form_1_page == 1) {
										$pdf->Image($base_path."/jdb/data/upload/" . $img_filename, 50, 80, 75, 75/$myscale);
										$pdf->Output($application_form_1_temp_page_1_filepath,'F');
										_log("di duoc den day");
										if (file_exists($application_form_1_temp_page_1_filepath)) {
											//try to export image screenshot for form-1
											@unlink($application_form_1_screenshot_page_1_filepath);
											$formone_url = $application_form_1_temp_page_1_filepath.'[0]'; 
											$imagickObj1 = new Imagick();
											$imagickObj1->setResolution(300,300);
											$imagickObj1->setSize(1400,1979);
											//$imagickObj1->setImageCompression(Imagick::COMPRESSION_PNG); 
											//$imagickObj1->setImageCompressionQuality(100);
											$imagickObj1->readimage($formone_url);
											$imagickObj1->setImageBackgroundColor('#ffffff');
											$imagickObj1->resizeImage(1400,1979,Imagick::FILTER_LANCZOS,1);
											$imagickObj1->setImageFormat("png"); 
											$imagickObj1->writeImage($application_form_1_screenshot_page_1_filepath);
											$imagickObj1->clear();
											$imagickObj1->destroy();

											$data['form1_page1_screenshot'] = $site_path.'/jdb/data/download/' . $application_form_1_screenshot_page_1_filename . "?t=" . time();
											
										}
									} else if($form_1_page == 2) {
										$pdf->Image($base_path."/jdb/data/upload/" . $img_filename, 20, 233, 20, 30/$myscale);
										$pdf->Output($application_form_1_temp_page_2_filepath,'F');
										_log("di duoc den day");
										if (file_exists($application_form_1_temp_page_2_filepath)) {
											//try to export image screenshot for form-1
											@unlink($application_form_1_screenshot_page_2_filepath);
											$formone_url = $application_form_1_temp_page_2_filepath.'[0]'; 
											$imagickObj1 = new Imagick();
											$imagickObj1->setResolution(300,300);
											$imagickObj1->setSize(1400,1979);
											//$imagickObj1->setImageCompression(Imagick::COMPRESSION_PNG); 
											//$imagickObj1->setImageCompressionQuality(100);
											$imagickObj1->readimage($formone_url);
											$imagickObj1->setImageBackgroundColor('#ffffff');
											$imagickObj1->resizeImage(1400,1979,Imagick::FILTER_LANCZOS,1);
											$imagickObj1->setImageFormat("png"); 
											$imagickObj1->writeImage($application_form_1_screenshot_page_2_filepath);
											$imagickObj1->clear();
											$imagickObj1->destroy();

											$data['form1_page2_screenshot'] = $site_path.'/jdb/data/download/' . $application_form_1_screenshot_page_2_filename . "?t=" . time();
											
										}
									}
								}

								$data['msg'] = 'proc_ok';
								$data['whichform'] = intval($whichform);
								
								//////////////////////////////////////////////////////////
								
							} else {
								//todo
							}
						} else if (intval($whichform) == 2) {
							$application_form_2_filename = 'application_form_2_' . $profile_id . '.pdf';
							$application_form_2_temp_page_1_filename = 'application_form_2_' . $profile_id . '_page_1_temp.pdf';
							$application_form_2_temp_page_2_filename = 'application_form_2_' . $profile_id . '_page_2_temp.pdf';
							$application_form_2_temp_page_3_filename = 'application_form_2_' . $profile_id . '_page_3_temp.pdf';
							$application_form_2_temp_page_4_filename = 'application_form_2_' . $profile_id . '_page_4_temp.pdf';
							$application_form_2_screenshot_page_1_filename = 'application_form_2_screenshot_page_1_' . $profile_id . '.png';
							$application_form_2_screenshot_page_4_filename = 'application_form_2_screenshot_page_4_' . $profile_id . '.png';
							$application_form_2_filepath = $base_path.'/jdb/data/download/' . $application_form_2_filename;
							$application_form_2_page_1_temp_filepath = $base_path.'/jdb/data/download/' . $application_form_2_temp_page_1_filename;
							$application_form_2_page_2_temp_filepath = $base_path.'/jdb/data/download/' . $application_form_2_temp_page_2_filename;
							$application_form_2_page_3_temp_filepath = $base_path.'/jdb/data/download/' . $application_form_2_temp_page_3_filename;
							$application_form_2_page_4_temp_filepath = $base_path.'/jdb/data/download/' . $application_form_2_temp_page_4_filename;
							$application_form_2_screenshot_page_1_filepath = $base_path.'/jdb/data/download/' . $application_form_2_screenshot_page_1_filename;
							$application_form_2_screenshot_page_4_filepath = $base_path.'/jdb/data/download/' . $application_form_2_screenshot_page_4_filename;
							
							if (file_exists($application_form_2_filepath)) {
								//////////////////////////////////////////////////////////
								$paper_scale = 210 / $paper_width_px;
								$myscale = 3.74;
								if ($direction=="portrait") {
									// open the image file
									$im = imagecreatefrompng( $base_path."/jdb/data/upload/" . $img_filename );
									// create a transparent "color" for the areas which will be new after rotation
									// r=255,b=255,g=255 ( white ), 127 = 100% transparency - we choose "invisible black"
									$transparency = imagecolorallocatealpha( $im,255,255,255,0 );

									// rotate, last parameter preserves alpha when true
									$rotated = imagerotate( $im, 270, $transparency, 1);

									//maybe there have make white color is transparent
									$background = imagecolorallocate($rotated , 255,  255,  255);
									imagecolortransparent($rotated,$background);

									// disable blendmode, we want real transparency
									imagealphablending( $rotated, false );
									// set the flag to save full alpha channel information
									imagesavealpha( $rotated, true );

									imagepng( $rotated , $base_path."/jdb/data/upload/" . $img_filename);
									// clean up the garbage
									imagedestroy( $im );
									imagedestroy( $rotated );
								}
														
								//try to export application form 1
								///////////////////////////////////////////////////////////////////////////////////////////
								// get the page count
								//$pageCount2 = $pdf->setSourceFile($application_form_2_filepath);	
								for ($page = 1; $page <= 4; $page++) {
									// initiate FPDI
									unset($pdf);
									$pdf = null;
									unset($templateId);
									$templateId = null;
									$pdf = new Fpdi();
									$pageCount2 = $pdf->setSourceFile($application_form_2_filepath);									
									$templateId = $pdf->importPage($page);
									$pdf->AddPage();
									$pdf->useImportedPage($templateId, 0.4, 0, 209 , null, false);
									if ($page==1) {
										//////////////////////////////////////////////////////////////////////////////
										$pdf->Image($base_path."/jdb/data/upload/" . $img_filename, 134, 145, 34, 34/$myscale );
										//$pdf->Image($base_path."/jdb/data/upload/" . $img_filename, 25, 246, 30, 30/$myscale);
										$pdf->Output($application_form_2_page_1_temp_filepath,'F');
										_log("form-2 : xuat duoc PDF trang 1");
										if (file_exists($application_form_2_page_1_temp_filepath)) {
											//try to export image screenshot page 1 for form-2
											@unlink($application_form_2_screenshot_page_1_filepath);
											$formtwo_page_1_url = $application_form_2_page_1_temp_filepath.'[0]'; 
											$imagickObj2a = new Imagick();
											$imagickObj2a->setResolution(300,300);
											$imagickObj2a->setSize(1400,1979);
											//$imagickObj2a->setImageCompression(Imagick::COMPRESSION_PNG); 
											//$imagickObj2a->setImageCompressionQuality(100);
											$imagickObj2a->readimage($formtwo_page_1_url);
											$imagickObj2a->setImageBackgroundColor('#ffffff');
											$imagickObj2a->resizeImage(1400,1979,Imagick::FILTER_LANCZOS,1);
											$imagickObj2a->setImageFormat("png"); 
											$imagickObj2a->writeImage($application_form_2_screenshot_page_1_filepath);
											$imagickObj2a->clear();
											$imagickObj2a->destroy();
											
											$data['form2_page1_screenshot'] = $site_path.'/jdb/data/download/' . $application_form_2_screenshot_page_1_filename . "?t=" . time();
											
										}
										//////////////////////////////////////////////////////////////////////////////
									} else if ($page==2) {
										$pdf->Output($application_form_2_page_2_temp_filepath,'F');
										_log("form-2 : xuat duoc PDF trang 2");
									} else if ($page==3) {
										$pdf->Output($application_form_2_page_3_temp_filepath,'F');
										_log("form-2 : xuat duoc PDF trang 3");
									} else if ($page==4) {
										$pdf->Image($base_path."/jdb/data/upload/" . $img_filename, 26, 231.5, 29, 29/$myscale );
										$pdf->Output($application_form_2_page_4_temp_filepath,'F');
										_log("form-2 : xuat duoc PDF trang 4");
										if (file_exists($application_form_2_page_4_temp_filepath)) {
											//try to export image screenshot page 4 for form-2
											@unlink($application_form_2_screenshot_page_4_filepath);
											$formtwo_page_4_url = $application_form_2_page_4_temp_filepath.'[0]'; 
											$imagickObj2b = new Imagick();
											$imagickObj2b->setResolution(300,300);
											$imagickObj2b->setSize(1400,1979);
											//$imagickObj2b->setImageCompression(Imagick::COMPRESSION_PNG); 
											//$imagickObj2b->setImageCompressionQuality(100);
											$imagickObj2b->readimage($formtwo_page_4_url);
											$imagickObj2b->setImageBackgroundColor('#ffffff');
											$imagickObj2b->resizeImage(1400,1979,Imagick::FILTER_LANCZOS,1);
											$imagickObj2b->setImageFormat("png"); 
											$imagickObj2b->writeImage($application_form_2_screenshot_page_4_filepath);
											$imagickObj2b->clear();
											$imagickObj2b->destroy();
											
											$data['form2_page4_screenshot'] = $site_path.'/jdb/data/download/' . $application_form_2_screenshot_page_4_filename . "?t=" . time();
									
									
										}
									}
									
								}

								if (($data['form2_page1_screenshot'] != '') && ($data['form2_page4_screenshot'] != '')) {
									$data['msg'] = 'proc_ok';
								} else {
									$data['msg'] = 'proc_ng';
								}
								
							} else {
								//todo
							}
						}
						
						
						
						//////////////////////////////////////////////////////////////
						
					} else {
						_log("failed to write to image file !");
						$data['msg'] = 'proc_ng';
						$data['msg_ex'] = 'upload that bai';
					}
					
				} else {
					_log("Error: raw image is empty !");
					$data['msg'] = 'proc_ng';
					$data['msg_ex'] = 'upload that bai';
				}
			
			
		
	} else  {
		_log("Error: profile_id is blank !");
		$data['msg'] = 'proc_ng';
		$data['msg_ex'] = 'upload that bai';
	}

	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	/*
	$thefile = (isset($_POST['signature']))?trim($_POST['signature']):'';

	if ($thefile != '') {
		//////////////////////////////////////////////////////////
		
		
		//selfie with debit card image
		//$selfie_with_card_orig_name = $_FILES['signature']['name'];
		if (is_uploaded_file($_FILES["signature"]["tmp_name"])) {
			_log("is_upload_file ok !");
			$testfile = $base_path."/jdb/data/upload/testfile.png";
			if (move_uploaded_file($_FILES["signature"]["tmp_name"], $testfile)) {
				chmod($testfile, 0644);
				//echo "file size: " . filesize($destination_file);
				_log("file size: " . filesize($testfile));				
				echo 1;
				exit;
				
			} else {
				//echo "failed move_uploaded_file";
				_log("selfie_with_card:: failed move_uploaded_file");
				echo 3;
				exit;
			}
			
		} else {
			//echo "failed is_uploaded_file";
			_log("failed is_uploaded_file");
			echo 3;
			exit;
		}
		
	} else {
		_log("thefile is empty !");		
		echo 3;
		exit;		
	}
	*/
	///////////////////////////////////////////////////////////////////////////////////////////////////
} else {
	$data['msg'] = 'proc_ng2';
	$data['msg_ex'] = 'session has expired !';
}

echo json_encode($data);
die();
	
?>