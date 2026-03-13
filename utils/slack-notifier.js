import { WebClient } from "@slack/web-api";
import "dotenv/config";

const { GITHUB_REPOSITORY, GITHUB_RUN_ID, GITHUB_RUN_NUMBER, WORKFLOW, SLACK_CHANNEL_ID, SLACK_BOT_TOKEN } = process.env;
const client = new WebClient(SLACK_BOT_TOKEN); // add logLevel: "error" to supress warnings
const tags = "U0AL3V168E5";

// github workflow
const title = "GHA Workflow Failure Alert";
const message = "The failure occurred before or outside the actual test execution.";
const runUrl = `https://github.com/${GITHUB_REPOSITORY || "unknown"}/actions/runs/${GITHUB_RUN_ID || "unknown"}`;

async function sendNotification() {
  const tagString = tags
    ? tags
        .split(",")
        .map((id) => `<@${id.trim()}>`)
        .join(" ")
    : "";

  const messageBlocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `⚠️ ${title}`,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: [
          `*Status:* A workflow step failed.`,
          `*Detail:* ${message}`,
          `*Build:* <${runUrl}|${WORKFLOW || "unknown"} #${GITHUB_RUN_NUMBER || "unknown"}>`,
          ``,
          ``,
          `${tagString} Please review.`,
        ].join("\n"),
      },
    },
  ];

  try {
    await client.chat.postMessage({
      channel: SLACK_CHANNEL_ID,
      text: "\u200B",
      attachments: [
        {
          color: "#f20505",
          blocks: messageBlocks,
        },
      ],
    });
    console.log("✅ Notification sent successfully");
  } catch (error) {
    console.error("❌ Error sending Slack notification:", error);
  }
}

sendNotification();
