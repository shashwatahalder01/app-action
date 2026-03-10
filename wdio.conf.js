import "dotenv/config";
import fs from "fs";
import SlackReporter from "@moroo/wdio-slack-reporter";

const { SLACK_CHANNEL, SLACK_BOT_TOKEN } = process.env;

export const config = {
  runner: "local",
  specs: ["./test/app/**/*.js"],
  maxInstances: 1,
  logLevel: "info",
  waitforTimeout: 10000,
  framework: "mocha",
  mochaOpts: {
    timeout: 120000,
  },
  reporterSyncTimeout: 30000,
  reporters: [
    [
      "spec",
      {
        realtimeReporting: true,
        color: true,
        showPreface: false,
      },
    ],
    [
      "allure",
      {
        outputDir: "allure-results",
        // historyPath: "allure-history.jsonl",
        // historyLimit: 20,
      },
    ],
    [
      SlackReporter,
      {
        slackOptions: {
          type: "web-api",
          channel: SLACK_CHANNEL,
          token: SLACK_BOT_TOKEN,
        },
        title: "E2E Test Results",
        notifyTestFinishMessage: true,
        uploadScreenshotOfFailedCase: true,
      },
    ],
  ],

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--no-sandbox", "--disable-dev-shm-usage", "--headless", "--disable-gpu", "--window-size=1920,1080"],
      },
    },
  ],

  // slack notification configuration

  // port: 4723,
  // services: [
  //   [
  //     "appium",
  //     {
  //       args: {
  //         relaxedSecurity: true,
  //       },
  //     },
  //   ],
  // ],

  // capabilities: [{
  //   // local
  //   platformName: "Android",
  //   // 'appium:browserName': 'Chrome',
  //   // "appium:deviceName": "Pixel_4_API_34",
  //   "appium:udid": "emulator-5554",
  //   // "appium:platformVersion": "14",
  //   "appium:automationName": "UiAutomator2",
  //   "appium:app": process.env.LOCAL_APP,
  //   "appium:autoGrantPermissions": true,
  //   // "appium:skipDeviceInitialization": true,
  //   // "appium:skipServerInstallation": true,
  //   // "appium:fullReset": false,
  //   // "appium:noReset": true,
  //   // 'goog:chromeOptions': {
  //   //   args: [
  //   //     '--user-agent=Mozilla/5.0 (Linux; Android 13; SM-S908U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36'
  //   //   ]
  //   // }
  // },
  // ],
};
