<?php

/*
Client ID = 86712340085-nb37qkvbqjg705lli342pe7hee78hpga.apps.googleusercontent.com

Client secret = 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

Youtube Video: https://www.youtube.com/watch?v=TjMhPr59qn4

https://www.youtube.com/watch?v=tgO_ADSvY1I


*/
session_start();
require_once 'GoogleLoginStandalone.php';
require_once 'key.php';

//$clientId = '86712340085-nb37qkvbqjg705lli342pe7hee78hpga.apps.googleusercontent.com';

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