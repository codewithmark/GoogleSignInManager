class GoogleSignInManager {
  constructor() {
    this.elementId = null;
    this.clientId = null;
    this.tokenURL = null;
    this.failURL = null;
    this.successURL = null;
    this.failCallback = null;
    this.successCallback = null;
    this.autoPrompt = false;
    this.buttonConfig = {
      type: 'standard',
      size: 'large',
      theme: 'outline',
      text: 'sign_in_with',
      shape: 'rectangular',
      logo_alignment: 'left'
    };
    this.initialized = false;
  }

  // Configuration methods
  ElementID(elementId) {
    this.elementId = elementId;
    this.#tryInit();
    return this;
  }

  ClientID(clientId) {
    this.clientId = clientId;
    this.#tryInit();
    return this;
  }

  CheckTokenURL(url) {
    this.tokenURL = url;
    return this;
  }

  FailURL(url, callback = null) {
    this.failURL = url;
    this.failCallback = callback;
    return this;
  }

  SuccessURL(url, callback = null) {
    this.successURL = url;
    this.successCallback = callback;
    return this;
  }

  AutoPrompt(enabled) {
    this.autoPrompt = enabled;
    return this;
  }

  ButtonConfig(config) {
    this.buttonConfig = { ...this.buttonConfig, ...config };
    return this;
  }

  #tryInit() {
    if (this.elementId && this.clientId && !this.initialized) {
      this.init();
      this.initialized = true;
    }
  }

  // Initialize the Google Sign-In
  init() {
    // Load Google Sign-In script if not already loaded
    if (!window.google) {
      this.loadGoogleScript();
    } else {
      this.setupGoogleSignIn();
    }
  }

  loadGoogleScript() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.setupGoogleSignIn();
    };
    document.head.appendChild(script);
  }

  setupGoogleSignIn() {
    const container = document.getElementById(this.elementId);
    if (!container) {
      console.error(`Element with ID '${this.elementId}' not found`);
      return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Create the onload div
    const onloadDiv = document.createElement('div');
    onloadDiv.id = 'g_id_onload';
    onloadDiv.setAttribute('data-client_id', this.clientId);
    onloadDiv.setAttribute('data-callback', 'handleCredentialResponse');
    onloadDiv.setAttribute('data-auto_prompt', this.autoPrompt.toString());

    // Create the signin button div
    const signinDiv = document.createElement('div');
    signinDiv.className = 'g_id_signin';
    Object.keys(this.buttonConfig).forEach(key => {
      signinDiv.setAttribute(`data-${key}`, this.buttonConfig[key]);
    });

    // Append elements to container
    container.appendChild(onloadDiv);
    container.appendChild(signinDiv);

    // Set up global callback function
    window.handleCredentialResponse = (response) => {
      this.handleCredentialResponse(response);
    };

    // Initialize Google Sign-In if the API is ready
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: window.handleCredentialResponse
      });
      
      // Render the button
      window.google.accounts.id.renderButton(signinDiv, this.buttonConfig);
      
      if (this.autoPrompt) {
        window.google.accounts.id.prompt();
      }
    }
  }

  handleCredentialResponse(response) {
    const idToken = response.credential;

    if (!this.tokenURL || !this.failURL || !this.successURL) {
      console.error('GoogleSignInManager: Missing required URLs. Please set tokenURL, failURL, and successURL.');
      return;
    }

    // Use the existing SignInWithGoogle logic
    this.processToken(idToken);
  }

  processToken(token) {
    const formData = new FormData();
    formData.append('token', token);

    fetch(this.tokenURL, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        if (this.successCallback && typeof this.successCallback === 'function') {
          this.successCallback(data);
        }
        window.location.href = this.successURL;
      } else {
        if (this.failCallback && typeof this.failCallback === 'function') {
          this.failCallback(data);
        }
        window.location.href = this.failURL;
      }
    })
    .catch(err => {
      console.error('GoogleSignInManager Error:', err);
      if (this.failCallback && typeof this.failCallback === 'function') {
        this.failCallback({ status: 'error', error: err });
      }
      window.location.href = this.failURL;
    });
  }

  // Method to programmatically trigger sign-in
  signIn() {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt();
    }
  }

  // Method to sign out
  signOut() {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  }
}
