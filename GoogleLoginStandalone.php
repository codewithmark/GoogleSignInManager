<?php
class GoogleLoginStandalone
{
    private $clientId;
    private $googleOAuthUrl = 'https://oauth2.googleapis.com/tokeninfo';

    public function __construct($clientId)
    {
        if (!$clientId) {
            throw new Exception("Google Client ID is required.");
        }
        $this->clientId = $clientId;
    }

    public function verify($idToken)
    {
        $url = $this->googleOAuthUrl . '?id_token=' . urlencode($idToken);
        $response = file_get_contents($url);

        if ($response === false) {
            return null;
        }

        $data = json_decode($response, true);

        if (
            isset($data['aud']) &&
            ($data['aud'] === $this->clientId || $data['azp'] === $this->clientId)
        ) {
            return [
                'id'                => $data['sub'] ?? null,
                'email'             => $data['email'] ?? null,
                'full_name'         => $data['name'] ?? '',
                'first_name'        => $data['given_name'] ?? '',
                'last_name'         => $data['family_name'] ?? '',
                'email_verified'    => $data['email_verified'] ?? false,
                'picture'           => $data['picture'] ?? '',
                'verified'          => $data['email_verified'] ?? false,
                'raw'               => $data
            ];
        }

        return null;
    }
}