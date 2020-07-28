const CONFIG = require('./config.js');
/**
 * Environment constants
 */
const constant = function () {
    return {
        PATH: {
            BASE_URL: `https://${CONFIG.domain}`,
            LOGIN_URL: `https://${CONFIG.domain}/login`,
            LOGOUT_URL: `https://${CONFIG.domain}/logout`,
            APP_INDEX: `https://${CONFIG.domain}/k/${CONFIG.appID}/`,
            APP_SETTING_INDEX: `https://${CONFIG.domain}/k/admin/app/flow?app=${CONFIG.appID}#section=settings`,
            APP_SETTING_JS_CUSTOMIZE: `https://${CONFIG.domain}/k/admin/app/customize?app=${CONFIG.appID}`,
            PLUGIN_CHANGE_SETTING:`https://${CONFIG.domain}/k/admin/app/${CONFIG.appID}/plugin/#/`,
            PORTAL: `https://${CONFIG.domain}/k/#/portal`
        }
    };
};

module.exports = constant();