import ToolPage from '../components/ToolPage';

const faqs = [
  {
    question: 'Automate and Manage, or only one of them?',
    answer:
      'The site already describes ConnectWise Automate for monitors and Manage (or another PSA) for tickets. The call confirms which products you actually have open.',
  },
  {
    question: 'Will you replace our ConnectWise stack?',
    answer: 'No. The published offer is to work inside it. This page does not sell a rip-and-replace.',
  },
  {
    question: 'Is a ConnectWise partner logo shown?',
    answer: 'No partner badge is shown on this page.',
  },
];

export default function ConnectWiseNocPage() {
  return (
    <ToolPage
      path="/connectwise-noc"
      title="ConnectWise NOC Services for MSPs | White-Label 24/7 | NOC247"
      h1="White-label NOC inside ConnectWise Automate"
      description="24/7 triage inside ConnectWise Automate, with tickets written to your PSA under your brand. Book a 30-minute scoping call."
      lede="ConnectWise buyers were sharing the generic RMM page with every other tool. This URL is the Automate and PSA handoff, not a second copy of the managed-service story."
      account="Technicians work as users in your Automate instance, on the monitors and scripts you allow. They do not move clients into a NOC247 Automate database. The display name on tickets stays yours."
      handoff="Manage, or the PSA you pair with Automate, receives the ticket with the monitor result and the runbook step. If you use a different PSA, the scoping call says so. The point is your ticket number, not a side spreadsheet."
      monitors="Automate is where a lot of MSPs already watch disk, services, backup jobs, and patch state. Those are the same checks the managed NOC describes. Overnight work is closing the known-good ones and escalating the rest with the Automate output attached."
      extra={{
        heading: 'Scripts stay yours',
        body: 'Existing Automate scripts run when your runbook says to run them. Onboarding is 7–10 business days.',
      }}
      faqs={faqs}
    />
  );
}
