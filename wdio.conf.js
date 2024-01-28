exports.config = {
    runner: 'local',
    specs: [
        '/Users/user/Desktop/___Testing/e2e-santa/cypress/e2e/tests/**/*.feature'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec', ['allure', {
        outputDir: './allure-result',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    // ... (остальные настройки)

    // Пример хуков (hooks) для allure
    beforeTest: function (test, context) {
        browser.allure.addFeature('Your Feature');
        browser.allure.addSeverity('normal');
    },
    afterTest: function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            browser.takeScreenshot(); // Добавление скриншота к отчету при неудачном тесте
        }
    },
};