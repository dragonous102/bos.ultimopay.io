<?php 

$serverIP = $_SERVER['HTTP_X_SERVER_IP'];
$output['serverip'] = $serverIP;

if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $clientIP = $_SERVER['REMOTE_ADDR'];
}
$output['ip'] = $clientIP;
echo json_encode($output);

?>
