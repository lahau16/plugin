const Helper = require('../../common/main');
const CONSTANT = require('../../common/constant');

class Logout {
    navigateToLoginPage() {
        browser.url(CONSTANT.PATH.LOGOUT_URL);
        Helper.ElementHandler.verifyURL(CONSTANT.PATH.LOGIN_URL);
        return this;
    }
}
module.exports = new Logout();