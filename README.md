# Google Sign-In Manager 🚀

A simple, fluent JavaScript class for integrating Google Sign-In functionality into your web applications. This library provides a clean, chainable API that combines Google's Sign-In button rendering with backend token verification.

## Features ✨

- 🔗 **Fluent Interface** - Chainable method calls for easy configuration
- 🎨 **Customizable Button** - Full control over Google Sign-In button appearance
- 🛡️ **Secure Token Handling** - Built-in backend verification flow
- 📱 **Auto-Prompt Support** - Optional automatic sign-in prompts
- 🎯 **Zero Dependencies** - Works with vanilla JavaScript
- 🔄 **Dynamic Loading** - Automatically loads Google Sign-In scripts

## Quick Start 🏃‍♂️

### 1. Include the Script

```html
<!DOCTYPE html>
<html>
<head>
  <script src="GoogleSignInManager.js"></script>
</head>
<body>
  <div id="signin-container"></div>
</body>
</html>
```

### 2. Initialize with Fluent API

```javascript
new GoogleSignInManager()
  .ElementID('signin-container')
  .ClientID('your-google-client-id')
  .CheckTokenURL('backend/verify-token.php')
  .FailURL('login-failed.html')
  .SuccessURL('dashboard.html');
```

That's it! The Google Sign-In button will automatically appear in your container.

## API Reference 📚

### Core Methods

| Method | Description | Required | Example |
|--------|-------------|----------|---------|
| `ElementID(id)` | Sets the container element ID | ✅ | `.ElementID('my-signin-btn')` |
| `ClientID(id)` | Sets your Google OAuth Client ID | ✅ | `.ClientID('123-abc.apps.googleusercontent.com')` |
| `CheckTokenURL(url)` | Backend endpoint for token verification | ✅ | `.CheckTokenURL('api/verify.php')` |
| `FailURL(url, callback)` | Redirect URL on authentication failure with optional callback | ✅ | `.FailURL('error.html', (data) => console.log(data))` |
| `SuccessURL(url, callback)` | Redirect URL on successful authentication with optional callback | ✅ | `.SuccessURL('dashboard.html', (data) => console.log(data))` |

### Optional Configuration

| Method | Description | Default | Example |
|--------|-------------|---------|---------|
| `AutoPrompt(boolean)` | Enable automatic sign-in prompt | `false` | `.AutoPrompt(true)` |
| `ButtonConfig(object)` | Customize button appearance | See below | `.ButtonConfig({theme: 'filled'})` |

### Button Configuration Options

```javascript
.ButtonConfig({
  type: 'standard',        // 'standard' or 'icon'
  size: 'large',          // 'large', 'medium', 'small'
  theme: 'outline',       // 'outline', 'filled_blue', 'filled_black'
  text: 'sign_in_with',   // 'signin_with', 'signup_with', 'continue_with', 'signin'
  shape: 'rectangular',   // 'rectangular', 'pill', 'circle', 'square'
  logo_alignment: 'left'  // 'left', 'center'
})
```

## New Features 🆕

### Optional Callbacks for Success and Failure

The `SuccessURL()` and `FailURL()` methods now support optional callback functions that execute before the redirect occurs. This allows you to perform custom actions like analytics tracking, UI updates, or data processing.

#### Callback Parameters

- **Success Callback**: Receives the response data from your backend verification endpoint
- **Failure Callback**: Receives either the error response from your backend or an error object for network failures

#### Example Usage

```javascript
new GoogleSignInManager()
  .ElementID('signin-container')
  .ClientID('your-google-client-id')
  .CheckTokenURL('backend/verify-token.php')
  .FailURL('login-failed.html', (errorData) => {
    // Custom error handling
    console.error('Login failed:', errorData);
    
    // Show user-friendly message
    showNotification('Login failed. Please try again.', 'error');
  })
  .SuccessURL('dashboard.html', (successData) => {
    // Custom success handling
    console.log('Login successful:', successData);
    
    // Update UI
    showNotification('Welcome! Redirecting to dashboard...', 'success');
    document.getElementById('loading-spinner').style.display = 'block';
  });
```

#### Callback Data Structure

**Success Callback Data** (from your backend):
```javascript
{
  status: 'success',
  user_id: '12345',
  email: 'user@example.com',
  // ... other user data from your backend
}
```

**Failure Callback Data** (from your backend or network errors):
```javascript
{
  status: 'error',
  message: 'Invalid token',
  // ... other error details
}

// For network errors:
{
  status: 'error',
  error: ErrorObject
}
```

## Complete Examples 💡

### Basic Implementation

