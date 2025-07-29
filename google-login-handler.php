<?php

session_start();
require_once 'GoogleLoginStandalone.php';
require_once 'key.php';


$google = new GoogleLoginStandalone($clientId);
$input = json_decode(file_get_contents('php://input'), true);
//$token = $input['token'] ?? null;
$token = $_POST['token'] ?? null;

header('Content-Type: application/json');

if (!$token) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing ID token']);
    exit;
}

$user = $google->verify($token);
/*

// If the user is verified, store their information in database or session
$user = [
    'id'                => $data['sub'] ?? null,
    'email'             => $data['email'] ?? null,
    'full_name'         => $data['name'] ?? '',
    'first_name'        => $data['given_name'] ?? '',
    'last_name'         => $data['family_name'] ?? '',
    'email_verified'    => $data['email_verified'] ?? false,
    'picture'           => $data['picture'] ?? '',
    'verified'          => $data['email_verified'] ?? false, 
];

*/


if ($user) {
    $_SESSION['user'] = $user;
    echo json_encode(['status' => 'success', 'user' => $user, ]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid token']);
}
