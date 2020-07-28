  
const Login = require('../credentials/login.js');
const Logout = require('../credentials/logout.js');
const Helper = require('../../common/main');
const CONFIG = require('../../common/config');
const CONSTANT = require('../../common/constant');
class Auth {
    login() {
        console.log('!!! Login !!!');
        Helper.BroweserHandler.navigate(CONSTANT.PATH.LOGIN_URL);
        // Helper.ElementHandler.waitForElement(CONSTANT.PATH.APP_INDEX);
        Login.submitLoginFormWithValidCred(CONFIG.credentials.username, CONFIG.credentials.password);
        Helper.ElementHandler.verifyURL(CONSTANT.PATH.BASE_URL);
        return this;
    }

    logout() {
        console.log('!!! Logout !!!');
        Logout.navigateToLoginPage();
        return this;
    }
}
module.exports = new Auth();