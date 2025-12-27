<?php
// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// YouTube API Configuration - AMAN DI SERVER SIDE
define('YOUTUBE_API_KEY', 'AIzaSyD07C6L1mnwhAs7_CvmM2Un_jricGLrwzQ');
define('YOUTUBE_API_BASE', 'https://www.googleapis.com/youtube/v3');

// Get request parameters
$endpoint = $_GET['endpoint'] ?? '';
$params = $_GET;
unset($params['endpoint']); // Remove endpoint from params

// Validate endpoint to prevent abuse
$allowedEndpoints = ['channels', 'search', 'videos', 'playlistItems'];
if (!in_array($endpoint, $allowedEndpoints)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid endpoint']);
    exit;
}

// Add API key to parameters
$params['key'] = YOUTUBE_API_KEY;

// Build query string
$queryString = http_build_query($params);

// Make request to YouTube API
$url = YOUTUBE_API_BASE . '/' . $endpoint . '?' . $queryString;

// Check if curl is available
if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    // Add referer header to bypass API restrictions
    $headers = [
        'Referer: https://menyanyah.xyz/'
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
} else {
    // Fallback to file_get_contents with stream context
    $context = stream_context_create([
        'http' => [
            'header' => "Referer: https://menyanyah.xyz/\r\n"
        ]
    ]);
    $response = @file_get_contents($url, false, $context);
    $httpCode = 200;
    if ($response === false) {
        $httpCode = 500;
        $response = json_encode(['error' => 'Failed to fetch data']);
    }
}

// Return response with same status code
http_response_code($httpCode);
echo $response;
?>
