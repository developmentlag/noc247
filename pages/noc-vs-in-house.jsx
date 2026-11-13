import Link from 'next/link';
import MarketingShell from '../components/MarketingShell';
import PageMeta, { faqJsonLd, webPageJsonLd } from '../components/PageMeta';
import FaqList from '../components/FaqList';
import CalendlyBlock from '../components/CalendlyBlock';

const title = 'NOC247 vs an in-house NOC | Cost and coverage | NOC247';
const description =
  'Compare a three-shift in-house NOC with white-label 24/7 coverage inside your RMM. Use the cost calculator, then book a 30-minute scoping call.';
const path = '/noc-vs-in-house';

const faqs = [
  {
    question: 'Does this page promise a savings percentage?',
    answer: 'No. It repeats ranges already published on the site and points at the calculator. A quote is per endpoint, from the pricing page.',
  },
  {
    question: 'What stays with the MSP either way?',
    answer:
      'Client relationships, commercial approvals, and work that is outside the agreed runbook. White-label coverage does not take the client contract away from you.',
  },
];

export default function NocVsInHousePage() {
  return (
    <MarketingShell activePath={path}>
      <PageMeta
        title={title}
        description={description}
        path={path}
        jsonLd={[webPageJsonLd({ path, title, description }), faqJsonLd(faqs)]}
      />
      <section className="bg-white pt-14 pb-8 md:pt-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">Build versus buy</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-brand-700 md:text-5xl">
              In-house NOC or a white-label team?
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-600">
              This page is the comparison. The outsourced NOC page introduces the offer; the numbers and the rota live here and on the calculator.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="prose-body mx-auto max-w-3xl">
            <h2>Staffed hours and the rota</h2>
            <p>
              Covering every hour means overlapping shifts, not one person with a phone. The outsourced NOC page already says a 24/7 rota needs several heads, including cover for leave, and that a single L1 analyst is in the $90,000–$135,000 range. The homepage FAQ puts a three-shift desk at $220k–$320k+ a year before tools.
            </p>
            <h2>What the cost posts already say</h2>
            <p>
              Read <Link href="/blog/cost-to-build-24x7-noc" className="link-underline">what a 24/7 NOC really costs to run in-house</Link> and{' '}
              <Link href="/blog/how-to-set-up-a-noc" className="link-underline">how to set up a NOC in-house</Link> beside this page. Use the{' '}
              <Link href="/calculator" className="link-underline">cost calculator</Link> to frame your own endpoint count. The figures are the ranges already published on this site.
            </p>
            <h2>What stays with the MSP</h2>
            <p>
              Runbooks you approve, client communication, and the decision to escalate. The operating model for the team that takes the queue is{' '}
              <Link href="/managed-noc-services-for-msps" className="link-underline">managed NOC services for MSPs</Link>.
              Branding is <Link href="/white-label-noc-services" className="link-underline">white-label NOC</Link>.
            </p>
            <h2>Onboarding</h2>
            <p>Onboarding is 7–10 business days. Shadow shifts are part of the sequence already described on the managed page.</p>
          </div>
        </div>
      </section>
      <FaqList items={faqs} />
      <CalendlyBlock />
    </MarketingShell>
  );
}
