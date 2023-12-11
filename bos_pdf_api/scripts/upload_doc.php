<?php

use \setasign\Fpdi\Fpdi;

require_once('../classes/fpdf/fpdf.php');
require_once('../classes/fpdi2/src/autoload.php');

$base_path = "/var/www/bos.ultimopay.io/bos_pdf_api";
$site_path = "https://bos.ultimopay.io/bos_pdf_api";
$test_people = array("keisuke@webknock.xyz", "minamide@optlynx.com", "kagya868@fuwari.be", "hebigusu@nezumi.be", "ribadafa@usako.net");
$data = [];
$data['status'] = 1;

// error_reporting(E_ERROR | E_PARSE | E_NOTICE);
// ini_set('display_errors', '1');
function _log($line, $showlog = false)
{

	if ($showlog) {
		// $fl = @fopen($base_path."/log/upload-doc.log" , 'a');
		// $fline = date('[Ymd H:i:s] ') . $line."\n";
		// fwrite($fl, $fline);
		// fclose($fl );

		echo date('[Ymd H:i:s] ').$line."\n";
		@ob_flush(); 
		flush();
	}
}


$jdb_profile_country = '';
$kyc_doc_upload = (isset($_POST['kyc_doc_upload'])) ? trim($_POST['kyc_doc_upload']) : 'no';
$document_type = (isset($_POST['document_type'])) ? trim($_POST['document_type']) : '';

$my_email_address = (isset($_POST['email_address'])) ? $_POST['email_address'] : '';
$my_profile_id = md5($my_email_address);
$mydata = array('passport_open' => '', 'passport_selfie' => '', 'id_card_front' => '', 'id_card_back' => '', 'id_card_selfie' => '');
$id_card_type = 'passport'; //default



