<?php



$base_path = "/var/www/bos.ultimopay.io/bos_pdf_api";
$site_path = "https://bos.ultimopay.io/bos_pdf_api";

$data = [];
$data['status'] = 1;
$my_email_address = (isset($_POST['email_address']))?$_POST['email_address']:'';
$my_profile_id = md5($my_email_address);
function _log($line) {
	// $fl = @fopen($base_path."/log/upload-doc.log" , 'a');
	// $fline = date('[Ymd H:i:s] ') . $line."\n";
	// fwrite($fl, $fline);
	// fclose($fl );
	//echo date('[Ymd H:i:s] ').$line."\n";
	//@ob_flush(); 
	//flush();
}


$debit_selfie_file_path = $base_path."/jdb/data/upload/debit_selfie_" . $my_profile_id . ".*";
			$debit_selfie_files = glob($debit_selfie_file_path); // get all file names
			foreach($debit_selfie_files as $debit_selfie_file){ // iterate files
				if(is_file($debit_selfie_file)) {
					unlink($debit_selfie_file); // delete file
				}
			}
            //debit open image
			$debit_selfie_orig_name = $_FILES['debit_selfie']['name'];
			_log("debit_selfie_orig_name = " . $debit_selfie_orig_name);
			if (is_uploaded_file($_FILES["debit_selfie"]["tmp_name"])) {
				$debit_selfie_file_name_arr = explode('.', $debit_selfie_orig_name);
				$debit_selfie_file_name_ext_pos = count($debit_selfie_file_name_arr) - 1;
				$debit_selfie_file_ext = strtolower($debit_selfie_file_name_arr[$debit_selfie_file_name_ext_pos]);
				$debit_selfie_file = $base_path."/jdb/data/upload/debit_selfie_" . $my_profile_id . '.' . $debit_selfie_file_ext;
				$debit_selfie_file_gomi = $base_path."/jdb/data/upload/debit_selfie_" . $my_profile_id . '.';
				_log("debit_selfie_file_ext = " . $debit_selfie_file_ext);
				_log("debit_selfie_file = " . $debit_selfie_file);
				
				if (move_uploaded_file($_FILES["debit_selfie"]["tmp_name"], $debit_selfie_file)) {
					chmod($debit_selfie_file, 0644);
					//echo "file size: " . filesize($destination_file);
					_log("file size: " . filesize($debit_selfie_file));
					$total_files_cnt++;
                  
					$data['debit_selfie'] = $site_path."/jdb/data/upload/debit_selfie_" . $my_profile_id . '.' . $debit_selfie_file_ext;
					$data['message'] = 'Success';
					$data['upload_date'] = date('Y-m-d H:i:s');
                    $data['status'] = 1;
				} else {
					//echo "failed move_uploaded_file";
					_log("debit_selfie:: failed move_uploaded_file");
                    $data['message'] = 'failed move_uploaded_file';
                    $data['status'] = 0;
				}
				
			} else {
				//echo "failed is_uploaded_file";
				_log("debit_selfie:: failed is_uploaded_file");
                $data['message'] = 'failed is_uploaded_file';
                $data['status'] = 0;
			}

echo json_encode($data);
die();
?>