class SignInWithGoogle {
  constructor() {
    this.token = null;
    this.tokenURL = null;
    this.failURL = null;
    this.successURL = null;
  }

  Token(token) {
    this.token = token;
    return this.#trySend();
  }

  TokenURL(url) {
    this.tokenURL = url;
    return this.#trySend();
  }

  FailURL(url) {
    this.failURL = url;
    return this.#trySend();
  }

  SuccessURL(url) {
    this.successURL = url;
    return this.#trySend();
  }

  #trySend() {
    if (this.token && this.tokenURL && this.failURL && this.successURL) {
      const formData = new FormData();
      formData.append('token', this.token);

      fetch(this.tokenURL, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          window.location.href = this.successURL;
        } else {
          window.location.href = this.failURL;
        }
      })
      .catch(err => {
        console.error('SignInWithGoogle Error:', err);
        window.location.href = this.failURL;
      });
    }
    return this;
  }
}