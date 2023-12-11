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



session_start();

//$people = array("fuji0311@icloud.com", "kidasatoru298379284@yahoo.co.jp");

$people = array("fuji0311@icloud.com", "kidasatoru298379284@yahoo.co.jp", "c5ftsgfga69@yahoo.co.jp", "qs6ccvhsf7@sute.jp");

$session_expired = 0;



if ($session_expired == 1) {

	$data['msg'] = 'proc_ng';

	$data['msg_ex'] = 'Your session expired! Please sign in again.';
} else {

	////////////////////////////////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////////////////////////////////	
	// error_reporting(E_ERROR | E_PARSE | E_NOTICE);
	// ini_set('display_errors', '1');

	function _log($line, $showlog = false)
	{
		global $fh3;
		if ($showlog) {

			$fline = date('[Ymd H:i:s] ') . $line . "\n";

			fwrite($fh3, $fline);

			echo date('[Ymd H:i:s] ') . $line . "\n";

			@ob_flush();

			flush();
		}
	}





	$fh3 = @fopen($base_path . "/log/profile.log", 'a');

	_log("start processing");

	_log("+++++++++++++++++++++++++++++++++++++++++++++++++++");



	//$data = array('code' => '', 'msg' => 'proc_ng', 'msg_ex' => '');

	$data = array('msg' => 'proc_ok', 'msg_ex' => '', 'page' => '', 'top_name_display' => '', 'application_form_1_screenshot_url' => '', 'application_form_1_screenshot_page_1_url' => '', 'application_form_1_screenshot_page_2_url' => '', 'application_form_2_screenshot_page_1_url' => '', 'application_form_2_screenshot_page_2_url' => '', 'application_form_2_screenshot_page_1_url' => '', 'application_form_2_screenshot_page_4_url' => '');



	//receive POST params



	$partition = isset($_POST['partition']) ? trim($_POST['partition']) : '0';

	$profile_title = isset($_POST['profile_title']) ? trim($_POST['profile_title']) : '0';

	//$profile_name_kanji_kana = isset($_POST['profile_name_kanji_kana'])?($_POST['profile_name_kanji_kana']):'';





	//name on card

	$name_on_card = isset($_POST['name_on_card']) ? ($_POST['name_on_card']) : '';

	$name_on_card = preg_replace("/[[:blank:]]+/", " ", $name_on_card);

	$uc_name_on_card = strtoupper($name_on_card);

	if (strlen($uc_name_on_card) < 21) {

		$emboss_left_letter_cnt = 21 - strlen($uc_name_on_card);

		for ($n = 1; $n <= $emboss_left_letter_cnt; $n++) {

			$uc_name_on_card .= "-";
		}
	}

	$emboss_fullname_chars = str_split($uc_name_on_card);





	$profile_name_romaji = isset($_POST['profile_name_romaji']) ? ($_POST['profile_name_romaji']) : '';

	$profile_name_romaji = preg_replace("/[[:blank:]]+/", " ", $profile_name_romaji);

	$uc_fullname = strtoupper($profile_name_romaji);

	if (strlen($uc_fullname) < 21) {

		$left_letter_cnt = 21 - strlen($uc_fullname);

		for ($i = 1; $i <= $left_letter_cnt; $i++) {

			$uc_fullname .= "-";
		}
	}

	$fullname_chars = str_split($uc_fullname);





	$profile_marriage_status = isset($_POST['profile_marriage_status']) ? ($_POST['profile_marriage_status']) : '0';

	$profile_occupation = isset($_POST['occupation_final']) ? ($_POST['occupation_final']) : '';



	if ($profile_occupation == '1') {

		$profile_occupation = 'CEO';
	} else if ($profile_occupation == '2') {

		$profile_occupation = 'Director';
	} else if ($profile_occupation == '3') {

		$profile_occupation = 'Employee';
	} else if ($profile_occupation == '4') {

		$profile_occupation = 'Housewife';
	} else if ($profile_occupation == '5') {

		$profile_occupation = 'Student';
	}



	$profile_nationality = isset($_POST['profile_nationality']) ? ($_POST['profile_nationality']) : '';

	$profile_country = isset($_POST['profile_country']) ? ($_POST['profile_country']) : '';

	$profile_birthday = isset($_POST['profile_birthday']) ? ($_POST['profile_birthday']) : '';

	$profile_birthday_arr = explode("/", $profile_birthday);

	$profile_id_number = isset($_POST['profile_id_number']) ? ($_POST['profile_id_number']) : '';

	$profile_id_issue_date = isset($_POST['profile_id_issue_date']) ? ($_POST['profile_id_issue_date']) : '';

	$profile_id_issue_date_arr = explode("/", $profile_id_issue_date);

	$profile_id_issuer = isset($_POST['profile_id_issuer']) ? ($_POST['profile_id_issuer']) : '';

	$profile_id_card_expiration_date = isset($_POST['profile_id_card_expiration_date']) ? ($_POST['profile_id_card_expiration_date']) : '';

	$profile_id_card_expiration_date_arr = explode("/", $profile_id_card_expiration_date);

	//$profile_place_of_birth = isset($_POST['profile_place_of_birth'])?($_POST['profile_place_of_birth']):'';

	$profile_address = isset($_POST['profile_address']) ? ($_POST['profile_address']) : '';

	$profile_address = preg_replace("/[[:blank:]]+/", " ", $profile_address);

	$profile_city = isset($_POST['profile_city']) ? ($_POST['profile_city']) : '';

	$profile_province = isset($_POST['profile_province']) ? ($_POST['profile_province']) : '';

	$profile_zipcode = isset($_POST['profile_zipcode']) ? ($_POST['profile_zipcode']) : '';

	//$profile_telephone_country_code = isset($_POST['profile_telephone_country_code'])?($_POST['profile_telephone_country_code']):'';

	//$profile_telephone_number = isset($_POST['profile_telephone_number'])?($_POST['profile_telephone_number']):'';

	$profile_cellphone_country_code = isset($_POST['profile_cellphone_country_code']) ? ($_POST['profile_cellphone_country_code']) : '';

	$profile_cellphone_number = isset($_POST['profile_cellphone_number']) ? ($_POST['profile_cellphone_number']) : '';

	$profile_cellphone_number_final = $profile_cellphone_country_code . ' ' . $profile_cellphone_number;

	$profile_consent_date = isset($_POST['profile_consent_date']) ? ($_POST['profile_consent_date']) : '';

	$profile_consent_name = isset($_POST['profile_consent_name']) ? ($_POST['profile_consent_name']) : '';

	$email_address = isset($_POST['email_address']) ? ($_POST['email_address']) : '';

	$id_card_type = isset($_POST['id_card_type']) ? ($_POST['id_card_type']) : '';

	_log("id_card_type = " . $id_card_type);

	$card_provider = isset($_POST['card_provider_selection']) ? (trim($_POST['card_provider_selection'])) : 'visa'; //default is visa





	$profile_birthday_db = str_replace("/", "-", $profile_birthday);

	$profile_id_issue_date_db = str_replace("/", "-", $profile_id_issue_date);

	$profile_id_card_expiration_date_db = str_replace("/", "-", $profile_id_card_expiration_date);

	if ($partition == 'card') {

		$profile_consent_date_db = str_replace("/", "-", $profile_consent_date);
	}







	//_log($profile_title . "/" . $profile_name_kanji_kana . "/" . $profile_name_romaji . "/" . $profile_birthday_db);


	$unique_pid = md5($email_address);
	$data["unique_pid"] = $unique_pid;


	//images (300dpi, A4 paper)

	$paper_width_px = 2480;

	$paper_height_px = 3508;



	//export pdf from templates

	$application_form_1_filename = 'application_form_1_' . $unique_pid . '.pdf';

	$application_form_1_screenshot_filename = 'application_form_1_screenshot_' . $unique_pid;

	$application_form_1_filepath = $base_path . '/jdb/data/download/' . $application_form_1_filename;

	// $application_form_1_screenshot_filepath = $base_path . '/jdb/data/download/' . $application_form_1_screenshot_filename . ".png"; // remove afterwards

	$application_form_1_screenshot_filepath = $base_path . '/jdb/data/download/' . $application_form_1_screenshot_filename;

	// $application_form_1_screenshot_url = $site_path . '/jdb/data/download/' . $application_form_1_screenshot_filename . ".png"; // remove afterwards

	$application_form_1_screenshot_page_1_url = $site_path . '/jdb/data/download/' . $application_form_1_screenshot_filename . "_0.png";

	$application_form_1_screenshot_page_2_url = $site_path . '/jdb/data/download/' . $application_form_1_screenshot_filename . "_1.png";



	$application_form_2_filename = 'application_form_2_' . $unique_pid . '.pdf';

	$application_form_2_screenshot_filename = 'application_form_2_screenshot_' . $unique_pid;

	$application_form_2_filepath = $base_path . '/jdb/data/download/' . $application_form_2_filename;

	$application_form_2_screenshot_filepath = $base_path . '/jdb/data/download/' . $application_form_2_screenshot_filename;

	$application_form_2_screenshot_page_1_url = $site_path . '/jdb/data/download/' . $application_form_2_screenshot_filename . "_0.png";

	$application_form_2_screenshot_page_2_url = $site_path . '/jdb/data/download/' . $application_form_2_screenshot_filename . "_1.png";

	$application_form_2_screenshot_page_3_url = $site_path . '/jdb/data/download/' . $application_form_2_screenshot_filename . "_2.png";

	$application_form_2_screenshot_page_4_url = $site_path . '/jdb/data/download/' . $application_form_2_screenshot_filename . "_3.png";

	if ((file_exists($application_form_1_filepath)) && (file_exists($application_form_2_filepath))) {

		$already_had_pdf = 1;
	} else {

		$already_had_pdf = 0;
	}

	if ($data['msg'] == 'proc_ok') {

		//if (($partition == 'card') || ($already_had_pdf == 1)) {



		if ($already_had_pdf == 1) {

			_log("re-create pdf");
		} else {

			_log("new create pdf");
		}






		// initiate FPDI

		$pdf = new Fpdi();

		//try to export application form 1

		///////////////////////////////////////////////////////////////////////////////////////////

		// get the page count
		$pageCount = $pdf->setSourceFile('../jdb/data/template/Opening_Account_Form_New.pdf');
		// $pageCount = $pdf->setSourceFile('../jdb/data/template/Opening_Account_Form.pdf');

		// echo $pageCount;die;

		for ($page = 1; $page <= $pageCount; $page++) {

			unset($templateId);

			$templateId = null;

			$templateId = $pdf->importPage($page);

			// $scale = 297 / 420;

			// $h = (216 / $scale) - 15;



			$spec = $pdf->getImportedPageSize($templateId);

			//echo $h;

			//foreach ($spec as $k => $v) {

			//	echo $k . " = " . $v . "<br/>";

			//}



			$pdf->AddPage();

			$pdf->useImportedPage($templateId, 0, 17, 210, 268, false);

			if ($page == 1) {

				$pdf->SetTextColor(0, 0, 0);


				//Today's Date

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(170, 38);

				$pdf->Write(0, date('d    m    Y'));


				//Tel

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(146, 86);

				$pdf->Write(0, $profile_cellphone_country_code . ' ' . $profile_cellphone_number);


				//Email

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(146, 98);

				$pdf->Write(0, $email_address);



				//Name				

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(67, 205);

				$pdf->Write(0, strtoupper($profile_name_romaji));



				//Birthday

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(169, 205);

				$pdf->Write(0, $profile_birthday_arr[2] . "  " . $profile_birthday_arr[1] . "    " . $profile_birthday_arr[0]);


				// Address

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(44, 213);

				$pdf->Write(0, $profile_address);

				// $pdf->SetXY(40, 210);
				// $pdf->MultiCell(47, 3, $profile_address, 0, 'L', false);



				// City

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(98, 213);

				$pdf->Write(0, $profile_city);


				// Province

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(160, 213);

				$pdf->Write(0, $profile_province);



				// Occupation

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(39, 220.5);

				$pdf->Write(0, $profile_occupation);


				// Marriage Status

				if (intval($profile_marriage_status) == 1) {
					// single
					$pdf->Image('../classes/checkmark2.png', 44, 226, -250);
				} else if (intval($profile_marriage_status) == 2) {
					// married
					$pdf->Image('../classes/checkmark2.png', 64, 226, -250);
				}



				// $pdf->SetFont('Arial', 'B', 7);

				// $pdf->SetXY(172, 73.7);

				// $pdf->MultiCell(30, 3, $profile_id_number, 0, 'L', false);



				//signature position 1

				// $paper_scale = 210 / $paper_width_px;

				// $myscale = 10.595;

				//$pdf->Image('../jdb/data/upload/lequangquy2.png', 30, 38, 60, 60/$myscale );


			}

			if ($page == 2) {

				$pdf->SetTextColor(0, 0, 0);


				// Customer type tick

				$pdf->Image('../classes/checkmark2.png', 48, 43, -250);


				// Card selection text

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(50, 53.5);

				if ($card_provider == "visa") {

					$pdf->Write(0, 'Transfer money and Applying visa debit card');
				} else if ($card_provider == "unionpay") {

					$pdf->Write(0, 'Transfer money and Applying unionpay debit card');
				}


				// saving account tick

				$pdf->Image('../classes/checkmark2.png', 97, 69.5, -250);



				// USD

				$pdf->SetFont('Arial', 'B', 8);

				$pdf->SetXY(113, 92.5);

				$pdf->Write(0, '150');


				// Card check

				if ($card_provider == "visa") {

					$pdf->Image('../classes/checkmark2.png', 82.5, 142, -250);
				} else if ($card_provider == "unionpay") {

					$pdf->Image('../classes/checkmark2.png', 47.5, 142, -250);
				}


				//Passport details

				$pdf->SetFont('Arial', 'B', 8);

				// if ($id_card_type == '1') {
					// (passport)


					$pdf->SetXY(150, 184);

					$pdf->Write(0, $profile_id_number);


					$pdf->SetXY(131, 188);

					$pdf->Write(0, $profile_id_issue_date_arr[2] . "   " . $profile_id_issue_date_arr[1] . "     " . $profile_id_issue_date_arr[0]);


					$pdf->SetXY(164, 188);

					$pdf->Write(0, $profile_id_card_expiration_date_arr[2] . "   " . $profile_id_card_expiration_date_arr[1] . "     " . $profile_id_card_expiration_date_arr[0]);
				// }
			}
		}

		//$pdf->Output();

		//$application_form_1_filename = 'application_form_1_' . $_SESSION['ultimopay_profile_id'] . '.pdf';

		//$application_form_1_filepath = $base_path.'/jdb/data/download/' . $application_form_1_filename;

		$pdf->Output($application_form_1_filepath, 'F');

		sleep(1);

		if (!file_exists($application_form_1_filepath)) {

			$data['msg'] == 'proc_ng2';

			$data['msg_ex'] = 'Failed to create Application Form (1).';

			//$data['pdf_file_1_url'] = 'application_form_1_' . $_SESSION['ultimopay_profile_id'] . '.pdf';

		} else {

			//if (in_array($_SESSION['ultimopay_username'], $people))  {

			//try to export image screenshot for form-1

			// @unlink($application_form_1_screenshot_filepath);

			for ($form_1_pagecnt = 0; $form_1_pagecnt < $pageCount; $form_1_pagecnt++) {

				$formone_url = $application_form_1_filepath . '[' . $form_1_pagecnt . ']';
				// $formone_url = $application_form_1_filepath . '[0]';

				$imagickObj1a = new Imagick();

				$imagickObj1a->setResolution(300, 300);

				$imagickObj1a->setSize(1400, 1979);

				$imagickObj1a->readimage($formone_url);

				$imagickObj1a->setImageBackgroundColor('#ffffff');

				$imagickObj1a->resizeImage(1400, 1979, Imagick::FILTER_LANCZOS, 1);

				$imagickObj1a->setImageCompression(Imagick::COMPRESSION_JPEG);

				$imagickObj1a->setImageCompressionQuality(40);

				$imagickObj1a->setImageFormat("png");

				$imagickObj1a->writeImage($application_form_1_screenshot_filepath . '_' . $form_1_pagecnt . '.png');

				$imagickObj1a->clear();

				$imagickObj1a->destroy();



				if ($form_1_pagecnt == 0) {

					$imagickObj1b = new Imagick($application_form_1_screenshot_filepath . '_' . $form_1_pagecnt . '.png');

					$draw1 = new ImagickDraw();

					$draw1->setStrokeColor(new ImagickPixel('red'));

					$draw1->setStrokeWidth(3);
					
					// bool ImagickDraw::line( $sx, $sy, $ex, $ey )
					//box 1

					$draw1->line(350, 450, 780, 450);

					$draw1->line(780, 450, 780, 630);

					$draw1->line(780, 630, 350, 630);

					$draw1->line(350, 630, 350, 450);


					$imagickObj1b->drawImage($draw1);

					$imagickObj1b->writeImage($application_form_1_screenshot_filepath . '_' . $form_1_pagecnt . '.png');

					$imagickObj1b->clear();

					$imagickObj1b->destroy();

					$draw1->destroy();
				}

				if ($form_1_pagecnt == 1) {

					$imagickObj1c = new Imagick($application_form_1_screenshot_filepath . '_' . $form_1_pagecnt . '.png');

					$draw2 = new ImagickDraw();

					$draw2->setStrokeColor(new ImagickPixel('red'));

					$draw2->setStrokeWidth(3);

					// bool ImagickDraw::line( $sx, $sy, $ex, $ey )
					//box 2

					$draw2->line(130, 1590, 285, 1590);

					$draw2->line(285, 1590, 285, 1730);

					$draw2->line(285, 1730, 130, 1730);

					$draw2->line(130, 1730, 130, 1590);


					$imagickObj1c->drawImage($draw2);

					$imagickObj1c->writeImage($application_form_1_screenshot_filepath . '_' . $form_1_pagecnt . '.png');

					$imagickObj1c->clear();

					$imagickObj1c->destroy();

					$draw2->destroy();
				}
			}

			// $data['application_form_1_screenshot_url'] = $application_form_1_screenshot_url . '?time=' . time();

			$data['application_form_1_screenshot_page_1_url'] = $application_form_1_screenshot_page_1_url . '?time=' . time();

			$data['application_form_1_screenshot_page_2_url'] = $application_form_1_screenshot_page_2_url . '?time=' . time();

			//}


			unset($page);


			$name_x_pos = 7;

			$name_y_pos = 72;

			//try to export pdf form 2

			$pdf2 = new Fpdi();

			$pageCount2 = $pdf2->setSourceFile('../jdb/data/template/Application_Form_International_Card.pdf');

			/////////////////////////////////////////////////////////////////////////////////////////

			for ($page = 1; $page <= $pageCount2; $page++) {

				unset($templateId);

				$templateId = null;

				$templateId = $pdf2->importPage($page);

				//$scale = 297 / 420;

				//$h = (216 / $scale) - 15;



				$spec = $pdf2->getImportedPageSize($templateId);

				//echo $h;



				//foreach ($spec as $k => $v) {

				//	echo $k . " = " . $v . "<br/>";

				//}



				$pdf2->AddPage();

				$pdf2->useImportedPage($templateId, 0.4, 0, 209, null, false);



				if ($page == 1) {

					/*

							if (in_array($_SESSION['cultimopay_username'], $people))  {

								if ($card_provider == "visa") {

									//visa debit check

									$pdf2->Image('../classes/checkmark2.png', 6.4, 36, -300);

								} else if ($card_provider == "unionpay") {

									//unionpay debit check

									$pdf2->Image('../classes/checkmark2.png', 51.4, 36, -300);

								}

							} else {

								//visa debit check

								$pdf2->Image('../classes/checkmark2.png', 6.4, 36, -300);

							}

							*/

					if ($card_provider == "visa") {

						//visa debit check

						$pdf2->Image('../classes/checkmark2.png', 6.4, 36, -300);
					} else if ($card_provider == "unionpay") {

						//unionpay debit check

						$pdf2->Image('../classes/checkmark2.png', 51.4, 36, -300);
					}



					//fullname original

					$pdf2->SetTextColor(0, 0, 0);

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(33, 57);

					$pdf2->Write(0, strtoupper($profile_name_romaji));



					//occupation

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(24, 61);

					$pdf2->Write(0, $profile_occupation);





					//nationality

					//$pdf->MultiCell( 20, 4, 'Saint Vincent and the Grenadines', 1);		

					$nationality_items = explode(" ", $profile_nationality);

					if (count($nationality_items) >= 4) {

						$pdf2->SetFont('Arial', 'B', 7);

						$nationality_line_01 = $nationality_items[0] . " " .  $nationality_items[1] . " " .  $nationality_items[2];

						$pdf2->SetXY(68, 61);

						$pdf2->Write(0, $nationality_line_01);

						$nationality_line_02 = "";

						for ($nationality_cnt = 3; $nationality_cnt < count($nationality_items); $nationality_cnt++) {

							$nationality_line_02 .= $nationality_items[$nationality_cnt] . " ";
						}

						$pdf2->SetXY(68, 64);

						$pdf2->Write(0, $nationality_line_02);
					} else {

						$pdf2->SetFont('Arial', 'B', 7);

						$pdf2->SetXY(68, 61);

						$pdf2->Write(0, $profile_nationality);
					}





					//array of name letters

					$pdf2->setFillColor(255, 255, 255);

					$pdf2->Rect(6, 71.7, 96, 4, 'F');

					$pdf2->setFillColor(0, 0, 0);



					/*

							$pdf->SetXY(7, 72);

							$pdf->Rect(7, 72, 3.3, 3.3, 'D');

							$pdf->SetXY(7.2, 73.8);

							//$pdf->SetXY(6.7, 73.8);

							$pdf->Write(0, 'I');

							

							$pdf->SetXY(11, 72);

							$pdf->Rect(11, 72, 3.3, 3.3, 'D');

							$pdf->SetXY(10.7, 73.8);

							$pdf->Write(0, 'T');

							*/



					for ($c = 0; $c < 21; $c++) {

						$cur_letter = $emboss_fullname_chars[$c];

						if ($cur_letter == '-')

							$cur_letter = ' ';



						$pdf2->SetXY($name_x_pos, $name_y_pos);

						$pdf2->Cell(3.3, 3.3, $cur_letter, 1, 0, 'C', false);

						$name_x_pos = $name_x_pos + 4.3;
					}



					//date of birth

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(26, 77.9);

					$pdf2->Write(0, $profile_birthday_arr[2]);

					$pdf2->SetXY(31, 77.9);

					$pdf2->Write(0, $profile_birthday_arr[1]);

					$pdf2->SetXY(35, 77.9);

					$pdf2->Write(0, $profile_birthday_arr[0]);





					//ID number

					$pdf2->SetFont('Arial', 'B', 7);

					//$pdf2->SetXY(13, 82.4);

					//$pdf2->Write(0, strtoupper($profile_id_number));

					$pdf2->SetXY(13, 81.0);

					$pdf2->MultiCell(18, 3, strtoupper($profile_id_number), 0, 'L', false);





					//ID issue date

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(34.6, 82.4);

					$pdf2->Write(0, $profile_id_issue_date_arr[2]);

					$pdf2->SetXY(41, 82.4);

					$pdf2->Write(0, $profile_id_issue_date_arr[1]);

					$pdf2->SetXY(48, 82.4);

					$pdf2->Write(0, $profile_id_issue_date_arr[0]);



					//ID issuer

					//$pdf->SetFont('Arial','B', 8);

					//$pdf->SetXY(71, 82.4);

					//$pdf->Write(0, $country);

					$country_items = explode(" ", $profile_id_issuer);

					if (count($country_items) >= 4) {

						$pdf2->SetFont('Arial', 'B', 7);

						$country_line_01 = $country_items[0] . " " .  $country_items[1] . " " .  $country_items[2];

						$pdf2->SetXY(71, 82.4);

						$pdf2->Write(0, $country_line_01);

						$country_line_02 = "";

						for ($country_cnt = 3; $country_cnt < count($country_items); $country_cnt++) {

							$country_line_02 .= $country_items[$country_cnt] . " ";
						}

						$pdf2->SetXY(71, 85.4);

						$pdf2->Write(0, $country_line_02);
					} else {

						$pdf2->SetFont('Arial', 'B', 7);

						$pdf2->SetXY(71, 82.4);

						$pdf2->Write(0, $profile_id_issuer);
					}



					//ID expire date

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(25.6, 86.7);

					$pdf2->Write(0, $profile_id_card_expiration_date_arr[2]);

					$pdf2->SetXY(31, 86.7);

					$pdf2->Write(0, $profile_id_card_expiration_date_arr[1]);

					$pdf2->SetXY(37, 86.7);

					$pdf2->Write(0, $profile_id_card_expiration_date_arr[0]);





					//place of birth

					//$pdf->SetFont('Arial','B', 7);

					//$pdf->SetXY(25, 91);

					//$pdf->Write(0, $country);

					if (count($country_items) >= 3) {

						$pdf2->SetFont('Arial', 'B', 7);

						$country_line_01_ex = $country_items[0] . " " .  $country_items[1];

						$pdf2->SetXY(23, 91);

						$pdf2->Write(0, $country_line_01_ex);

						$country_line_02_ex = "";

						for ($country_cnt_ex = 2; $country_cnt_ex < count($country_items); $country_cnt_ex++) {

							$country_line_02_ex .= $country_items[$country_cnt_ex] . " ";
						}

						$pdf2->SetXY(23, 94);

						$pdf2->Write(0, $country_line_02_ex);
					} else {

						$pdf2->SetFont('Arial', 'B', 7);

						$pdf2->SetXY(24.5, 91);

						$pdf2->Write(0, $profile_nationality);
					}



					//district

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(51, 95.5);

					$pdf2->Write(0, ucfirst(strtolower($profile_city)));



					//province or city

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(83.5, 95.5);

					$pdf2->Write(0, ucfirst(strtolower($profile_province)));





					//cellphone

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(17, 125.7);

					$pdf2->Write(0, $profile_cellphone_number_final);



					//email

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(65, 125.7);

					$pdf2->Write(0, $email_address);



					//mariage status

					if (intval($profile_marriage_status) == 1) { //single

						$pdf2->Image('../classes/checkmark2.png', 35.8, 133.4, -300);
					} else if (intval($profile_marriage_status) == 2) { //married

						$pdf2->Image('../classes/checkmark2.png', 55.6, 133.4, -300);
					}









					//cellphone (OTP)

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(117, 53);

					$pdf2->Write(0, $profile_cellphone_number_final);



					//email (OTP)

					if (strlen($email_address) <= 24) {

						$pdf2->SetFont('Arial', 'B', 7);

						$pdf2->SetXY(166, 53);

						$pdf2->Write(0, $email_address);
					} else {

						$pdf2->SetFont('Arial', 'B', 7);

						$pdf2->SetXY(166, 51.5);

						$pdf2->MultiCell(35, 3, $email_address, 0, 'L', false);
					}





					//fullname signature

					/*

							$pdf2->SetTextColor(0, 0, 0);

							$pdf2->SetFont('Arial','B', 7);

							//$pdf->SetXY(173, 152);

							//$pdf->Write(0, strtoupper('DAM NGOC KIM LO'));

							

							if(strlen($profile_name_romaji) <= 14) {

								$pdf2->SetXY(173, 152);

								$pdf2->Write(0, strtoupper($profile_name_romaji));

							} else {

								$pdf2->SetXY(173, 148);

								$pdf2->MultiCell(30, 3, strtoupper($profile_name_romaji), 0, 'L', false);

							}

							*/

					$pdf2->SetXY(173, 150);

					$pdf2->MultiCell(35, 3, strtoupper($profile_name_romaji), 0, 'L', false);

					/*

							$fullname_items = explode(" ", $profile_name_romaji);

							if (count($fullname_items) > 2) {

								$pdf2->SetFont('Arial','B', 7);

								$fullname_line_01 = $fullname_items[0] . " " .  $fullname_items[1];

								$pdf2->SetXY(173, 152.7);

								$pdf2->Write(0, strtoupper($fullname_line_01));

								$fullname_line_02 = "";

								for ($fullname_cnt=2; $fullname_cnt<count($fullname_items); $fullname_cnt++) {

									$fullname_line_02 .= $fullname_items[$fullname_cnt] . " ";

								}

								$pdf2->SetXY(173, 155.7);

								$pdf2->Write(0, strtoupper($fullname_line_02));

							} else {

								$pdf2->SetFont('Arial','B', 7);

								$pdf2->SetXY(173, 152.7);

								$pdf2->Write(0, strtoupper($profile_name_romaji));

							}

							*/



					//selsection information

					//selection option 1

					$pdf2->Image('../classes/checkmark2.png', 70.5, 208.5, -300);

					//selection option 2

					$pdf2->Image('../classes/checkmark2.png', 70.5, 215.8, -300);

					//selection option 3

					$pdf2->Image('../classes/checkmark2.png', 41.4, 223.3, -300);

					if ($id_card_type == '1') {

						//selection option 4 (passport)

						$pdf2->Image('../classes/checkmark2.png', 121, 259.7, -300);
					} else if ($id_card_type == '2') {

						//selection option 4 (id card)

						$pdf2->Image('../classes/checkmark2.png', 107, 259.7, -300);
					}
				} else if ($page == 2) {

					//fullname original

					$pdf2->SetTextColor(0, 0, 0);

					$pdf2->SetFont('Arial', 'B', 7);

					//$pdf2->Write(0, strtoupper($profile_name_romaji));



					if (strlen($profile_name_romaji) <= 30) {



						$pdf2->SetXY(29, 67.8);

						$pdf2->Write(0, strtoupper($profile_name_romaji));
					} else {



						$pdf2->SetXY(29, 62.8);

						$pdf2->MultiCell(60, 3, strtoupper($profile_name_romaji), 0, 'L', false);
					}



					//date of birth

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(100, 67.8);

					$pdf2->Write(0, $profile_birthday_arr[2]);

					$pdf2->SetXY(106.4, 67.8);

					$pdf2->Write(0, $profile_birthday_arr[1]);

					$pdf2->SetXY(112.7, 67.8);

					$pdf2->Write(0, $profile_birthday_arr[0]);



					//ID number

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(155, 67.8);

					$pdf2->Write(0, $profile_id_number);



					//ID issue date

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(22, 72);

					$pdf2->Write(0, $profile_id_issue_date_arr[2]);

					$pdf2->SetXY(29, 72);

					$pdf2->Write(0, $profile_id_issue_date_arr[1]);

					$pdf2->SetXY(36, 72);

					$pdf2->Write(0, $profile_id_issue_date_arr[0]);



					//ID expire date

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(64, 72);

					$pdf2->Write(0, $profile_id_card_expiration_date_arr[2]);

					$pdf2->SetXY(71, 72);

					$pdf2->Write(0, $profile_id_card_expiration_date_arr[1]);

					$pdf2->SetXY(78, 72);

					$pdf2->Write(0, $profile_id_card_expiration_date_arr[0]);



					//ID Issuer

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(102, 72);

					$pdf2->Write(0, $profile_id_issuer);



					//Address

					/*

							if(strlen($address) <= 25) {

								$pdf->SetFont('Arial','B', 7);	

								$pdf->SetXY(36.7, 76.4);

								$pdf->Write(0, $address);

							} else  {

								$pdf->SetFont('Arial','B', 7);	

								$pdf->SetXY(36.7, 74.4);

								$pdf->MultiCell(34, 3, $address, 0, 'L', false);

							}*/

					$address_items = explode(" ", $profile_address);

					if (count($address_items) >= 4) {

						$pdf2->SetFont('Arial', 'B', 6);

						$address_line_01 = $address_items[0] . " " .  $address_items[1] . " " .  $address_items[2];

						$pdf2->SetXY(36.7, 76);

						$pdf2->Write(0, $address_line_01);

						$address_line_02 = "";

						for ($address_cnt = 3; $address_cnt < count($address_items); $address_cnt++) {

							$address_line_02 .= $address_items[$address_cnt] . " ";
						}

						$pdf2->SetXY(36.7, 79);

						$pdf2->Write(0, $address_line_02);
					} else {

						$pdf2->SetFont('Arial', 'B', 7);

						$pdf2->SetXY(36.7, 76.4);

						$pdf2->Write(0, $profile_address);
					}



					//district

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(80, 76.4);

					$pdf2->Write(0, ucfirst(strtolower($profile_city)));



					//province or city

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(118, 76.4);

					$pdf2->Write(0, ucfirst(strtolower($profile_province)));



					//cellphone

					$pdf2->SetFont('Arial', 'B', 7);

					$pdf2->SetXY(157, 76.4);

					$pdf2->Write(0, $profile_cellphone_number_final);



					//email

					/*

							if (count($address_items) < 4) {

								$pdf2->SetFont('Arial','B', 7);

							} else {

								$pdf2->SetFont('Arial','B', 6);

							}

							*/

					if (strlen($email_address) <= 18) {

						//$pdf->SetFont('Arial','B', 7);

						$pdf2->SetXY(55, 81);

						$pdf2->Write(0, $email_address);
					} else {

						//$pdf->SetFont('Arial','B', 6);

						$pdf2->SetXY(55, 79.4);

						$pdf2->MultiCell(28.5, 3, $email_address, 0, 'L', false);
					}
				} else if ($page == 3) {
				} else if ($page == 4) {

					$pdf2->SetFont('Arial', 'B', 7);



					$pdf2->Write(0, strtoupper($profile_name_romaji));



					if (strlen($profile_name_romaji) <= 30) {



						$pdf2->SetXY(62, 237.5);

						$pdf2->Write(0, strtoupper($profile_name_romaji));
					} else {



						$pdf2->SetXY(62, 232.5);

						$pdf2->MultiCell(65, 3, strtoupper($profile_name_romaji), 0, 'L', false);
					}
				}
			}

			//$pdf2->Output();

			//$application_form_2_filename = 'application_form_2_' . $_SESSION['ultimopay_profile_id'] . '.pdf';

			//$application_form_2_filepath = $base_path.'/jdb/data/download/' . $application_form_2_filename;

			$pdf2->Output($application_form_2_filepath, 'F');

			sleep(1);

			if (!file_exists($application_form_2_filepath)) {

				$data['msg'] == 'proc_ng2';

				$data['msg_ex'] = 'Failed to create Application Form (2).';

				//$data['pdf_file_1_url'] = 'application_form_1_' . $_SESSION['ultimopay_profile_id'] . '.pdf';

			} else {

				//if (in_array($_SESSION['ultimopay_username'], $people))  {

				for ($form_2_pagecnt = 0; $form_2_pagecnt < $pageCount2; $form_2_pagecnt++) {

					$form_2_url = $application_form_2_filepath . '[' . $form_2_pagecnt . ']';

					$imagickObj2a = new Imagick();

					$imagickObj2a->setResolution(300, 300);

					$imagickObj2a->setSize(1400, 1979);

					//$imagickObj1a->setImageCompression(Imagick::COMPRESSION_PNG); 

					//$imagickObj1a->setImageCompressionQuality(100);

					$imagickObj2a->readimage($form_2_url);

					$imagickObj2a->setImageBackgroundColor('#ffffff');

					$imagickObj2a->resizeImage(1400, 1979, Imagick::FILTER_LANCZOS, 1);

					$imagickObj2a->setImageFormat("png");

					$imagickObj2a->writeImage($application_form_2_screenshot_filepath . '_' . $form_2_pagecnt . '.png');

					$imagickObj2a->clear();

					$imagickObj2a->destroy();

					if ($form_2_pagecnt == 0) {

						$imagickObj2b = new Imagick($application_form_2_screenshot_filepath . '_' . $form_2_pagecnt . '.png');

						$draw2 = new ImagickDraw();

						$draw2->setStrokeColor(new ImagickPixel('red'));

						$draw2->setStrokeWidth(3);

						//box 1

						$draw2->line(920, 990, 1100, 990);

						$draw2->line(1100, 990, 1100, 1020);

						$draw2->line(1100, 1020, 920, 1020);

						$draw2->line(920, 1020, 920, 990);



						$imagickObj2b->drawImage($draw2);

						$imagickObj2b->writeImage($application_form_2_screenshot_filepath . '_' . $form_2_pagecnt . '.png');

						$imagickObj2b->clear();

						$imagickObj2b->destroy();

						//$draw2->clear();								

						$draw2->destroy();
					}



					if ($form_2_pagecnt == 3) {

						$imagickObj2c = new Imagick($application_form_2_screenshot_filepath . '_' . $form_2_pagecnt . '.png');

						$draw3 = new ImagickDraw();

						$draw3->setStrokeColor(new ImagickPixel('red'));

						$draw3->setStrokeWidth(3);

						//box 2

						$draw3->line(190, 1560, 340, 1560);

						$draw3->line(340, 1560, 340, 1590);

						$draw3->line(340, 1590, 190, 1590);

						$draw3->line(190, 1590, 190, 1560);



						$imagickObj2c->drawImage($draw3);

						$imagickObj2c->writeImage($application_form_2_screenshot_filepath . '_' . $form_2_pagecnt . '.png');

						$imagickObj2c->clear();

						$imagickObj2c->destroy();

						$draw3->destroy();
					}
				}

				$data['application_form_2_screenshot_page_1_url'] = $application_form_2_screenshot_page_1_url . '?time=' . time();

				$data['application_form_2_screenshot_page_2_url'] = $application_form_2_screenshot_page_2_url . '?time=' . time();

				$data['application_form_2_screenshot_page_3_url'] = $application_form_2_screenshot_page_3_url . '?time=' . time();

				$data['application_form_2_screenshot_page_4_url'] = $application_form_2_screenshot_page_4_url . '?time=' . time();





				//}





			}

			/////////////////////////////////////////////////////////////////////////////////////////



		}



		//}

	}









	@fclose($fh3);



	////////////////////////////////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////////////////////////////////

}





echo json_encode($data);



die();
