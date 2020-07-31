const UPDATE_APP_LOCATOR = '//button[contains(@class,"app-deploy-button")]';
const OK_LOCATOR = '//button[@name="ok"]';
const Helper = require('../../common/main');
const CONSTANT = require('../../common/constant')
const SETTING = 'div.menu-gaia div#breadcrumb-list-gaia ul li:nth-child(2) a'

class AppSettings {
    updateApp() {
        Helper.BroweserHandler.navigate(CONSTANT.PATH.APP_SETTING_INDEX)
        Helper.ElementHandler.waitForElement(UPDATE_APP_LOCATOR);
        $(UPDATE_APP_LOCATOR).click();
        Helper.ElementHandler.waitForElement(OK_LOCATOR);
        $(OK_LOCATOR).click();
        Helper.ElementHandler.verifyTitle("Settings");
        Helper.ElementHandler.verifyURL(CONSTANT.PATH.APP_INDEX);
        return this;
    };
    updateApp_after_remove_plugin() {
        $(SETTING).click();
        Helper.ElementHandler.waitForElement(UPDATE_APP_LOCATOR);
        $(UPDATE_APP_LOCATOR).click();
        Helper.ElementHandler.waitForElement(OK_LOCATOR);
        $(OK_LOCATOR).click();
        Helper.ElementHandler.verifyTitle("Settings");
        Helper.ElementHandler.verifyURL(CONSTANT.PATH.APP_INDEX);
        return this;
    };
    
}
module.exports = new AppSettings();