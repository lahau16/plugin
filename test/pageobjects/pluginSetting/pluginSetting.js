const CONSTANT = require('../../common/constant')
const Helper = require('../../common/main');
const AppSetting = require('../../pageobjects/pluginSetting/appSetting');
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
const UNINSTALL_BUTTON ='div.removelink-confirm-cybozu span:last-child a:first-child'
const TABLE ='tbody.gaia-admin-listtable-table-body'
const TABLE_IMPORTED = 'div.gaia-admin-system-plugin-imported-wrapper table tbody tr'
const TABLE_MARKET ='div.gaia-admin-system-plugin-market-wrapper table tbody'
class PluginSetting {
    navigate_kintoneAdministrator(){
        browser.pause(2000)
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
        console.log("lấy thử thôi ",$(XPATH_BROWSER_BUTTON))
        $(XPATH_BROWSER_BUTTON).setValue(filePath);
        Helper.ElementHandler
            .waitForElement(XPATH_IMPORT_OK_BUTTON)
            .click(XPATH_IMPORT_OK_BUTTON)
        browser.pause(10000)
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
    // installAnyPuginInApp(Name){
    //     const length_table =$$('tbody.gaia-admin-listtable-table-body tr').length
    //     for (let i = 1; i <= length_table; i++){
    //         const Name_row= 
    //     }
    // }
    changeSetting(locator){
        Helper.ElementHandler
            .waitForElement(locator)
            .click(locator)
    }
    deletePlugin(Name){
        const length_table_imported = $$('div.gaia-admin-system-plugin-imported-wrapper table tbody tr').length
        for (let i = 1; i<=length_table_imported;i++){
            let Name_Plugin = $('div.gaia-admin-system-plugin-imported-wrapper table tbody tr:nth-child('+ i +') td:first-child div').getText();
            const APP_USE_PLUGIN_NUMBER =$$('div.gaia-admin-system-plugin-imported-wrapper table tbody tr:nth-child(' + i + ') td:nth-child(3) div').length
            const APP_USE_PLUGIN_NONE =$('div.gaia-admin-system-plugin-imported-wrapper table tbody tr:nth-child(' + i + ') td:nth-child(3) div:first-child').getText()
            if(Name == Name_Plugin){  
                if (APP_USE_PLUGIN_NONE == "None"){
                    $('div.gaia-admin-system-plugin-imported-wrapper table tbody tr:nth-child('+ i +') td:last-child img').click()
                    $(UNINSTALL_BUTTON).click()
                }
                else{
                    for (let j = 1; j<=APP_USE_PLUGIN_NUMBER; j++){   
                        const parent = browser.getUrl();    
                        const APP_USE_PLUGIN_LINK =$('div.gaia-admin-system-plugin-imported-wrapper table tbody tr:nth-child('+ i +') td:nth-child(3) div:nth-child('+ j +') a')
                        const APP_USE_PLUGIN_LINK_HREF = APP_USE_PLUGIN_LINK.getAttribute("href")
                        browser.newWindow(APP_USE_PLUGIN_LINK_HREF)
                        Helper.ElementHandler.click(PLUG_INS)
                        browser.pause(2000)
                        const Table_Plugin_Delete = $$('tbody.gaia-admin-listtable-table-body tr')
                        const length_Table_Plugin_Delete = Table_Plugin_Delete.length
                        for (let k = 1; k <= length_Table_Plugin_Delete; k++ ){
                            let Name_Plugin_Delete = $('tbody.gaia-admin-listtable-table-body tr:nth-child('+ k +') td:first-child div div:first-child')
                            let Name_Plugin_Delete_TEXT = Name_Plugin_Delete.getText()
                            if(Name == Name_Plugin_Delete_TEXT){
                                const iconRemove = $('tbody.gaia-admin-listtable-table-body tr:nth-child('+ k +') td:nth-child(4) span')
                                Helper.ElementHandler
                                    .click(iconRemove)
                                Helper.ElementHandler
                                    .waitForElement(UNINSTALL_BUTTON)
                                    .click(UNINSTALL_BUTTON)
                                AppSetting.updateApp_after_remove_plugin()
                                break  
                            }     
                        }
                        browser.switchWindow(parent)
                    }
                    browser.pause(2000)
                    $('div.gaia-admin-system-plugin-imported-wrapper table tbody tr:nth-child('+ i +') td:last-child img').click()
                    Helper.ElementHandler.waitForElement(UNINSTALL_BUTTON)
                    $(UNINSTALL_BUTTON).click()
                    break
                }                
            }
        }
        

    }
}
module.exports = new PluginSetting();