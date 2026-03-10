import { defineConfig } from "allure";
import 'dotenv/config';

const { TEST_ENV } = process.env;
const isCI = TEST_ENV === 'ci';

export default defineConfig({
  name: "my-report",
  output: "allure-report",
  historyPath: isCI ? "allure-history.jsonl" : undefined,
  historyLimit: 10,
});
