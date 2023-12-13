<?php
// Get the origin from the request headers
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : null;

// Check if the origin is one of the allowed origins
$allowedOrigins = ['http://localhost:3000', 'https://dev-bos.ultimopay.io:3001'];
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Server-IP");
header("Content-Type: application/json");

$output = array();

if (isset($_SERVER['HTTP_X_SERVER_IP'])) {
    $serverIP = $_SERVER['HTTP_X_SERVER_IP'];
    $output['serverip'] = $serverIP;
} else {
    $output['serverip'] = null;
}

if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $clientIP = $_SERVER['REMOTE_ADDR'];
}
$output['ip'] = $clientIP;

echo json_encode($output);
