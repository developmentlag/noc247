import ToolPage from '../components/ToolPage';

const faqs = [
  {
    question: 'Is Auvik the whole NOC?',
    answer:
      'No. Auvik is the network view. Server, endpoint, and backup work still happens in the RMM and PSA named on the managed NOC page. This URL is for the network slice.',
  },
  {
    question: 'Do you resell Auvik?',
    answer: 'This page does not say you must buy Auvik from NOC247. It assumes you already have an Auvik account.',
  },
  {
    question: 'Partner badge?',
    answer: 'No partner badge is shown on this page.',
  },
];

export default function AuvikNocPage() {
  return (
    <ToolPage
      path="/auvik-noc"
      title="Auvik NOC Monitoring for MSPs | White-Label 24/7 | NOC247"
      h1="After-hours network NOC inside Auvik"
      description="After-hours network monitoring and triage inside your Auvik account, white-labelled to your MSP. Book a 30-minute scoping call."
      lede="Auvik is the network tool on this page: firewalls, switches, links, and the maps you already use. It is not a copy of the NinjaOne or N-able pages with the name swapped."
      account="The technician logs into your Auvik account, not a NOC247 tenant. Inventory, credentials, and the client list stay yours. Alerts are read against your runbook for tunnel drops, device down, and link errors."
      handoff="A network fault that needs a ticket is written to your PSA with the Auvik entity and the check that failed. Your engineers get context. Clients still see your brand, which is the white-label rule, not an Auvik-specific logo change."
      monitors="Auvik is not where OS patching or backup jobs usually live. Those stay in the RMM. What this page covers is after-hours network triage: up/down, tunnel state, and the devices Auvik already draws. Backup and patch checks continue in the RMM named on the hub."
      extra={{
        heading: 'Use this with the RMM, not instead of it',
        body: 'Most MSPs pair Auvik with NinjaOne, N-able, ConnectWise, Datto, or Kaseya. Say which pair you run on the 30-minute scoping call. Onboarding is 7–10 business days.',
      }}
      faqs={faqs}
    />
  );
}
