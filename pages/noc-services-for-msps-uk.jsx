import Link from 'next/link';
import MarketingShell from '../components/MarketingShell';
import PageMeta, { faqJsonLd, webPageJsonLd } from '../components/PageMeta';
import FaqList from '../components/FaqList';
import CalendlyBlock from '../components/CalendlyBlock';

const title = 'NOC Services for UK MSPs | 24/7 White-Label | NOC247';
const description =
  'White-label 24/7/365 NOC for UK MSPs, inside your RMM. Book a 30-minute scoping call.';
const path = '/noc-services-for-msps-uk';

const faqs = [
  {
    question: 'What hours do you cover?',
    answer:
      'Coverage is 24/7/365. Nights, weekends, and holidays are described on the 24/7 NOC support page.',
  },
  {
    question: 'How is pricing quoted?',
    answer:
      'Per endpoint, after a look at the stack. We do not publish a rate card. You get a quote within one US or UK business day, the same promise as the pricing page.',
  },
  {
    question: 'How long is onboarding?',
    answer:
      'Most MSPs are live in 7–10 business days: access, runbooks, monitor ingestion, shadow shifts, then go-live.',
  },
  {
    question: 'Where is the full managed service described?',
    answer:
      'On the managed NOC services for MSPs page. This URL is the UK landing page.',
  },
];

export default function UkNocPage() {
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">United Kingdom</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-brand-700 md:text-5xl">
              NOC services for MSPs in the UK
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-600">
              White-label 24/7/365 NOC for MSPs who support UK clients. Technicians work inside your RMM and PSA, under your brand.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="prose-body mx-auto max-w-3xl">
            <h2>Who it is for</h2>
            <p>
              MSPs with UK end customers, or a UK overnight window, who want monitoring and triage without standing up a local night shift. It is not a staffing advert and not a website-design offer.
            </p>
            <h2>How white-label works under a UK brand</h2>
            <p>
              Tickets, the phone greeting, and the technician identity in the RMM stay under the MSP&apos;s name. Clients are not introduced to NOC247. The longer branding explanation is on{' '}
              <Link href="/white-label-noc-services" className="link-underline">white-label NOC</Link>.
            </p>
            <h2>Coverage</h2>
            <p>
              Coverage is 24/7/365. Hours and urgency for nights, weekends, and holidays are described on{' '}
              <Link href="/247-noc-support" className="link-underline">24/7 NOC support</Link>.
            </p>
            <h2>Tools</h2>
            <p>
              The same RMM list as the rest of the site: NinjaOne, N-able, Auvik, ConnectWise, Datto, Kaseya, and Atera. Start at the{' '}
              <Link href="/rmm-integrations" className="link-underline">RMM integrations hub</Link> or the tool pages linked from there.
            </p>
            <h2>Onboarding</h2>
            <p>
              Most MSPs are live in 7–10 business days. The sequence is access, runbooks, monitor ingestion, shadow shifts, then go-live.
            </p>
            <h2>Pricing</h2>
            <p>
              Quotes are per endpoint. We do not publish a rate card. You get a quote within one US or UK business day. See{' '}
              <Link href="/pricing" className="link-underline">NOC pricing for MSPs</Link>.
            </p>
            <h2>The managed service</h2>
            <p>
              Scope, L1/L2, and what stays with the MSP are on{' '}
              <Link href="/managed-noc-services-for-msps" className="link-underline">managed NOC services for MSPs</Link>.
              That URL should not be the one ranking for this UK query.
            </p>
          </div>
        </div>
      </section>
      <FaqList items={faqs} />
      <CalendlyBlock />
    </MarketingShell>
  );
}
