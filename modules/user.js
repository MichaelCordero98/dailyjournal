class User {
  constructor() {
    this.isLoggedIn = false;
    this.loginText = "LOGIN";
    this.user = "";
  }

  getUser() {
    return this.user;
  }

  getLogin() {
    return this.isLoggedIn;
  }

  getLoginText() {
    return this.loginText;
  }

  login(user) {
    this.isLoggedIn = true;
    this.loginText = "LOGOUT";
    this.user = user;
  }

  logout() {
    this.isLoggedIn = false;
    this.loginText = "LOGIN";
    this.user = "";
  }
}

const user = new User();
module.exports = user;