```html
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <script src="GoogleSignInManager.js"></script>
</head>
<body>
  <h1>Welcome to My App</h1>
  <div id="google-signin"></div>
  
  <script>
    new GoogleSignInManager()
      .ElementID('google-signin')
      .ClientID('your-google-client-id')
      .CheckTokenURL('verify-token.php')
      .FailURL('login-error.html')
      .SuccessURL('dashboard.html');
  </script>
</body>
</html>
```

### Advanced Configuration

```javascript
new GoogleSignInManager()
  .ElementID('custom-signin')
  .ClientID('your-client-id')
  .CheckTokenURL('/api/auth/google')
  .FailURL('/auth/error', (data) => {
    console.log('Authentication failed:', data);
    // Custom error handling before redirect
  })
  .SuccessURL('/dashboard', (data) => {
    console.log('Authentication successful:', data);
    // Custom success handling before redirect
  })
  .AutoPrompt(true)
  .ButtonConfig({
    type: 'standard',
    size: 'large',
    theme: 'filled_blue',
    text: 'continue_with',
    shape: 'pill',
    logo_alignment: 'center'
  });
```

### Using Callbacks for Custom Logic

```javascript
new GoogleSignInManager()
  .ElementID('signin-btn')
  .ClientID('your-client-id')
  .CheckTokenURL('/api/verify')
  .FailURL('/error', (data) => {
        
    // Show custom error message
    document.getElementById('error-msg').textContent = 'Sign-in failed. Please try again.';
  })
  .SuccessURL('/dashboard', (data) => {
    
    // Update UI before redirect
    document.getElementById('loading').style.display = 'block';
  });
```

### Multiple Sign-In Buttons

```javascript
// Header sign-in (small)
new GoogleSignInManager()
  .ElementID('header-signin')
  .ClientID('your-client-id')
  .CheckTokenURL('/api/verify')
  .FailURL('/error')
  .SuccessURL('/dashboard')
  .ButtonConfig({
    size: 'small',
    theme: 'outline'
  });

// Main page sign-in (large)
new GoogleSignInManager()
  .ElementID('main-signin')
  .ClientID('your-client-id')
  .CheckTokenURL('/api/verify')
  .FailURL('/error')
  .SuccessURL('/dashboard')
  .ButtonConfig({
    size: 'large',
    theme: 'filled_blue'
  });
```

## Backend Integration 🔧

The `CheckTokenURL` endpoint should handle the POST request with the Google ID token:

### PHP Example

```php
<?php
// verify-token.php
if ($_POST['token']) {
    $token = $_POST['token'];
    
    // Verify token with Google
    require_once 'GoogleLoginStandalone.php';
    $client = new GoogleLoginStandalone("your-client-id");
    $payload = $client->verifyIdToken($token);
    
    if ($payload) {

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

        // Token is valid
        $user_id = $payload['sub'];
        $email = $payload['email'];
        $name = $payload['name'];
        
        // Create user session, save to database, etc.
        
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid token']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No token provided']);
}
?>
```
 

## Setup Guide 🛠️

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins

### 2. Configure Your HTML

```html
<!-- Add container element -->
<div id="signin-button"></div>

<!-- Include the script -->
<script src="GoogleSignInManager.js"></script>

<!-- Initialize with your credentials -->
<script>
  new GoogleSignInManager()
    .ElementID('signin-button')
    .ClientID('YOUR_CLIENT_ID_HERE')
    .CheckTokenURL('/your-backend-endpoint')
    .FailURL('/error-page')
    .SuccessURL('/success-page');
</script>
```

### 3. Set Up Backend Verification

Create an endpoint that:
- Receives the POST request with `token` parameter
- Verifies the token with Google's API
- Returns JSON with `status: 'success'` or `status: 'error'`

## Browser Support 🌐

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Troubleshooting 🐛

### Common Issues

**Button doesn't appear:**
- Check that the element ID exists in the DOM
- Verify your Client ID is correct
- Ensure your domain is in Google Console authorized origins

**Authentication fails:**
- Verify backend endpoint is reachable
- Check that token verification is implemented correctly
- Ensure proper CORS headers if needed

**Automatic prompt not working:**
- Check browser popup blockers
- Verify `AutoPrompt(true)` is called
- Some browsers require user interaction first

### Debug Mode

```javascript
// Add console logging to debug
const manager = new GoogleSignInManager()
  .ElementID('signin')
  .ClientID('your-id')
  // ... other config

// Check if initialization worked
console.log('Manager initialized:', manager);
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

 
---

Made with ❤️ for developers who want simple Google Sign-In integration.
