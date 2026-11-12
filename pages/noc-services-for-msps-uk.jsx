import Link from 'next/link';
import MarketingShell from '../components/MarketingShell';
import PageMeta, { faqJsonLd, webPageJsonLd } from '../components/PageMeta';
import FaqList from '../components/FaqList';
import CalendlyBlock from '../components/CalendlyBlock';

const title = 'NOC Services for UK MSPs | 24/7 White-Label | NOC247';
const description =
  'White-label 24/7 NOC for UK MSPs, inside your RMM. Holiday cover and GBP quoting are confirmed on a scoping call, not assumed on this page.';
const path = '/noc-services-for-msps-uk';

const faqs = [
  {
    question: 'Is there a UK company on this page?',
    answer:
      '[TODO: UK entity.] The footer still says London registration is in progress. This page does not claim a UK company, a UK address, or a UK VAT number.',
  },
  {
    question: 'Are UK bank holidays and GMT/BST in the base price?',
    answer:
      '[TODO: Mihir to confirm GMT/BST coverage and whether UK bank holidays are included in base pricing.] Until that is confirmed, do not treat a sentence on another page as a UK contract term.',
  },
  {
    question: 'How is pricing quoted?',
    answer:
      'Per endpoint, after a look at the stack. [TODO: quoting in GBP, and the one-UK-business-day promise, if that is the offer.] No rate card is published here.',
  },
  {
    question: 'Where is the full managed service described?',
    answer:
      'On the managed NOC services for MSPs page. This URL is the UK landing page so that query is not answered by the generic managed title.',
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
              White-label 24/7 NOC for MSPs who support UK clients. Technicians work inside your RMM and PSA, under your brand. This page does not claim a registered UK entity.
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
              <Link href="/white-label-noc-services">white-label NOC</Link>.
            </p>
            <h2>Hours, GMT/BST, and UK bank holidays</h2>
            <p>
              [TODO: confirm that GMT/BST coverage and UK bank holidays are included in base pricing.] Hours and urgency for nights, weekends, and holidays are described on{' '}
              <Link href="/247-noc-support">24/7 NOC support</Link>. Do not read this page as a new holiday promise.
            </p>
            <h2>Tools</h2>
            <p>
              The same RMM list as the rest of the site: NinjaOne, N-able, Auvik, ConnectWise, Datto, Kaseya, and Atera. Start at the{' '}
              <Link href="/rmm-integrations">RMM integrations hub</Link> or the tool pages linked from there.
            </p>
            <h2>Onboarding</h2>
            <p>
              [TODO: onboarding window — confirm 2–6 days or 7–10 business days.] The sequence used elsewhere on the site is access, runbooks, monitor ingestion, shadow shifts, then go-live.
            </p>
            <h2>Pricing</h2>
            <p>
              Quotes are per endpoint. No rate card is invented here. [TODO: GBP quote path and “one UK business day”, if that is the offer to publish.] See{' '}
              <Link href="/pricing">NOC pricing for MSPs</Link>.
            </p>
            <h2>The managed service</h2>
            <p>
              Scope, L1/L2, and what stays with the MSP are on{' '}
              <Link href="/managed-noc-services-for-msps">managed NOC services for MSPs</Link>.
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
