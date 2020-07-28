const CONSTANT = require('../../common/constant')
const Helper = require('../../common/main');
const browserHandler = require('../../common/browserHandler');
const XPATH_PORTAL_KINTONEADMINISTRATOR= '//span[@class="gaia-header-img gaia-header-img-settings"]'
const XPATH_CLICK_KINTONEADMINISTRATOR='//div[@id=":5"]//div[@class="gaia-argoui-pulldown-item-content"]'
const TITLE= 'kintone Administration'
const XPATH_PLUGINS='a[href="/k/admin/system/plugin/"]'
const XPATH_IMPORT_BUTTON = '//a[@id="page-admin-system-plugin-index-addplugin"]'
const XPATH_BROWSER_BUTTON ='#item-container input'
const XPATH_IMPORT_OK_BUTTON= 'div.ocean-ui-dialog-buttons button.goog-buttonset-default'
const XPATH_INSTALL_PLUGIN_OK ='//button[@class="goog-buttonset-default"]'

const CHANGE_APP_SETTINGS='a.gaia-argoui-app-menu-settings.gaia-argoui-app-menu'
const APP_SETTINGS= 'div.app-flow-tab-bar div.goog-tab-bar-top div:last-child'
const PLUG_INS ='div.gaia-argoui-admin-app-flow-settings-tab-column-middle div:nth-of-type(1) ul.gaia-argoui-admin-app-flow-settings-items li:first-child'

const NEW_BUTTON = 'ul#app-plugin-index-menu'
const ADD_BUTTON = 'form#app-plugin-add-form input#app-plugin-add-btn'
const UNINSTALL_BUTTON ='span.removelink-confirm-btns-cybozu a:first-child'
const TABLE ='tbody.gaia-admin-listtable-table-body'
class PluginSetting {
    navigate_kintoneAdministrator(){
        Helper.BroweserHandler.navigate(CONSTANT.PATH.PORTAL)
        Helper.ElementHandler
            .waitForElement(XPATH_PORTAL_KINTONEADMINISTRATOR)
            .click(XPATH_PORTAL_KINTONEADMINISTRATOR)
            .waitForElement(XPATH_CLICK_KINTONEADMINISTRATOR)
            .click(XPATH_CLICK_KINTONEADMINISTRATOR)
            .verifyTitle(TITLE)
            .click(XPATH_PLUGINS)
        return this
    }
    importPlugin(filePath){
        Helper.ElementHandler.click(XPATH_IMPORT_BUTTON)
        Helper.ElementHandler.waitForElement(XPATH_BROWSER_BUTTON)
        $(XPATH_BROWSER_BUTTON).setValue(filePath);
        browser.pause(10000)
        Helper.ElementHandler.click(XPATH_IMPORT_OK_BUTTON)
        browser.pause(100000)
        return this;
    }
    installPlugin(locator){
        Helper.ElementHandler.click(locator)
        Helper.ElementHandler.click(XPATH_INSTALL_PLUGIN_OK)
    }
    navigate_appSetting(){
        Helper.BroweserHandler.navigate(CONSTANT.PATH.APP_INDEX)
        Helper.ElementHandler.waitForElement(CHANGE_APP_SETTINGS)
        Helper.ElementHandler.click(CHANGE_APP_SETTINGS)
        Helper.ElementHandler.click(APP_SETTINGS)
        Helper.ElementHandler.click(PLUG_INS)
    }
    newPlugin(){
        Helper.ElementHandler
            .waitForElement(NEW_BUTTON)
            .click(NEW_BUTTON)
    }
    installPluginInApp(locator){
        Helper.ElementHandler
            .waitForElement(locator)
            .click(locator)
            .waitForElement(ADD_BUTTON)
            .click(ADD_BUTTON)
    }
    changeSetting(locator){
        Helper.ElementHandler
            .waitForElement(locator)
            .click(locator)
    }
    // deletePlugin(locator){
    //     while($(locator).isExisting){
    //         $(locator).click()
    //     }
    // }
    deletePlugin(locatorApps,locatorDelete,Name){
        do{
            if($(locatorApps).isExisting()){
                var url = $(locatorApps).href
                browser.pause(5000)
                console.log('ra được cái link không')
                const a = $('tbody.gaia-plugin-list-body tr:first-child td:nth-child(3) div:first-child a').href
                console.log(a)
                console.log('ra được thì nói một câu nha')
                browser.switchWindow(url)
                browser.pause(2000)
                Helper.ElementHandler
                    .waitForElement(PLUG_INS)
                    .click(PLUG_INS)
            var length = $(TABLE).rows.length
            for(var i=1; i<=length;i++){
                var getName = $('tbody.gaia-admin-listtable-table-body tr:nth-child(i) td:first-child div.gaia-admin-app-plugin-name div:first-child').textContent
                if(getName=Name){
                    $('tbody.gaia-admin-listtable-table-body tr:nth-child(i) td:last-child span').click()
                    $(UNINSTALL_BUTTON).click()
                }
            }    
            }
            else{
                $(locatorDelete).click()
                brower.pause(2000)
                $(UNINSTALL_BUTTON).click
                brower.pause(2000)
            }
        }
        while($(locatorApps).isExisting())
        
    }
}
module.exports = new PluginSetting();