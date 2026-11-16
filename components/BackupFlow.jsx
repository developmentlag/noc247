const STEPS = [
  {
    id: 1,
    name: 'Alert arrives',
    detail: 'A failed, warning, missed or storage alert reaches the NOC from your RMM, backup console or alert mailbox.',
    who: 'Automated',
    permission: 'None needed',
    output: 'Alert received',
  },
  {
    id: 2,
    name: 'Intake and ticket',
    detail: 'Match client, device and job. De-duplicate. Apply the client’s priority. Open or update the PSA ticket.',
    who: 'NOC247 Tier 1',
    permission: 'Tier 1: validate and diagnose',
    output: 'PSA ticket under your technician identity',
    note: 'Known false positive or self-cleared: close as noise and note it in the ticket.',
  },
  {
    id: 3,
    name: 'Triage: five branches',
    detail: 'Sort the failure into job, storage, agent, network or ransomware signal.',
    who: 'NOC247 Tier 1',
    permission: 'Tier 1: validate and diagnose',
    output: 'Ticket updated with the branch and the checks run',
    branches: [
      { name: 'Job', note: 'Read the job log' },
      { name: 'Storage', note: 'Check space and quota' },
      { name: 'Agent', note: 'Check the device and agent' },
      { name: 'Network', note: 'Check the link and the site' },
      { name: 'Ransomware signal', note: 'Stop. No retries. P1 to step 7.', stop: true },
    ],
  },
  {
    id: 4,
    name: 'Controlled retry',
    detail: 'If the cause is transient and the runbook allows it, retry a limited number of times. Never loop.',
    who: 'NOC247 Tier 2',
    permission: 'Tier 2: known-good remediation',
    output: 'Retry result recorded',
  },
  {
    id: 5,
    name: 'Remediation within permissions',
    detail: 'Apply only the actions written into your runbook for this cause. Anything else goes to step 7.',
    who: 'NOC247 Tier 2',
    permission: 'Tier 2: known-good remediation',
    output: 'Action and approval reference in the ticket',
  },
  {
    id: 6,
    name: 'Verify and document',
    detail: 'Keep the ticket open until a later job succeeds. Record checks, actions, retry result and next scheduled job.',
    who: 'NOC247 Tier 2',
    permission: 'Tier 1 and 2',
    output: 'Complete ticket with a named owner and next action',
  },
  {
    id: 7,
    name: 'Escalate to your on-call',
    detail:
      'Phone your engineer with a context packet if the fix is outside the runbook, a retry failed, or a ransomware signal appeared. Lower-priority failures are held for the morning.',
    who: 'NOC247 Tier 3 handover to your engineer',
    permission: 'Tier 3: your on-call decides and approves',
    output: 'Call logged in the ticket',
  },
  {
    id: 8,
    name: 'Morning handover report',
    detail: 'Everything the night did, ranked by what needs a person. Built from your PSA timestamps.',
    who: 'NOC247 shift lead',
    permission: 'None needed',
    output: 'Report to your day desk',
  },
];

const TEXT_VERSION = [
  'The alert arrives. A failed, warning, missed or storage alert reaches the NOC from your RMM, backup console or alert mailbox.',
  'Intake and ticket. The alert is matched to a client, device and job, de-duplicated and given the priority from that client’s priority table. A PSA ticket is opened or updated.',
  'Triage. The analyst sorts the failure into one of five branches: job, storage, agent, network or ransomware signal.',
  'Controlled retry. If the cause is transient and the runbook allows it, the job is retried a limited number of times, never in a loop.',
  'Remediation within permissions. Tier 2 applies only the actions written into your runbook for that cause.',
  'Verify and document. The ticket stays open until a later job succeeds, and every check and action is recorded in it.',
  'Escalate to your on-call. If the fix is outside the runbook, the retry failed or a ransomware signal appears, your engineer gets a phone call with a full context packet.',
  'Morning handover report. Everything the night did, ranked by what needs a person.',
];

export default function BackupFlow() {
  return (
    <figure className="backup-flow my-10">
      <figcaption className="font-display text-2xl text-brand-700">
        Overnight backup failure: from alert to morning report
      </figcaption>
      <ol className="backup-flow__list">
        {STEPS.map((step) => (
          <li key={step.id} className="backup-flow__step">
            <article>
              <p className="backup-flow__index" aria-hidden="true">
                {step.id}
              </p>
              <h3 id={`backup-step-${step.id}`}>
                Step {step.id}. {step.name}
              </h3>
              <p>{step.detail}</p>
              <dl>
                <div>
                  <dt>Who</dt>
                  <dd>{step.who}</dd>
                </div>
                <div>
                  <dt>Permission</dt>
                  <dd>{step.permission}</dd>
                </div>
                <div>
                  <dt>Output</dt>
                  <dd>{step.output}</dd>
                </div>
              </dl>
              {step.note ? <p className="backup-flow__note">{step.note}</p> : null}
              {step.branches ? (
                <ul className="backup-flow__branches" aria-label="Triage branches">
                  {step.branches.map((branch) => (
                    <li key={branch.name} className={branch.stop ? 'is-stop' : undefined}>
                      <strong>{branch.name}</strong>
                      <span>{branch.note}</span>
                      {branch.stop ? <span className="backup-flow__stop">stop · P1 · to step 7</span> : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
      <details className="backup-flow__text">
        <summary>Text version of the diagram</summary>
        <ol>
          {TEXT_VERSION.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </details>
    </figure>
  );
}
