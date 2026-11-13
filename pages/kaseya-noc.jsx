import ToolPage from '../components/ToolPage';

const faqs = [
  {
    question: 'Is this a Kaseya 365 alternative page?',
    answer:
      'The NOC works inside the Kaseya VSA the RMM hub already lists. This page describes that work.',
  },
  {
    question: 'VSA only?',
    answer:
      'The published stack name is Kaseya VSA. Other Kaseya products are confirmed on the scoping call rather than assumed here.',
  },
  {
    question: 'Partner badge?',
    answer: 'No partner badge is shown on this page.',
  },
];

export default function KaseyaNocPage() {
  return (
    <ToolPage
      path="/kaseya-noc"
      title="Kaseya VSA NOC Services for MSPs | White-Label 24/7 | NOC247"
      h1="24/7 white-label NOC inside Kaseya VSA"
      description="Alert triage, tickets and backup checks inside your Kaseya VSA, under your MSP brand. Book a 30-minute scoping call."
      lede="Kaseya VSA is one of the RMMs already named on the integrations hub. This page describes how the NOC works inside that tenant."
      account="The technician is a user in your VSA, with the agent groups and procedures you already deploy. Devices stay where they are. The login your clients would notice is still your company’s, which is the same white-label rule as every other tool page."
      handoff="Procedures that the runbook allows can be started from VSA. Anything that needs a person outside that list is a PSA ticket with the VSA alarm and the step already taken. Your engineers own the client conversation."
      monitors="Backup success and patch windows that VSA already reports are part of overnight triage, including jobs that look finished but are not clean. The managed NOC page is where L1 versus L2 versus escalation is defined. This page only says those checks are read from VSA."
      extra={{
        heading: 'No invented alternative pitch',
        body: 'Work runs inside your existing Kaseya VSA: alert triage, tickets, and backup checks under your brand. Onboarding is 7–10 business days.',
      }}
      faqs={faqs}
    />
  );
}
