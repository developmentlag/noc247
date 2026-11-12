import Link from 'next/link';
import MarketingShell from '../components/MarketingShell';
import PageMeta, { faqJsonLd, webPageJsonLd } from '../components/PageMeta';
import FaqList from '../components/FaqList';
import CalendlyBlock from '../components/CalendlyBlock';
import CostEstimator from '../components/CostEstimator';

const title = 'In-house NOC cost vs a white-label team | NOC247';
const description =
  'Compare a published three-shift in-house NOC cost with a white-label team. Figures are estimates from this site, not a rate card. Book a 30-minute scoping call.';
const path = '/calculator';

const faqs = [
  {
    question: 'Is this a NOC247 price?',
    answer:
      'No. The calculator explains the in-house comparison using ranges already published on the site. A white-label price is a per-endpoint quote, requested from the pricing page or the contact form.',
  },
  {
    question: 'Where do the dollar figures come from?',
    answer:
      'The homepage FAQ publishes a three-shift in-house NOC at $220k–$320k+ a year before tools. The outsourced NOC page publishes a single L1 analyst at about $90,000–$135,000 a year. Nothing on this page adds a new rate.',
  },
  {
    question: 'Why ask for an endpoint count?',
    answer:
      'So the estimate is tied to the estate you actually run. The count is not multiplied by a secret per-endpoint price. That price is quoted, not calculated here.',
  },
  {
    question: 'What if we already have overnight staff?',
    answer:
      'The model says so, and it does not pretend you should replace a desk you already pay for. Use it to frame gaps, then book a scoping call.',
  },
];

export default function CalculatorPage() {
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">Cost model</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-brand-700 md:text-5xl">
              In-house NOC cost vs a white-label team
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-600">
              This page is the cost model. <Link href="/pricing" className="link-underline">NOC pricing for MSPs</Link> is the package and quote page. There is not a third pricing URL.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto grid max-w-3xl gap-8 lg:max-w-5xl lg:grid-cols-2">
            <div className="prose-body">
              <h2>What an in-house desk actually is</h2>
              <p>
                A 24/7 NOC is three shifts, not one night analyst. The figure already published on the homepage FAQ for that desk in the US is $220k–$320k+ a year in salary, benefits, training, turnover, and management — before tools. A single L1 seat is published on the outsourced NOC page at $90,000–$135,000.
              </p>
              <h2>What this model will not do</h2>
              <p>
                It will not say a typical MSP saves a percentage. It will not invent a per-endpoint NOC247 rate. Onboarding is 7–10 business days and is separate from this cost model.
              </p>
              <h2>What stays with the MSP</h2>
              <p>
                Client relationships, approvals, and anything outside the runbook stay with you whether the night shift is in-house or white-label. The longer comparison is on{' '}
                <Link href="/noc-vs-in-house">in-house NOC or a white-label team</Link>.
              </p>
            </div>
            <CostEstimator />
          </div>
        </div>
      </section>
      <FaqList items={faqs} heading="Calculator questions" />
      <CalendlyBlock heading="Book a 30-minute scoping call after the estimate" />
    </MarketingShell>
  );
}
