const Setting = require('../pageobjects/pluginSetting/setting')
const path = require('path');
const { BroweserHandler } = require('../common/main');
const browserHandler = require('../common/browserHandler');
const XPATH_INSTALL_PLUGIN = 'tbody.gaia-admin-listtable-table-body tr:first-child td:first-child span input'
const filePath = path.join(__dirname,'..','..','..','wdio-custom-comand','plugins','export_pdf_plugin_pfeegombbkebicpfnfnodmogekapmgem.zip')
const Name = 'PDF Exporting'
const APP_USE_PLUGIN = 'tbody.gaia-plugin-list-body tr:first-child td:nth-child(3) div:first-child a'
const ICON_REMOVE ='tbody.gaia-plugin-list-body tr:first-child td.gaia-system-table-menu img'
describe('Plugins-kintone administrator', () => {
    it.skip('[Case 1] - Install plugin', () => {
        Setting.Setup.InstallPlugin_FristTime(filePath,XPATH_INSTALL_PLUGIN)
    });
    it('[Case 2] -Remove plugin', () => {
        Setting.PluginSetting.navigate_kintoneAdministrator()
        browser.pause(2000)
        Setting.PluginSetting.deletePlugin(APP_USE_PLUGIN,ICON_REMOVE,Name)  
    });
})