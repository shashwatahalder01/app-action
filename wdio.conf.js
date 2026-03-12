import "dotenv/config";
import * as os from "os";
import path from "path";
import fs from "fs";

const { GITHUB_REPOSITORY, GITHUB_RUN_NUMBER, GITHUB_RUN_ID } = process.env;


export const config = {
  runner: "local",
  specs: ["./tests/**/*.js"],
  maxInstances: 1,
  logLevel: "error",
  waitforTimeout: 10000,
  framework: "mocha",
  mochaOpts: {
    timeout: 120000,
    // retries: 2,
  },
  // specFileRetries: 1,
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
    // [
    //   "allure",
    //   {
    //     outputDir: "allure-results",
    //   },
    // ],
    [
      "ctrf-json",
      {
        outputDir: "ctrf",
        minimal: false,
        testType: "E2E",
        appName: "Chatway",
        // appVersion: '1.0.0',
        osPlatform: os.platform(),
        osRelease: os.release(),
        osVersion: os.version(),
        buildName: "App Automation Tests",
        buildNumber: GITHUB_RUN_NUMBER || "unknown",
        buildUrl: `https://github.com/${GITHUB_REPOSITORY || "unknown"}/actions/runs/${GITHUB_RUN_ID || "unknown"}`,
      },
    ],
    //   [
    //     SlackReporter,
    //     {
    //       slackOptions: {
    //         type: "web-api",
    //         channel: SLACK_CHANNEL,
    //         token: SLACK_BOT_TOKEN,
    //         uploadScreenshotOfFailedCase: true,
    //         notifyDetailResultThread: true,
    //         filterForDetailResults: ["failed"],
    //       },

    //       title: "E2E Test Suite",
    //       resultsUrl: "http://localhost:3000/allure-results",
    //       notifyTestStartMessage: false,
    //       notifyTestFinishMessage: false,
    //       notifyFailedCase: true,
    //     },
    //   ],
  ],

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--no-sandbox", "--disable-dev-shm-usage", "--headless", "--disable-gpu", "--window-size=1920,1080"],
      },
    },
  ],

  afterTest: async function (test, context, { error, passed }) {
    // if (!passed) {
    //   // suiteFailed = true;
    //   const screenshot = await browser.takeScreenshot();
    //   SlackReporter.uploadFailedTestScreenshot(screenshot);
    // }
  },

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
