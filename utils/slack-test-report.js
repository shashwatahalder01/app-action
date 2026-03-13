import "dotenv/config";
import { execSync } from "child_process";

const { AI_SLACK_REPORTER, AI_MODEL } = process.env;

let reportPath = "./ctrf/ctrf-report.json";
let testSuite = "Android Test Suite Results";
let suffix = "<@U0AL3V168E5> Please review";

let mergeReports = "npx ctrf merge ./ctrf";
let failOnCommand = `npx slack-ctrf results ${reportPath} --onFailOnly -t "${testSuite}"`;
let failedTestSummary = `npx slack-ctrf failed ${reportPath} --consolidated -s "${suffix}"`;

try {
  execSync(mergeReports, { stdio: "inherit" });
  execSync(failOnCommand, { stdio: "inherit" });
  execSync(failedTestSummary, { stdio: "inherit" });
} catch (error) {
  console.error("An error occurred during Slack notification:", error.message);
}

if (AI_SLACK_REPORTER === "true") {
  console.log("🤖 AI Slack Reporter is enabled. Generating AI summary...");

  const aiReporterGemini = `npx ai-ctrf gemini ${reportPath} --model gemini-2.5-flash`;
  const aiReporterMistral = `npx ai-ctrf mistral ${reportPath}`;

  const aiReporter = AI_MODEL === "gemini" ? aiReporterGemini : aiReporterMistral;
  const aiReporterSummary = `npx slack-ctrf ai ${reportPath} --consolidated`;

  try {
    execSync(aiReporter, { stdio: "inherit" });
    execSync(aiReporterSummary, { stdio: "inherit" });
  } catch (error) {
    console.error("An error occurred during AI Slack notification:", error.message);
  }
}
