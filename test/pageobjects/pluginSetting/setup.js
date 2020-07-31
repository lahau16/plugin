const Setting = require('./setting')
const Helper = require('../../common/main')
class Setup {
    InstallPlugin_FristTime(filePath,locator){
        Setting.PluginSetting.navigate_kintoneAdministrator()
        Setting.PluginSetting.importPlugin(filePath)
        Setting.PluginSetting.navigate_appSetting()
        browser.pause(5000)
        Setting.PluginSetting.newPlugin()
        browser.pause(5000)
        Setting.PluginSetting.installPluginInApp(locator)
        browser.pause(5000)
        Setting.AppSetting.updateApp()
        browser.pause(5000)
    }
    ImportPlugin(filePath){
        Setting.PluginSetting
            .navigate_kintoneAdministrator()
            .importPlugin(filePath)
    }
    InstalPluginApp(locator){
        Setting.PluginSetting.navigate_appSetting()
        browser.pause(5000)
        Setting.PluginSetting.newPlugin()
        browser.pause(5000)
        Setting.PluginSetting.installPluginInApp(locator)
    }
    ChangeSettingPlugin(locator){
        Setting.PluginSetting.changeSetting(locator)
    }
    
}
module.exports = new Setup()
