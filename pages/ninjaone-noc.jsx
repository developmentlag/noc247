import ToolPage from '../components/ToolPage';

const faqs = [
  {
    question: 'Do you need a separate NinjaOne tenant?',
    answer:
      'No. The work runs in the MSP’s existing tenant. NOC247 does not ask you to move devices to a NOC247-owned NinjaOne account.',
  },
  {
    question: 'Are you a NinjaOne certified partner?',
    answer: 'This page does not claim a certification or partner badge. If one exists, it will be added only when it can be shown.',
  },
  {
    question: 'Where do tickets go?',
    answer:
      'Into the PSA you already use, under your ticket display name. The handoff includes what was checked in NinjaOne, not a raw alert dump.',
  },
];

export default function NinjaOneNocPage() {
  return (
    <ToolPage
      path="/ninjaone-noc"
      title="NinjaOne NOC Services for MSPs | White-Label 24/7 | NOC247"
      h1="24/7 white-label NOC inside your NinjaOne instance"
      description="We work as a named technician in your NinjaOne tenant — tickets, alert triage and backup checks under your brand. Book a scoping call."
      lede="This page is only the NinjaOne operating model. The full managed scope, including what stays with the MSP, is on the managed NOC page. The hub for every tool is RMM integrations."
      account="A technician account is created inside your NinjaOne tenant, named the way your clients already see your team. Policies, organizations, and device groups stay yours. The NOC reads the monitors you already run and follows the runbook you approve. Nothing on this page says devices must be re-enrolled."
      handoff="When a NinjaOne alert needs a ticket, it is written into your PSA with the device, the condition, and the step already tried. Your engineers see your ticket numbers. Escalation is to your team, not to a NOC247 queue your clients can see."
      monitors="Backup job success and the warnings around it, plus patch state against the windows you approve, are part of the same triage the managed service already describes. NinjaOne is where those checks are read. Failed jobs are worked from the runbook rather than left as a morning list."
      extra={{
        heading: 'What this page is not',
        body: 'It is not a NinjaOne migration project and not a claim that every NinjaOne automation is rewritten. If the stack is mixed, say so on the scoping call. Onboarding length is still [TODO: 2–6 days or 7–10 business days].',
      }}
      faqs={faqs}
    />
  );
}
