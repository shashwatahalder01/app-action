import "dotenv/config";
import { execSync } from "child_process";

let reportPath = "./ctrf/ctrf-tests-android.test.json";
let testSuite = "Android Test Suite Results"; 
let suffix = "<@U0AL3V168E5> Please review";

let failOnCommand = `npx slack-ctrf results ${reportPath} --onFailOnly -t "${testSuite}" -s "${suffix}"`;
let failedTestSummery = `npx slack-ctrf failed ${reportPath} --consolidated -s "${suffix}"`;

try {
  execSync(failOnCommand, { stdio: "inherit" });
  execSync(failedTestSummery, { stdio: "inherit" });
} catch (error) {
  console.error("An error occurred during Slack notification:", error.message);
}

