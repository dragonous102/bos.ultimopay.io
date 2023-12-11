<?php

$directoryPath = 'jdb/data/upload'; // Replace with the actual path to your directory



// Check if the directory exists
if (!is_dir($directoryPath)) {
    http_response_code(404);
    echo json_encode(['error' => 'Directory not found']);
    exit;
}

// Get the file name from the query parameter
$fileName = $_GET['file'] ?? 'sdsd';

// Validate and sanitize the file name
$fileName = basename($fileName);

// Construct the file path
$filePath = $directoryPath . '/' . $fileName;

// Check if the file exists
if (!file_exists($filePath)) {
    http_response_code(404);
    echo json_encode(['error' => 'File not found']);
    exit;
}

// Set the appropriate Content-Type based on file extension
$extension = pathinfo($filePath, PATHINFO_EXTENSION);
$contentType = '';

switch ($extension) {
    case 'pdf':
        $contentType = 'application/pdf';
        break;
    case 'jpg':
    case 'jpeg':
        $contentType = 'image/jpeg';
        break;
    case 'png':
        $contentType = 'image/png';
        break;
    // Add more cases for other file types if needed
    default:
        $contentType = 'application/octet-stream';
        break;
}

// Set the Content-Type header
header('Content-Type: ' . $contentType);

// Output the file contents
readfile($filePath);