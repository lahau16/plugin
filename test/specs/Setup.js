const Setting = require('../pageobjects/pluginSetting/setting')
const path = require('path');
const { BroweserHandler } = require('../common/main');
const browserHandler = require('../common/browserHandler');
const XPATH_INSTALL_PLUGIN = 'tbody.gaia-admin-listtable-table-body tr:first-child td:first-child span input'
const filePath = path.join(__dirname,'..','..','..','plugin','plugins','plugin.zip')
const Name_Plugin = 'Conditional Display'
const APP_USE_PLUGIN = 'tbody.gaia-plugin-list-body tr:first-child td:nth-child(3) div:first-child a'
const ICON_REMOVE ='tbody.gaia-plugin-list-body tr:first-child td.gaia-system-table-menu img'
describe('Plugins-kintone administrator', () => {
    it('[Case 1] - Install plugin', () => {
        Setting.PluginSetting.navigate_kintoneAdministrator()
        Setting.PluginSetting.importPlugin(filePath)
        Setting.PluginSetting.navigate_appSetting()
        Setting.PluginSetting.newPlugin()
        Setting.PluginSetting.installPluginInApp(XPATH_INSTALL_PLUGIN)
        Setting.AppSetting.updateApp()
    });
    it('[Case 2] -Remove plugin', () => {
        Setting.PluginSetting.navigate_kintoneAdministrator()
        // browser.pause(2000)
        Setting.PluginSetting.deletePlugin(Name_Plugin) 
    });
    // it.skip('[Case 3] - Install plugin', () => {
    //     Setting.PluginSetting.navigate_appSetting()
    //     Setting.PluginSetting.newPlugin()
    //     Setting.PluginSetting.installPluginInApp()

    // });
})