/////////////////////////////////////////////////////////////////
//$document_uploaded_ok = 1;
if ($kyc_doc_upload == 'yes') {
	_log("begin uploading kyc photos...");
	$total_files_cnt = 0;
	if ($my_profile_id != '') {
		//////////////////////////////////////////////////////////
		if ($document_type == '1') {

			$kyc_file_path = $base_path . "/jdb/data/upload/id_card_" . $my_profile_id . "*.*";
			$kyc_files = glob($kyc_file_path); // get all file names
			foreach ($kyc_files as $kyc_file) { // iterate files
				if (is_file($kyc_file)) {
					unlink($kyc_file); // delete file
				}
			}

			$passport_open_file_path = $base_path . "/jdb/data/upload/passport_open_" . $my_profile_id . ".*";
			$passport_open_files = glob($passport_open_file_path); // get all file names
			foreach ($passport_open_files as $passport_open_file) { // iterate files
				if (is_file($passport_open_file)) {
					unlink($passport_open_file); // delete file
				}
			}

			$passport_selfie_file_path = $base_path . "/jdb/data/upload/passport_selfie_" . $my_profile_id . ".*";
			$passport_selfie_files = glob($passport_selfie_file_path); // get all file names
			foreach ($passport_selfie_files as $passport_selfie_file) { // iterate files
				if (is_file($passport_selfie_file)) {
					unlink($passport_selfie_file); // delete file
				}
			}

			//passport open image
			$passport_open_orig_name = $_FILES['passport_open']['name'];
			_log("passport_open_orig_name = " . $passport_open_orig_name);
			if (is_uploaded_file($_FILES["passport_open"]["tmp_name"])) {
				$passport_open_file_name_arr = explode('.', $passport_open_orig_name);
				$passport_open_file_name_ext_pos = count($passport_open_file_name_arr) - 1;
				$passport_open_file_ext = strtolower($passport_open_file_name_arr[$passport_open_file_name_ext_pos]);
				$passport_open_file = $base_path . "/jdb/data/upload/passport_open_" . $my_profile_id . '.' . $passport_open_file_ext;
				$passport_open_file_gomi = $base_path . "/jdb/data/upload/passport_open_" . $my_profile_id . '.';
				_log("passport_open_file_ext = " . $passport_open_file_ext);
				_log("passport_open_file = " . $passport_open_file);

				if (move_uploaded_file($_FILES["passport_open"]["tmp_name"], $passport_open_file)) {
					chmod($passport_open_file, 0644);
					//echo "file size: " . filesize($destination_file);
					_log("file size: " . filesize($passport_open_file));
					$total_files_cnt++;
					$mydata['passport_open'] = "passport_open_" . $my_profile_id . '.' . $passport_open_file_ext;
				} else {
					//echo "failed move_uploaded_file";
					_log("passport_open:: failed move_uploaded_file");
				}
			} else {
				//echo "failed is_uploaded_file";
				_log("passport_open:: failed is_uploaded_file");
			}

			//selfie photo with passport
			$passport_selfie_orig_name = $_FILES['passport_selfie']['name'];
			_log("passport_selfie_orig_name = " . $passport_selfie_orig_name);
			if (is_uploaded_file($_FILES["passport_selfie"]["tmp_name"])) {
				$passport_selfie_file_name_arr = explode('.', $passport_selfie_orig_name);
				$passport_selfie_file_name_ext_pos = count($passport_selfie_file_name_arr) - 1;
				$passport_selfie_file_ext = strtolower($passport_selfie_file_name_arr[$passport_selfie_file_name_ext_pos]);
				$passport_selfie_file = $base_path . "/jdb/data/upload/passport_selfie_" . $my_profile_id . '.' . $passport_selfie_file_ext;
				$passport_selfie_file_gomi = $base_path . "/jdb/data/upload/passport_selfie_" . $my_profile_id . '.';
				_log("passport_selfie_file_ext = " . $passport_selfie_file_ext);
				_log("passport_selfie_file = " . $passport_selfie_file);

				if (move_uploaded_file($_FILES["passport_selfie"]["tmp_name"], $passport_selfie_file)) {
					chmod($passport_selfie_file, 0644);
					//echo "file size: " . filesize($destination_file);
					_log("file size: " . filesize($passport_selfie_file));
					$total_files_cnt++;
					$mydata['passport_selfie'] = "passport_selfie_" . $my_profile_id . '.' . $passport_selfie_file_ext;
				} else {
					//echo "failed move_uploaded_file";
					_log("passport_selfie:: failed move_uploaded_file");
				}
			} else {
				//echo "failed is_uploaded_file";
				_log("passport_selfie:: failed is_uploaded_file");
			}

			if ($total_files_cnt == 2) {
				$document_uploaded_ok = 1;
			}

			@unlink($passport_open_file_gomi);
			@unlink($passport_selfie_file_gomi);

			/*
			$id_card_front = $base_path."/jdb/data/upload/id_card_" . $_SESSION['ultimopay_profile_id'] . '_front.*';
			$id_card_back = $base_path."/jdb/data/upload/id_card_" . $_SESSION['ultimopay_profile_id'] . '_back.*';
			@unlink($id_card_front);
			@unlink($id_card_back);
			*/
		} else if ($document_type == '2') {


			$kyc_file_path = $base_path . "/jdb/data/upload/id_card_" . $my_profile_id . "*.*";
			$kyc_files = glob($kyc_file_path); // get all file names
			foreach ($kyc_files as $kyc_file) { // iterate files
				if (is_file($kyc_file)) {
					unlink($kyc_file); // delete file
				}
			}

			$passport_open_file_path = $base_path . "/jdb/data/upload/passport_open_" . $my_profile_id . ".*";
			$passport_open_files = glob($passport_open_file_path); // get all file names
			foreach ($passport_open_files as $passport_open_file) { // iterate files
				if (is_file($passport_open_file)) {
					unlink($passport_open_file); // delete file
				}
			}

			$passport_selfie_file_path = $base_path . "/jdb/data/upload/passport_selfie_" . $my_profile_id . ".*";
			$passport_selfie_files = glob($passport_selfie_file_path); // get all file names
			foreach ($passport_selfie_files as $passport_selfie_file) { // iterate files
				if (is_file($passport_selfie_file)) {
					unlink($passport_selfie_file); // delete file
				}
			}

			//id card front image
			$id_card_front_orig_name = $_FILES['id_card_front']['name'];
			_log("id_card_front_orig_name = " . $id_card_front_orig_name);
			if (is_uploaded_file($_FILES["id_card_front"]["tmp_name"])) {
				$id_card_front_file_name_arr = explode('.', $id_card_front_orig_name);
				$id_card_front_file_name_ext_pos = count($id_card_front_file_name_arr) - 1;
				$id_card_front_file_ext = strtolower($id_card_front_file_name_arr[$id_card_front_file_name_ext_pos]);
				$id_card_front_file = $base_path . "/jdb/data/upload/id_card_" . $my_profile_id . '_front.' . $id_card_front_file_ext;
				$id_card_front_file_gomi = $base_path . "/jdb/data/upload/id_card_" . $my_profile_id . '_front.';
				_log("id_card_front_file_ext = " . $id_card_front_file_ext);
				_log("id_card_front_file = " . $id_card_front_file);

				if (move_uploaded_file($_FILES["id_card_front"]["tmp_name"], $id_card_front_file)) {
					chmod($id_card_front_file, 0644);
					//echo "file size: " . filesize($destination_file);
					_log("file size: " . filesize($id_card_front_file));
					$total_files_cnt++;
					$mydata['id_card_front'] = "id_card_" . $my_profile_id . '_front.' . $id_card_front_file_ext;
				} else {
					//echo "failed move_uploaded_file";
					_log("id_card_front:: failed move_uploaded_file");
				}
			} else {
				//echo "failed is_uploaded_file";
				_log("id_card_front:: failed is_uploaded_file");
			}

			//id card back image
			$id_card_back_orig_name = $_FILES['id_card_back']['name'];
			_log("id_card_back_orig_name = " . $id_card_back_orig_name);
			if (is_uploaded_file($_FILES["id_card_back"]["tmp_name"])) {
				$id_card_back_file_name_arr = explode('.', $id_card_back_orig_name);
				$id_card_back_file_name_ext_pos = count($id_card_back_file_name_arr) - 1;
				$id_card_back_file_ext = strtolower($id_card_back_file_name_arr[$id_card_back_file_name_ext_pos]);
				$id_card_back_file = $base_path . "/jdb/data/upload/id_card_" . $my_profile_id . '_back.' . $id_card_back_file_ext;
				$id_card_back_file_gomi = $base_path . "/jdb/data/upload/id_card_" . $my_profile_id . '_back.';
				_log("id_card_back_file_ext = " . $id_card_back_file_ext);
				_log("id_card_back_file = " . $id_card_back_file);

				if (move_uploaded_file($_FILES["id_card_back"]["tmp_name"], $id_card_back_file)) {
					chmod($id_card_back_file, 0644);
					//echo "file size: " . filesize($destination_file);
					_log("file size: " . filesize($id_card_back_file));
					$total_files_cnt++;
					$mydata['id_card_back'] = "id_card_" . $my_profile_id . '_back.' . $id_card_back_file_ext;
				} else {
					//echo "failed move_uploaded_file";
					_log("id_card_back:: failed move_uploaded_file");
				}
			} else {
				//echo "failed is_uploaded_file";
				_log("id_card_back:: failed is_uploaded_file");
			}

			//id card selfie image
			$id_card_selfie_orig_name = $_FILES['id_card_selfie']['name'];
			_log("id_card_selfie_orig_name = " . $id_card_selfie_orig_name);
			if (is_uploaded_file($_FILES["id_card_selfie"]["tmp_name"])) {
				$id_card_selfie_file_name_arr = explode('.', $id_card_selfie_orig_name);
				$id_card_selfie_file_name_ext_pos = count($id_card_selfie_file_name_arr) - 1;
				$id_card_selfie_file_ext = strtolower($id_card_selfie_file_name_arr[$id_card_selfie_file_name_ext_pos]);
				$id_card_selfie_file = $base_path . "/jdb/data/upload/id_card_" . $my_profile_id . '_selfie.' . $id_card_selfie_file_ext;
				$id_card_selfie_file_gomi = $base_path . "/jdb/data/upload/id_card_" . $my_profile_id . '_selfie.';
				_log("id_card_selfie_file_ext = " . $id_card_selfie_file_ext);
				_log("id_card_selfie_file = " . $id_card_selfie_file);

				if (move_uploaded_file($_FILES["id_card_selfie"]["tmp_name"], $id_card_selfie_file)) {
					chmod($id_card_selfie_file, 0644);
					//echo "file size: " . filesize($destination_file);
					_log("file size: " . filesize($id_card_selfie_file));
					$total_files_cnt++;
					$mydata['id_card_selfie'] = "id_card_" . $my_profile_id . '_selfie.' . $id_card_selfie_file_ext;
				} else {
					//echo "failed move_uploaded_file";
					_log("id_card_selfie:: failed move_uploaded_file");
				}
			} else {
				//echo "failed is_uploaded_file";
				_log("id_card_selfie:: failed is_uploaded_file");
			}

			if ($total_files_cnt == 3) {
				$document_uploaded_ok = 1;
			}

			@unlink($id_card_front_file_gomi);
			@unlink($id_card_back_file_gomi);
			@unlink($id_card_selfie_file_gomi);
		} else {
			//todo
		}
		//////////////////////////////////////////////////////////

		$paper_width_px = 2480;
		$paper_height_px = 3508;
		if ($document_type == '1') {

			//// PASSPORT OPEN ///////////////////////////////////////////////////

			$passport_open_img_path = $base_path . '/jdb/data/upload/' . $mydata['passport_open'];
			$passport_open_exif = exif_read_data($passport_open_img_path);
			//foreach ($passport_open_exif as $key => $section) {
			//	foreach ($section as $name => $val) {
			//		echo "$key.$name: $val<br />\n";
			//	}
			//}			

			$passport_open_file_name_arr2 = explode('.', $mydata['passport_open']);
			$passport_open_file_name_ext_pos2 = count($passport_open_file_name_arr2) - 1;
			$passport_open_file_ext2 = strtolower($passport_open_file_name_arr2[$passport_open_file_name_ext_pos2]);

			if (($passport_open_file_ext2 == 'jpg') || ($passport_open_file_ext2 == 'jpeg')) {
				$passport_open_img_obj = @imagecreatefromjpeg($passport_open_img_path);
				if (!$passport_open_img_obj) {
					_log("passport_open::error imagecreatefromjpeg !");
				} else {


					if (!empty($passport_open_exif['Orientation'])) {
						_log("passport_open: orientation = " . $passport_open_exif['Orientation']);
						switch ($passport_open_exif['Orientation']) {
							case 3:
								$passport_open_rotate_img = imagerotate($passport_open_img_obj, 180, 0);
								unlink($passport_open_img_path);
								imagejpeg($passport_open_rotate_img, $passport_open_img_path);
								@imagedestroy($passport_open_rotate_img);
								@imagedestroy($passport_open_img_obj);
								break;

							case 6:
								$passport_open_rotate_img = imagerotate($passport_open_img_obj, -90, 0);
								unlink($passport_open_img_path);
								imagejpeg($passport_open_rotate_img, $passport_open_img_path);
								@imagedestroy($passport_open_rotate_img);
								@imagedestroy($passport_open_img_obj);
								break;

							case 8:
								$passport_open_rotate_img = imagerotate($passport_open_img_obj, 90, 0);
								unlink($passport_open_img_path);
								imagejpeg($passport_open_rotate_img, $passport_open_img_path);
								@imagedestroy($passport_open_rotate_img);
								@imagedestroy($passport_open_img_obj);
								break;
						}
					} else {
						_log("passport_open: cannot get orientation");
					}
				}
			} else if ($passport_open_file_ext2 == 'png') {
				if ($passport_open_exif !== false) {
					///////////////////////////////////////////////////////////////////////
					$imagick_image = new Imagick($passport_open_img_path);
					$imagick_image->writeImage("png24:$passport_open_img_path");
					$passport_open_img_obj = @imagecreatefrompng($passport_open_img_path);
					if (!$passport_open_img_obj) {
						_log("passport_open::error imagecreatefrompng !");
					} else {
						if (!empty($passport_open_exif['Orientation'])) {
							_log("passport_open: orientation = " . $passport_open_exif['Orientation']);
							switch ($passport_open_exif['Orientation']) {
								case 3:
									$passport_open_rotate_img = imagerotate($passport_open_img_obj, 180, 0);
									unlink($passport_open_img_path);
									imagepng($passport_open_rotate_img, $passport_open_img_path);
									@imagedestroy($passport_open_rotate_img);
									@imagedestroy($passport_open_img_obj);
									break;

								case 6:
									$passport_open_rotate_img = imagerotate($passport_open_img_obj, -90, 0);
									unlink($passport_open_img_path);
									imagepng($passport_open_rotate_img, $passport_open_img_path);
									@imagedestroy($passport_open_rotate_img);
									@imagedestroy($passport_open_img_obj);
									break;

								case 8:
									$passport_open_rotate_img = imagerotate($passport_open_img_obj, 90, 0);
									unlink($passport_open_img_path);
									imagepng($passport_open_rotate_img, $passport_open_img_path);
									@imagedestroy($passport_open_rotate_img);
									@imagedestroy($passport_open_img_obj);
									break;
							}
						} else {
							_log("passport_open: cannot get orientation");
						}
					}
					///////////////////////////////////////////////////////////////////////
				} else {
					_log("cannot get png info !!!");
				}
			}

			list($passport_open_img_w, $passport_open_img_h, $passport_open_img_type, $passport_open_img_attr) = getimagesize($passport_open_img_path);
			_log("pasport_open: " . $passport_open_img_w . " / " . $passport_open_img_h);

			$passport_open_img_scale = floatval($passport_open_img_w / $passport_open_img_h);
			$passport_open_img_mm_w = floatval($passport_open_img_w * 210 / $paper_width_px);
			$passport_open_img_mm_h = floatval($passport_open_img_h * 210 / $paper_width_px);
			_log("pasport_open (mm): " . $passport_open_img_mm_w . " / " . $passport_open_img_mm_h);
			if ($passport_open_img_mm_w > 190) {
				$passport_open_img_mm_w = 190;
				if ($passport_open_img_scale == 1) {
					$passport_open_img_mm_h = $passport_open_img_mm_w;
				} else {
					$passport_open_img_mm_h = floatval($passport_open_img_mm_w / $passport_open_img_scale);
				}
				_log("pasport_open (mm)(fit): " . $passport_open_img_mm_w . " / " . $passport_open_img_mm_h);
			} else {
				if ($passport_open_img_mm_w < 120) {
					_log("make passport_open_img bigger...");
					$passport_open_img_mm_w = 190;
					if ($passport_open_img_scale == 1) {
						$passport_open_img_mm_h = $passport_open_img_mm_w;
					} else {
						$passport_open_img_mm_h = floatval($passport_open_img_mm_w / $passport_open_img_scale);
					}
					_log("pasport_open (mm)(fit): " . $passport_open_img_mm_w . " / " . $passport_open_img_mm_h);
				}
			}

			if ($passport_open_img_mm_h > 247) {
				$passport_open_img_mm_h = 247;
				$passport_open_img_mm_w = floatval(247 / 1.414);
			}
		} else if ($document_type == '2') {

			//// ID CARD FRONT ///////////////////////////////////////////////////

			$id_card_front_img_path = $base_path . '/jdb/data/upload/' . $mydata['id_card_front'];
			$id_card_front_exif = exif_read_data($id_card_front_img_path);
			//foreach ($id_card_front_exif as $key => $section) {
			//	foreach ($section as $name => $val) {
			//		echo "$key.$name: $val<br />\n";
			//	}
			//}			

			$id_card_front_file_name_arr2 = explode('.', $mydata['id_card_front']);
			$id_card_front_file_name_ext_pos2 = count($id_card_front_file_name_arr2) - 1;
			$id_card_front_file_ext2 = strtolower($id_card_front_file_name_arr2[$id_card_front_file_name_ext_pos2]);

			if (($id_card_front_file_ext2 == 'jpg') || ($id_card_front_file_ext2 == 'jpeg')) {
				$id_card_front_img_obj = @imagecreatefromjpeg($id_card_front_img_path);
				if (!$id_card_front_img_obj) {
					_log("id_card_front::error imagecreatefromjpeg !");
				} else {
					if (!empty($id_card_front_exif['Orientation'])) {
						_log("id_card_front: orientation = " . $id_card_front_exif['Orientation']);
						switch ($id_card_front_exif['Orientation']) {
							case 3:
								$id_card_front_rotate_img = imagerotate($id_card_front_img_obj, 180, 0);
								unlink($id_card_front_img_path);
								imagejpeg($id_card_front_rotate_img, $id_card_front_img_path);
								@imagedestroy($id_card_front_rotate_img);
								@imagedestroy($id_card_front_img_obj);
								break;

							case 6:
								$id_card_front_rotate_img = imagerotate($id_card_front_img_obj, -90, 0);
								unlink($id_card_front_img_path);
								imagejpeg($id_card_front_rotate_img, $id_card_front_img_path);
								@imagedestroy($id_card_front_rotate_img);
								@imagedestroy($id_card_front_img_obj);
								break;

							case 8:
								$id_card_front_rotate_img = imagerotate($id_card_front_img_obj, 90, 0);
								unlink($id_card_front_img_path);
								imagejpeg($id_card_front_rotate_img, $id_card_front_img_path);
								@imagedestroy($id_card_front_rotate_img);
								@imagedestroy($id_card_front_img_obj);
								break;
						}
					} else {
						_log("id_card_front: error cannot get orientation");
					}
				}
			} else if ($id_card_front_file_ext2 == 'png') {
				$imagick_image = new Imagick($id_card_front_img_path);
				$imagick_image->writeImage("png24:$id_card_front_img_path");
				$id_card_front_img_obj = @imagecreatefrompng($id_card_front_img_path);
				if (!$id_card_front_img_obj) {
					_log("id_card_front::error imagecreatefrompng !");
				} else {
					if (!empty($id_card_front_exif['Orientation'])) {
						_log("id_card_front: orientation = " . $id_card_front_exif['Orientation']);
						switch ($id_card_front_exif['Orientation']) {
							case 3:
								$id_card_front_rotate_img = imagerotate($id_card_front_img_obj, 180, 0);
								unlink($id_card_front_img_path);
								imagepng($id_card_front_rotate_img, $id_card_front_img_path);
								@imagedestroy($id_card_front_rotate_img);
								@imagedestroy($id_card_front_img_obj);
								break;

							case 6:
								$id_card_front_rotate_img = imagerotate($id_card_front_img_obj, -90, 0);
								unlink($id_card_front_img_path);
								imagepng($id_card_front_rotate_img, $id_card_front_img_path);
								@imagedestroy($id_card_front_rotate_img);
								@imagedestroy($id_card_front_img_obj);
								break;

							case 8:
								$id_card_front_rotate_img = imagerotate($id_card_front_img_obj, 90, 0);
								unlink($id_card_front_img_path);
								imagepng($id_card_front_rotate_img, $id_card_front_img_path);
								@imagedestroy($id_card_front_rotate_img);
								@imagedestroy($id_card_front_img_obj);
								break;
						}
					} else {
						_log("id_card_front: cannot get orientation");
					}
				}
			}

			list($id_card_front_img_w, $id_card_front_img_h, $id_card_front_img_type, $id_card_front_img_attr) = getimagesize($id_card_front_img_path);
			_log("id_card_front: " . $id_card_front_img_w . " / " . $id_card_front_img_h);

			$id_card_front_img_scale = floatval($id_card_front_img_w / $id_card_front_img_h);
			$id_card_front_img_mm_w = floatval($id_card_front_img_w * 210 / $paper_width_px);
			$id_card_front_img_mm_h = floatval($id_card_front_img_h * 210 / $paper_width_px);
			_log("id_card_front (mm): " . $id_card_front_img_mm_w . " / " . $id_card_front_img_mm_h);
			if ($id_card_front_img_mm_w > 190) {
				$id_card_front_img_mm_w = 190;
				if ($id_card_front_img_scale == 1) {
					$id_card_front_img_mm_h = $id_card_front_img_mm_w;
				} else {
					$id_card_front_img_mm_h = floatval($id_card_front_img_mm_w / $id_card_front_img_scale);
				}
			} else {
				if ($id_card_front_img_mm_w < 120) {
					_log("make id_card_front_img bigger...");
					$id_card_front_img_mm_w = 190;
					if ($id_card_front_img_scale == 1) {
						$id_card_front_img_mm_h = $id_card_front_img_mm_w;
					} else {
						$id_card_front_img_mm_h = floatval($id_card_front_img_mm_w / $id_card_front_img_scale);
					}
				}
			}

			if ($id_card_front_img_mm_h > 247) {
				$id_card_front_img_mm_h = 247;
				$id_card_front_img_mm_w = floatval(247 / 1.414);
			}


			//// ID CARD BACK ///////////////////////////////////////////////////


			$id_card_back_img_path = $base_path . '/jdb/data/upload/' . $mydata['id_card_back'];
			$id_card_back_exif = exif_read_data($id_card_back_img_path);
			//foreach ($id_card_back_exif as $key => $section) {
			//	foreach ($section as $name => $val) {
			//		echo "$key.$name: $val<br />\n";
			//	}
			//}			

			$id_card_back_file_name_arr2 = explode('.', $mydata['id_card_back']);
			$id_card_back_file_name_ext_pos2 = count($id_card_back_file_name_arr2) - 1;
			$id_card_back_file_ext2 = strtolower($id_card_back_file_name_arr2[$id_card_back_file_name_ext_pos2]);

			if (($id_card_back_file_ext2 == 'jpg') || ($id_card_back_file_ext2 == 'jpeg')) {
				$id_card_back_img_obj = @imagecreatefromjpeg($id_card_back_img_path);
				if (!$id_card_back_img_obj) {
					_log("id_card_back::error imagecreatefromjpeg !");
				} else {
					if (!empty($id_card_back_exif['Orientation'])) {
						_log("id_card_back: orientation = " . $id_card_back_exif['Orientation']);
						switch ($id_card_back_exif['Orientation']) {
							case 3:
								$id_card_back_rotate_img = imagerotate($id_card_back_img_obj, 180, 0);
								unlink($id_card_back_img_path);
								imagejpeg($id_card_back_rotate_img, $id_card_back_img_path);
								@imagedestroy($id_card_back_rotate_img);
								@imagedestroy($id_card_back_img_obj);
								break;

							case 6:
								$id_card_back_rotate_img = imagerotate($id_card_back_img_obj, -90, 0);
								unlink($id_card_back_img_path);
								imagejpeg($id_card_back_rotate_img, $id_card_back_img_path);
								@imagedestroy($id_card_back_rotate_img);
								@imagedestroy($id_card_back_img_obj);
								break;

							case 8:
								$id_card_back_rotate_img = imagerotate($id_card_back_img_obj, 90, 0);
								unlink($id_card_back_img_path);
								imagejpeg($id_card_back_rotate_img, $id_card_back_img_path);
								@imagedestroy($id_card_back_rotate_img);
								@imagedestroy($id_card_back_img_obj);
								break;
						}
					} else {
						_log("id_card_back: error cannot get orientation");
					}
				}
			} else if ($id_card_back_file_ext2 == 'png') {
				$imagick_image2 = new Imagick($id_card_back_img_path);
				$imagick_image2->writeImage("png24:$id_card_back_img_path");
				$id_card_back_img_obj = @imagecreatefrompng($id_card_back_img_path);
				if (!$id_card_back_img_obj) {
					_log("id_card_back::error imagecreatefrompng !");
				} else {
					if (!empty($id_card_back_exif['Orientation'])) {
						_log("id_card_back: orientation = " . $id_card_back_exif['Orientation']);
						switch ($id_card_back_exif['Orientation']) {
							case 3:
								$id_card_back_rotate_img = imagerotate($id_card_back_img_obj, 180, 0);
								unlink($id_card_back_img_path);
								imagepng($id_card_back_rotate_img, $id_card_back_img_path);
								@imagedestroy($id_card_back_rotate_img);
								@imagedestroy($id_card_back_img_obj);
								break;

							case 6:
								$id_card_back_rotate_img = imagerotate($id_card_back_img_obj, -90, 0);
								unlink($id_card_back_img_path);
								imagepng($id_card_back_rotate_img, $id_card_back_img_path);
								@imagedestroy($id_card_back_rotate_img);
								@imagedestroy($id_card_back_img_obj);
								break;

							case 8:
								$id_card_back_rotate_img = imagerotate($id_card_back_img_obj, 90, 0);
								unlink($id_card_back_img_path);
								imagepng($id_card_back_rotate_img, $id_card_back_img_path);
								@imagedestroy($id_card_back_rotate_img);
								@imagedestroy($id_card_back_img_obj);
								break;
						}
					} else {
						_log("id_card_back: cannot get orientation");
					}
				}
			}

			list($id_card_back_img_w, $id_card_back_img_h, $id_card_back_img_type, $id_card_back_img_attr) = getimagesize($id_card_back_img_path);
			_log("id_card_back: " . $id_card_back_img_w . " / " . $id_card_back_img_h);

			$id_card_back_img_scale = floatval($id_card_back_img_w / $id_card_back_img_h);
			$id_card_back_img_mm_w = floatval($id_card_back_img_w * 210 / $paper_width_px);
			$id_card_back_img_mm_h = floatval($id_card_back_img_h * 210 / $paper_width_px);
			_log("id_card_back (mm): " . $id_card_back_img_mm_w . " / " . $id_card_back_img_mm_h);
			if ($id_card_back_img_mm_w > 190) {
				$id_card_back_img_mm_w = 190;
				if ($id_card_back_img_scale == 1) {
					$id_card_back_img_mm_h = $id_card_back_img_mm_w;
				} else {
					$id_card_back_img_mm_h = floatval($id_card_back_img_mm_w / $id_card_back_img_scale);
				}
			} else {
				if ($id_card_back_img_mm_w < 120) {
					_log("make id_card_back_img bigger...");
					$id_card_back_img_mm_w = 190;
					if ($id_card_back_img_scale == 1) {
						$id_card_back_img_mm_h = $id_card_back_img_mm_w;
					} else {
						$id_card_back_img_mm_h = floatval($id_card_back_img_mm_w / $id_card_back_img_scale);
					}
				}
			}

			if ($id_card_back_img_mm_h > 247) {
				$id_card_back_img_mm_h = 247;
				$id_card_back_img_mm_w = floatval(247 / 1.414);
			}
		}


		//generate final pdf
		$template_arr = array();

		$template_arr[0] = $base_path . '/jdb/data/download/application_form_1_' . $my_profile_id . '_page_1_temp.pdf';
		$template_arr[1] = $base_path . '/jdb/data/download/application_form_1_' . $my_profile_id . '_page_2_temp.pdf';
		$template_arr[2] = $base_path . '/jdb/data/download/application_form_2_' . $my_profile_id . '_page_1_temp.pdf';
		$template_arr[3] = $base_path . '/jdb/data/download/application_form_2_' . $my_profile_id . '_page_2_temp.pdf';
		$template_arr[4] = $base_path . '/jdb/data/download/application_form_2_' . $my_profile_id . '_page_3_temp.pdf';
		$template_arr[5] = $base_path . '/jdb/data/download/application_form_2_' . $my_profile_id . '_page_4_temp.pdf';

		$myscale = 3.74;
		//$pdf = new Fpdi();
		$pdf = new Fpdi('P', 'mm', array(210, 297));
		$pdf->SetAutoPageBreak(false);
		for ($page_cnt = 0; $page_cnt < count($template_arr); $page_cnt++) {
			$pageCount = $pdf->setSourceFile($template_arr[$page_cnt]);
			$curpage = $pdf->importPage(1);
			//$spec = $pdf->getImportedPageSize($curpage);
			$pdf->AddPage();
			$pdf->useTemplate($curpage);
			//$pdf->useImportedPage($application_form01_page01, 0, 0, $spec['width'] , $spec['height'], false);


			if ($page_cnt == 0) {

				if ($document_type == '1') {

					/// PASSPORT OPEN ////////////////////////////////////////////
					list($width, $height) = getimagesize($passport_open_img_path);
					$ratio = $width / $height;

					// Calculate the maximum image size that fits the page width and height
					$page_width = 180; // page width
					$page_height = 80; // page height
					$max_width = $page_width - 25; // allow some margin
					$max_height = $page_height - 25; // allow some margin
					$max_ratio = $max_width / $max_height;
					if ($ratio > $max_ratio) {
						$image_width = $max_width;
						$image_height = $image_width / $ratio;
					} else {
						$image_height = $max_height;
						$image_width = $image_height * $ratio;
					}

					// Center the image vertically and horizontally
					$x = ($page_width) / 2;
					$y = 120;

					// Add the image to the PDF
					$pdf->Image($passport_open_img_path, $x, $y, $image_width, $image_height);

					//
				} else if ($document_type == '2') {

					/// ID CARD FRONT ////////////////////////////////////////////

					// Calculate the image width and height ratio
					list($width, $height) = getimagesize($id_card_front_img_path);
					$ratio = $width / $height;

					// Calculate the maximum image size that fits the page width and height
					$page_width = 180; // page width
					$page_height = 80; // page height
					$max_width = $page_width - 25; // allow some margin
					$max_height = $page_height - 25; // allow some margin
					$max_ratio = $max_width / $max_height;
					if ($ratio > $max_ratio) {
						$image_width = $max_width;
						$image_height = $image_width / $ratio;
					} else {
						$image_height = $max_height;
						$image_width = $image_height * $ratio;
					}

					// Center the image vertically and horizontally
					$x = 25;
					$y = 120;

					// Add the image to the PDF
					$pdf->Image($id_card_front_img_path, $x, $y, $image_width, $image_height);


					/// ID CARD BACK ////////////////////////////////////////////

					// Calculate the image width and height ratio
					list($width, $height) = getimagesize($id_card_back_img_path);
					$ratio = $width / $height;

					// Calculate the maximum image size that fits the page width and height
					$page_width = 180; // page width
					$page_height = 80; // page height
					$max_width = $page_width - 25; // allow some margin
					$max_height = $page_height - 25; // allow some margin
					$max_ratio = $max_width / $max_height;
					if ($ratio > $max_ratio) {
						$image_width = $max_width;
						$image_height = $image_width / $ratio;
					} else {
						$image_height = $max_height;
						$image_width = $image_height * $ratio;
					}

					// Center the image vertically and horizontally
					$x = $x + $image_width + 30;
					$y = 120;

					// Add the image to the PDF
					$pdf->Image($id_card_back_img_path, $x, $y, $image_width, $image_height);
				}
			}
		}
		//$pdf->useImportedPage($application_form01_page01, 0, 0, 209 , null, false);
		//$pdf->useTemplate($application_form01_page01);

		//images (300dpi, A4 paper)


		if ($document_type == '1') {

			//passport open image
			$pdf->AddPage();
			$passport_open_img_path = $base_path . '/jdb/data/upload/' . $mydata['passport_open'];


			$signature1 = $base_path . "/jdb/data/upload/" . $my_profile_id . "_form_1.png";
			// Calculate the image width and height ratio
			list($width, $height) = getimagesize($passport_open_img_path);
			$ratio = $width / $height;

			// Calculate the maximum image size that fits the page width and height
			$page_width = 210; // page width
			$page_height = 297; // page height
			$max_width = $page_width - 100; // allow some margin
			$max_height = $page_height - 100; // allow some margin
			$max_ratio = $max_width / $max_height;
			if ($ratio > $max_ratio) {
				$image_width = $max_width;
				$image_height = $image_width / $ratio;
			} else {
				$image_height = $max_height;
				$image_width = $image_height * $ratio;
			}

			// Center the image vertically and horizontally
			$x = ($page_width - $image_width) / 2;
			$y = ($page_height - $image_height) / 2;

			// Add the image to the PDF
			$pdf->Image($passport_open_img_path, $x, $y, $image_width, $image_height);
			$fd = 260;
			$pdf->Image($signature1, 100, $fd, 50, 50 / 3.74);
			//echo $fd ; echo '<br>';



			//passport_selfie image
			$pdf->AddPage();
			$passport_selfie_img_path = $base_path . '/jdb/data/upload/' . $mydata['passport_selfie'];
			$passport_selfie_exif = exif_read_data($passport_selfie_img_path);
			//foreach ($passport_selfie_exif as $key => $section) {
			//	foreach ($section as $name => $val) {
			//		echo "$key.$name: $val<br />\n";
			//	}
			//}			

			$passport_selfie_file_name_arr2 = explode('.', $mydata['passport_selfie']);
			$passport_selfie_file_name_ext_pos2 = count($passport_selfie_file_name_arr2) - 1;
			$passport_selfie_file_ext2 = strtolower($passport_selfie_file_name_arr2[$passport_selfie_file_name_ext_pos2]);

			if (($passport_selfie_file_ext2 == 'jpg') || ($passport_selfie_file_ext2 == 'jpeg')) {
				$passport_selfie_img_obj = @imagecreatefromjpeg($passport_selfie_img_path);
				if (!$passport_selfie_img_obj) {
					_log("error imagecreatefromjpeg !");
				} else {


					if (!empty($passport_selfie_exif['Orientation'])) {
						_log("passport_selfie: orientation = " . $passport_selfie_exif['Orientation']);
						switch ($passport_selfie_exif['Orientation']) {
							case 3:
								$passport_selfie_rotate_img = imagerotate($passport_selfie_img_obj, 180, 0);
								unlink($passport_selfie_img_path);
								imagejpeg($passport_selfie_rotate_img, $passport_selfie_img_path);
								@imagedestroy($passport_selfie_rotate_img);
								@imagedestroy($passport_selfie_img_obj);
								break;

							case 6:
								$passport_selfie_rotate_img = imagerotate($passport_selfie_img_obj, -90, 0);
								unlink($passport_selfie_img_path);
								imagejpeg($passport_selfie_rotate_img, $passport_selfie_img_path);
								@imagedestroy($passport_selfie_rotate_img);
								@imagedestroy($passport_selfie_img_obj);
								break;

							case 8:
								$passport_selfie_rotate_img = imagerotate($passport_selfie_img_obj, 90, 0);
								unlink($passport_selfie_img_path);
								imagejpeg($passport_selfie_rotate_img, $passport_selfie_img_path);
								@imagedestroy($passport_selfie_rotate_img);
								@imagedestroy($passport_selfie_img_obj);
								break;
						}
					} else {
						_log("passport_selfie: cannot get orientation");
					}
				}
			} else if ($passport_selfie_file_ext2 == 'png') {
				$imagick_image2 = new Imagick($passport_selfie_img_path);
				$imagick_image2->writeImage("png24:$passport_selfie_img_path");
				$passport_selfie_img_obj = @imagecreatefrompng($passport_selfie_img_path);
				if (!$passport_selfie_img_obj) {
					_log("passport_selfie::error imagecreatefrompng !");
				} else {
					if (!empty($passport_selfie_exif['Orientation'])) {
						_log("passport_selfie: orientation = " . $passport_selfie_exif['Orientation']);
						switch ($passport_open_exif['Orientation']) {
							case 3:
								$passport_selfie_rotate_img = imagerotate($passport_selfie_img_obj, 180, 0);
								unlink($passport_selfie_img_path);
								imagepng($passport_selfie_rotate_img, $passport_selfie_img_path);
								@imagedestroy($passport_selfie_rotate_img);
								@imagedestroy($passport_selfie_img_obj);
								break;

							case 6:
								$passport_selfie_rotate_img = imagerotate($passport_selfie_img_obj, -90, 0);
								unlink($passport_selfie_img_path);
								imagepng($passport_selfie_rotate_img, $passport_selfie_img_path);
								@imagedestroy($passport_selfie_rotate_img);
								@imagedestroy($passport_selfie_img_obj);
								break;

							case 8:
								$passport_selfie_rotate_img = imagerotate($passport_selfie_img_obj, 90, 0);
								unlink($passport_selfie_img_path);
								imagepng($passport_selfie_rotate_img, $passport_selfie_img_path);
								@imagedestroy($passport_selfie_rotate_img);
								@imagedestroy($passport_selfie_img_obj);
								break;
						}
					} else {
						_log("passport_selfie: cannot get orientation");
					}
				}
			}

			list($passport_selfie_img_w, $passport_selfie_img_h, $passport_selfie_img_type, $passport_selfie_img_attr) = getimagesize($passport_selfie_img_path);
			_log("pasport_selfie: " . $passport_selfie_img_w . " / " . $passport_selfie_img_h);

			$passport_selfie_img_scale = floatval($passport_selfie_img_w / $passport_selfie_img_h);
			$passport_selfie_img_mm_w = floatval($passport_selfie_img_w * 210 / $paper_width_px);
			$passport_selfie_img_mm_h = floatval($passport_selfie_img_h * 210 / $paper_width_px);
			_log("pasport_selfie (mm): " . $passport_selfie_img_mm_w . " / " . $passport_selfie_img_mm_h);
			if ($passport_selfie_img_mm_w > 190) {
				$passport_selfie_img_mm_w = 190;
				if ($passport_selfie_img_scale == 1) {
					$passport_selfie_img_mm_h = $passport_selfie_img_mm_w;
				} else {
					$passport_selfie_img_mm_h = floatval($passport_selfie_img_mm_w / $passport_selfie_img_scale);
				}
				_log("pasport_selfie (mm)(fit): " . $passport_selfie_img_mm_w . " / " . $passport_selfie_img_mm_h);
			} else {
				if ($passport_selfie_img_mm_w < 120) {
					_log("make passport_selfie_img bigger...");
					$passport_selfie_img_mm_w = 190;
					if ($passport_selfie_img_scale == 1) {
						$passport_selfie_img_mm_h = $passport_selfie_img_mm_w;
					} else {
						$passport_selfie_img_mm_h = floatval($passport_selfie_img_mm_w / $passport_selfie_img_scale);
					}
					_log("pasport_selfie (mm)(fit): " . $passport_selfie_img_mm_w . " / " . $passport_selfie_img_mm_h);
				}
			}

			if ($passport_selfie_img_mm_h > 247) {
				$passport_selfie_img_mm_h = 247;
				$passport_selfie_img_mm_w = floatval(247 / 1.414);
			}

			$signature2 = $base_path . "/jdb/data/upload/" . $my_profile_id . "_form_2.png";
			// Calculate the image width and height ratio
			list($width, $height) = getimagesize($passport_selfie_img_path);
			$ratio = $width / $height;

			// Calculate the maximum image size that fits the page width and height
			$page_width = 210; // page width
			$page_height = 297; // page height
			$max_width = $page_width - 100; // allow some margin
			$max_height = $page_height - 100; // allow some margin
			$max_ratio = $max_width / $max_height;
			if ($ratio > $max_ratio) {
				$image_width = $max_width;
				$image_height = $image_width / $ratio;
			} else {
				$image_height = $max_height;
				$image_width = $image_height * $ratio;
			}

			// Center the image vertically and horizontally
			$x = ($page_width - $image_width) / 2;
			$y = ($page_height - $image_height) / 2;

			// Add the image to the PDF
			$pdf->Image($passport_selfie_img_path, $x, $y, $image_width, $image_height);
			$fd = 260;
			$pdf->Image($signature2, 100, $fd, 50, 50 / 3.74);
			//echo $fd ; echo '<br>';





		} else if ($document_type == '2') {


			//id_card_front image
			$pdf->AddPage();

			$id_card_front_img_path = $base_path . '/jdb/data/upload/' . $mydata['id_card_front'];
			$signature1 = $base_path . "/jdb/data/upload/" . $my_profile_id . "_form_1.png";
			// Calculate the image width and height ratio
			list($width, $height) = getimagesize($id_card_front_img_path);
			$ratio = $width / $height;

			// Calculate the maximum image size that fits the page width and height
			$page_width = 210; // page width
			$page_height = 297; // page height
			$max_width = $page_width - 100; // allow some margin
			$max_height = $page_height - 100; // allow some margin
			$max_ratio = $max_width / $max_height;
			if ($ratio > $max_ratio) {
				$image_width = $max_width;
				$image_height = $image_width / $ratio;
			} else {
				$image_height = $max_height;
				$image_width = $image_height * $ratio;
			}

			// Center the image vertically and horizontally
			$x = ($page_width - $image_width) / 2;
			$y = ($page_height - $image_height) / 2;

			// Add the image to the PDF
			$pdf->Image($id_card_front_img_path, $x, $y, $image_width, $image_height);
			$fd = 260;
			$pdf->Image($signature1, 100, $fd, 50, 50 / 3.74);
			//echo $fd ; echo '<br>';


			//id_card_back image
			$pdf->AddPage();
			$id_card_back_img_path = $base_path . '/jdb/data/upload/' . $mydata['id_card_back'];


			$signature2 = $base_path . "/jdb/data/upload/" . $my_profile_id . "_form_2.png";
			// Calculate the image width and height ratio
			list($width, $height) = getimagesize($id_card_back_img_path);
			$ratio = $width / $height;

			// Calculate the maximum image size that fits the page width and height
			$page_width = 210; // page width
			$page_height = 297; // page height
			$max_width = $page_width - 100; // allow some margin
			$max_height = $page_height - 100; // allow some margin
			$max_ratio = $max_width / $max_height;
			if ($ratio > $max_ratio) {
				$image_width = $max_width;
				$image_height = $image_width / $ratio;
			} else {
				$image_height = $max_height;
				$image_width = $image_height * $ratio;
			}

			// Center the image vertically and horizontally
			$x = ($page_width - $image_width) / 2;
			$y = ($page_height - $image_height) / 2;

			// Add the image to the PDF
			$pdf->Image($id_card_back_img_path, $x, $y, $image_width, $image_height);
			$fd = 260;
			$pdf->Image($signature2, 100, $fd, 50, 50 / 3.74);
			//echo $fd ; echo '<br>';



			//id_card_selfie image
			$pdf->AddPage();
			$id_card_selfie_img_path = $base_path . '/jdb/data/upload/' . $mydata['id_card_selfie'];
			$id_card_selfie_exif = exif_read_data($id_card_selfie_img_path);
			//foreach ($id_card_selfie_exif as $key => $section) {
			//	foreach ($section as $name => $val) {
			//		echo "$key.$name: $val<br />\n";
			//	}
			//}			

			$id_card_selfie_file_name_arr2 = explode('.', $mydata['id_card_selfie']);
			$id_card_selfie_file_name_ext_pos2 = count($id_card_selfie_file_name_arr2) - 1;
			$id_card_selfie_file_ext2 = strtolower($id_card_selfie_file_name_arr2[$id_card_selfie_file_name_ext_pos2]);

			if (($id_card_selfie_file_ext2 == 'jpg') || ($id_card_selfie_file_ext2 == 'jpeg')) {
				$id_card_selfie_img_obj = @imagecreatefromjpeg($id_card_selfie_img_path);
				if (!$id_card_selfie_img_obj) {
					_log("id_card_selfie::error imagecreatefromjpeg !");
				} else {
					if (!empty($id_card_selfie_exif['Orientation'])) {
						_log("id_card_selfie: orientation = " . $id_card_selfie_exif['Orientation']);
						switch ($id_card_selfie_exif['Orientation']) {
							case 3:
								$id_card_selfie_rotate_img = imagerotate($id_card_selfie_img_obj, 180, 0);
								unlink($id_card_selfie_img_path);
								imagejpeg($id_card_selfie_rotate_img, $id_card_selfie_img_path);
								@imagedestroy($id_card_selfie_rotate_img);
								@imagedestroy($id_card_selfie_img_obj);
								break;

							case 6:
								$id_card_selfie_rotate_img = imagerotate($id_card_selfie_img_obj, -90, 0);
								unlink($id_card_selfie_img_path);
								imagejpeg($id_card_selfie_rotate_img, $id_card_selfie_img_path);
								@imagedestroy($id_card_selfie_rotate_img);
								@imagedestroy($id_card_selfie_img_obj);
								break;

							case 8:
								$id_card_selfie_rotate_img = imagerotate($id_card_selfie_img_obj, 90, 0);
								unlink($id_card_selfie_img_path);
								imagejpeg($id_card_selfie_rotate_img, $id_card_selfie_img_path);
								@imagedestroy($id_card_selfie_rotate_img);
								@imagedestroy($id_card_selfie_img_obj);
								break;
						}
					} else {
						_log("id_card_selfie: error cannot get orientation");
					}
				}
			} else if ($id_card_selfie_file_ext2 == 'png') {
				$imagick_image3 = new Imagick($id_card_selfie_img_path);
				$imagick_image3->writeImage("png24:$id_card_selfie_img_path");
				$id_card_selfie_img_obj = @imagecreatefrompng($id_card_selfie_img_path);
				if (!$id_card_selfie_img_obj) {
					_log("id_card_selfie::error imagecreatefrompng !");
				} else {
					if (!empty($id_card_selfie_exif['Orientation'])) {
						_log("id_card_selfie: orientation = " . $id_card_selfie_exif['Orientation']);
						switch ($id_card_selfie_exif['Orientation']) {
							case 3:
								$id_card_selfie_rotate_img = imagerotate($id_card_selfie_img_obj, 180, 0);
								unlink($id_card_selfie_img_path);
								imagepng($id_card_selfie_rotate_img, $id_card_selfie_img_path);
								@imagedestroy($id_card_selfie_rotate_img);
								@imagedestroy($id_card_selfie_img_obj);
								break;

							case 6:
								$id_card_selfie_rotate_img = imagerotate($id_card_selfie_img_obj, -90, 0);
								unlink($id_card_selfie_img_path);
								imagepng($id_card_selfie_rotate_img, $id_card_selfie_img_path);
								@imagedestroy($id_card_selfie_rotate_img);
								@imagedestroy($id_card_selfie_img_obj);
								break;

							case 8:
								$id_card_selfie_rotate_img = imagerotate($id_card_selfie_img_obj, 90, 0);
								unlink($id_card_selfie_img_path);
								imagepng($id_card_selfie_rotate_img, $id_card_selfie_img_path);
								@imagedestroy($id_card_selfie_rotate_img);
								@imagedestroy($id_card_selfie_img_obj);
								break;
						}
					} else {
						_log("id_card_selfie: cannot get orientation");
					}
				}
			}

			list($id_card_selfie_img_w, $id_card_selfie_img_h, $id_card_selfie_img_type, $id_card_selfie_img_attr) = getimagesize($id_card_selfie_img_path);
			_log("id_card_selfie: " . $id_card_selfie_img_w . " / " . $id_card_selfie_img_h);

			$id_card_selfie_img_scale = floatval($id_card_selfie_img_w / $id_card_selfie_img_h);
			$id_card_selfie_img_mm_w = floatval($id_card_selfie_img_w * 210 / $paper_width_px);
			$id_card_selfie_img_mm_h = floatval($id_card_selfie_img_h * 210 / $paper_width_px);
			_log("id_card_selfie (mm): " . $id_card_selfie_img_mm_w . " / " . $id_card_selfie_img_mm_h);
			if ($id_card_selfie_img_mm_w > 190) {
				$id_card_selfie_img_mm_w = 190;
				if ($id_card_selfie_img_scale == 1) {
					$id_card_selfie_img_mm_h = $id_card_selfie_img_mm_w;
				} else {
					$id_card_selfie_img_mm_h = floatval($id_card_selfie_img_mm_w / $id_card_selfie_img_scale);
				}
			} else {
				if ($id_card_selfie_img_mm_w < 120) {
					_log("make id_card_selfie_img bigger...");
					$id_card_selfie_img_mm_w = 190;
					if ($id_card_selfie_img_scale == 1) {
						$id_card_selfie_img_mm_h = $id_card_selfie_img_mm_w;
					} else {
						$id_card_selfie_img_mm_h = floatval($id_card_selfie_img_mm_w / $id_card_selfie_img_scale);
					}
				}
			}

			if ($id_card_selfie_img_mm_h > 247) {
				$id_card_selfie_img_mm_h = 247;
				$id_card_selfie_img_mm_w = floatval(247 / 1.414);
			}

			$signature3 = $base_path . "/jdb/data/upload/" . $my_profile_id . "_form_1.png";
			// Calculate the image width and height ratio
			list($width, $height) = getimagesize($id_card_selfie_img_path);
			$ratio = $width / $height;

			// Calculate the maximum image size that fits the page width and height
			$page_width = 210; // page width
			$page_height = 297; // page height
			$max_width = $page_width - 100; // allow some margin
			$max_height = $page_height - 100; // allow some margin
			$max_ratio = $max_width / $max_height;
			if ($ratio > $max_ratio) {
				$image_width = $max_width;
				$image_height = $image_width / $ratio;
			} else {
				$image_height = $max_height;
				$image_width = $image_height * $ratio;
			}

			// Center the image vertically and horizontally
			$x = ($page_width - $image_width) / 2;
			$y = ($page_height - $image_height) / 2;

			// Add the image to the PDF
			$pdf->Image($id_card_selfie_img_path, $x, $y, $image_width, $image_height);
			$fd = 260;
			$pdf->Image($signature3, 100, $fd, 50, 50 / 3.74);
			//echo $fd ; echo '<br>';




		}



		$application_form_final_filepath = $base_path . '/jdb/data/upload/application_final_signed_' . $my_profile_id . '.pdf';
		$application_form_final_url = $site_path . '/jdb/data/upload/application_final_signed_' . $my_profile_id . '.pdf';
		$pdf->Output($application_form_final_filepath, 'F');

		sleep(2);
		$kyc_pdf_file_created = 0;
		if (file_exists($application_form_final_filepath)) {
			_log($my_email_address . ":: come here 1");
			clearstatcache();
			$kyc_file_size = filesize($application_form_final_filepath);
			_log($my_email_address . ":: file size = " . $kyc_file_size);
			if ($kyc_file_size > 0) {
				_log($my_email_address . ":: come here 2");
				$kyc_pdf_file_created = 1;
			}
		}
		$data['application_form_final_url'] = $application_form_final_url;

		//try update date in profile table
		$ngaycapnhat = date('Y-m-d H:i:s');
	} else {
	}
} else {
	_log("begin uploading pdf...");
	$total_files_cnt = 0;
	if (is_uploaded_file($_FILES["application_signed_pdf001"]["tmp_name"])) {
		$destination_file001 = $base_path . "/jdb/data/upload/application_form_1_signed_" . $_SESSION['ultimopay_profile_id'] . '.pdf';
		$destination_file001_chuyendoi = $base_path . "/jdb/data/upload/application_form_1_signed_" . $_SESSION['ultimopay_profile_id'] . 'chuyendoi.pdf';
		if (move_uploaded_file($_FILES["application_signed_pdf001"]["tmp_name"], $destination_file001)) {
			chmod($destination_file001, 0644);
			//echo "file size: " . filesize($destination_file);
			_log("file size: " . filesize($destination_file001));
			$cmd001 = '/usr/bin/ghostscript -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="' . $destination_file001_chuyendoi . '" "' . $destination_file001 . '"';
			_log($cmd001);
			//$destination_file001_converted_res = shell_exec($cmd001);
			exec($cmd001, $output_array001, $cmd_status001);
			//if (is_null($destination_file001_converted_res)) {
			//	_log("destination_file001 cannot be converted !!!");
			//} else {
			//	_log("destination_file001 was converted ok!");
			//}			
			$total_files_cnt++;
		} else {
			//echo "failed move_uploaded_file";
			_log("application_signed_pdf001:: failed move_uploaded_file");
		}
	} else {
		////echo "failed is_uploaded_file";
		//_log("application_signed_pdf001:: failed is_uploaded_file");
	}

	if (is_uploaded_file($_FILES["application_signed_pdf002"]["tmp_name"])) {
		$destination_file002 = $base_path . "/jdb/data/upload/application_form_2_p1_signed_" . $_SESSION['ultimopay_profile_id'] . '.pdf';
		$destination_file002_chuyendoi = $base_path . "/jdb/data/upload/application_form_2_p1_signed_" . $_SESSION['ultimopay_profile_id'] . 'chuyendoi.pdf';
		if (move_uploaded_file($_FILES["application_signed_pdf002"]["tmp_name"], $destination_file002)) {
			chmod($destination_file002, 0644);
			//echo "file size: " . filesize($destination_file);
			_log("file size: " . filesize($destination_file002));
			$cmd002 = '/usr/bin/ghostscript -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="' . $destination_file002_chuyendoi . '" "' . $destination_file002 . '"';
			_log($cmd002);
			//$destination_file001_converted_res = shell_exec($cmd001);
			exec($cmd002, $output_array002, $cmd_status002);
			//if (is_null($destination_file001_converted_res)) {
			//	_log("destination_file001 cannot be converted !!!");
			//} else {
			//	_log("destination_file001 was converted ok!");
			//}			
			$total_files_cnt++;
		} else {
			//echo "failed move_uploaded_file";
			_log("application_form_2_p1_signed:: failed move_uploaded_file");
		}
	} else {
		////echo "failed is_uploaded_file";
		//_log("application_signed_pdf002:: failed is_uploaded_file");
	}

	if (is_uploaded_file($_FILES["application_signed_pdf003"]["tmp_name"])) {
		$destination_file003 = $base_path . "/jdb/data/upload/application_form_2_p2_signed_" . $_SESSION['ultimopay_profile_id'] . '.pdf';
		$destination_file003_chuyendoi = $base_path . "/jdb/data/upload/application_form_2_p2_signed_" . $_SESSION['ultimopay_profile_id'] . 'chuyendoi.pdf';
		if (move_uploaded_file($_FILES["application_signed_pdf003"]["tmp_name"], $destination_file003)) {
			chmod($destination_file003, 0644);
			//echo "file size: " . filesize($destination_file);
			_log("file size: " . filesize($destination_file003));
			$cmd003 = '/usr/bin/ghostscript -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="' . $destination_file003_chuyendoi . '" "' . $destination_file003 . '"';
			_log($cmd003);
			//$destination_file001_converted_res = shell_exec($cmd001);
			exec($cmd003, $output_array003, $cmd_status003);
			//if (is_null($destination_file001_converted_res)) {
			//	_log("destination_file001 cannot be converted !!!");
			//} else {
			//	_log("destination_file001 was converted ok!");
			//}			
			$total_files_cnt++;
		} else {
			//echo "failed move_uploaded_file";
			_log("application_form_2_p2_signed:: failed move_uploaded_file");
		}
	} else {
		////echo "failed is_uploaded_file";
		//_log("application_signed_pdf003:: failed is_uploaded_file");
	}



	if (is_uploaded_file($_FILES["application_signed_pdf004"]["tmp_name"])) {
		$destination_file004 = $base_path . "/jdb/data/upload/application_form_2_p3_signed_" . $_SESSION['ultimopay_profile_id'] . '.pdf';
		$destination_file004_chuyendoi = $base_path . "/jdb/data/upload/application_form_2_p3_signed_" . $_SESSION['ultimopay_profile_id'] . 'chuyendoi.pdf';
		if (move_uploaded_file($_FILES["application_signed_pdf004"]["tmp_name"], $destination_file004)) {
			chmod($destination_file004, 0644);
			//echo "file size: " . filesize($destination_file);
			_log("file size: " . filesize($destination_file004));
			$cmd004 = '/usr/bin/ghostscript -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="' . $destination_file004_chuyendoi . '" "' . $destination_file004 . '"';
			_log($cmd004);
			//$destination_file001_converted_res = shell_exec($cmd001);
			exec($cmd004, $output_array004, $cmd_status004);
			//if (is_null($destination_file001_converted_res)) {
			//	_log("destination_file001 cannot be converted !!!");
			//} else {
			//	_log("destination_file001 was converted ok!");
			//}			
			$total_files_cnt++;
		} else {
			//echo "failed move_uploaded_file";
			_log("application_form_2_p3_signed:: failed move_uploaded_file");
		}
	} else {
		////echo "failed is_uploaded_file";
		//_log("application_signed_pdf004:: failed is_uploaded_file");
	}

	if (is_uploaded_file($_FILES["application_signed_pdf005"]["tmp_name"])) {
		$destination_file005 = $base_path . "/jdb/data/upload/application_form_2_p4_signed_" . $_SESSION['ultimopay_profile_id'] . '.pdf';
		$destination_file005_chuyendoi = $base_path . "/jdb/data/upload/application_form_2_p4_signed_" . $_SESSION['ultimopay_profile_id'] . 'chuyendoi.pdf';
		if (move_uploaded_file($_FILES["application_signed_pdf005"]["tmp_name"], $destination_file005)) {
			chmod($destination_file005, 0644);
			//echo "file size: " . filesize($destination_file);
			_log("file size: " . filesize($destination_file005));
			$cmd005 = '/usr/bin/ghostscript -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dNOPAUSE -dQUIET -dBATCH -sOutputFile="' . $destination_file005_chuyendoi . '" "' . $destination_file005 . '"';
			_log($cmd005);
			//$destination_file001_converted_res = shell_exec($cmd001);
			exec($cmd005, $output_array005, $cmd_status005);
			//if (is_null($destination_file001_converted_res)) {
			//	_log("destination_file001 cannot be converted !!!");
			//} else {
			//	_log("destination_file001 was converted ok!");
			//}			
			$total_files_cnt++;
		} else {
			//echo "failed move_uploaded_file";
			_log("application_form_2_p4_signed:: failed move_uploaded_file");
		}
	} else {
		////echo "failed is_uploaded_file";
		//_log("application_signed_pdf005:: failed is_uploaded_file");
	}
}
echo json_encode($data);
die();
/////////////////////////////////////////////////////////////////
