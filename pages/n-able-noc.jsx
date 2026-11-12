import ToolPage from '../components/ToolPage';

const faqs = [
  {
    question: 'N-central and N-sight — both?',
    answer:
      'Yes. The site already lists N-able, including N-central and N-sight, as stacks the NOC works inside. The scoping call confirms which product and which sites.',
  },
  {
    question: 'Do clients see a NOC247 login?',
    answer: 'No. The account sits in your N-able instance under your brand, the same white-label rule as the rest of the service.',
  },
  {
    question: 'Is there an N-able partner badge here?',
    answer: 'No partner badge is shown on this page.',
  },
];

export default function NAbleNocPage() {
  return (
    <ToolPage
      path="/n-able-noc"
      title="N-able & N-central NOC Services for MSPs | NOC247"
      h1="NOC coverage inside N-able N-central and N-sight"
      description="White-label 24/7 NOC inside N-able N-central and N-sight, with ticket handoff to your PSA. Book a 30-minute scoping call."
      lede="N-able coverage is its own page so the RMM hub is not the only URL for N-central and N-sight buyers. Monitoring scope for the wider service still lives on the managed NOC page."
      account="Technicians use an account in your N-central or N-sight instance. Sites, probes, and the service templates you already trust stay in place. The NOC does not stand up a parallel N-able server."
      handoff="Alerts that need a human become tickets in your PSA. The note says which N-able check fired and what the runbook step did. Your team keeps the client relationship and any approval the runbook does not already allow."
      monitors="Patch status and backup job results that N-able already surfaces are triaged overnight, including the jobs that complete with exceptions. Network checks that you monitor in N-able stay on the same queue rather than a second inbox."
      extra={{
        heading: 'N-central and N-sight are not the same screen',
        body: 'N-central is the usual multi-site RMM. N-sight is the other N-able console some MSPs still run. The 30-minute scoping call names which one, or both. Onboarding is 7–10 business days.',
      }}
      faqs={faqs}
    />
  );
}
