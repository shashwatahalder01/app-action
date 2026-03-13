import { sendEmail } from '@utils/mailer';
// import 'dotenv/config'; // Enable for local testing

const { GITHUB_REPOSITORY, GITHUB_RUN_ID, ACTOR, WORKFLOW, EVENT_NAME } = process.env;

async function main() {
  const runUrl = `https://github.com/${GITHUB_REPOSITORY || 'unknown'}/actions/runs/${GITHUB_RUN_ID || 'unknown'}`;
  const previousRunUrl = `https://github.com/${GITHUB_REPOSITORY || 'unknown'}/actions?query=event%3Aschedule`;

  const subject = `⚠️ Workflow Failed: Push Notification Test`;
  const message = `
                🟠 Workflow Failure Alert
    
                Workflow: Push Notification Test
    
                📊 Execution Details:
                   - Workflow: ${WORKFLOW || 'unknown'}
                   - Trigger: ${EVENT_NAME || 'unknown'}
                   - Run by: ${ACTOR || 'unknown'}
    
                📌 What This Means:
                   The failure occurred before or outside the actual test execution.
                    No test result (pass/fail) was produced.

                🔎 Next Steps:
                   Please review the workflow logs to identify the root cause.
        
                👉 View full logs here:
                   ${runUrl}
    
                👉 Previous scheduled run logs are available at: ${previousRunUrl}
                `;

  await sendEmail(subject, message);
}

main().catch(console.error);
