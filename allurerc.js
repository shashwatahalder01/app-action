import { defineConfig } from "allure";
const { TEST_ENV } = process.env;
const isCI = TEST_ENV === 'ci';

export default defineConfig({
  name: "my-report",
  output: "./allure-report",
  historyPath: "./allure-history/allure-history.jsonl", 
  historyLimit: 10,
});
