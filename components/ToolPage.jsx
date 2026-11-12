import Link from 'next/link';
import MarketingShell from './MarketingShell';
import PageMeta, { faqJsonLd, webPageJsonLd } from './PageMeta';
import FaqList from './FaqList';
import CalendlyBlock from './CalendlyBlock';

const ONBOARDING_TODO =
  '[TODO: onboarding window — confirm 2–6 days or 7–10 business days before publishing a number.] The sequence already described on the site is tool access, runbook mapping, monitor ingestion, shadow shifts, then go-live.';

export default function ToolPage({
  path,
  title,
  h1,
  description,
  lede,
  account,
  handoff,
  monitors,
  extra,
  faqs,
}) {
  const graph = webPageJsonLd({ path, title, description });
  const faq = faqJsonLd(faqs);

  return (
    <MarketingShell activePath={path}>
      <PageMeta title={title} description={description} path={path} jsonLd={[graph, faq]} />
      <section className="bg-white pt-14 pb-10 md:pt-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">RMM coverage</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-brand-700 md:text-5xl">{h1}</h1>
            <p className="mt-6 text-lg leading-8 text-brand-600">{lede}</p>
          </div>
        </div>
      </section>
      <section className="bg-white pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto grid max-w-3xl gap-8">
            <article>
              <h2 className="font-display text-2xl text-brand-700">How the technician account works</h2>
              <p className="mt-3 leading-7 text-brand-600">{account}</p>
            </article>
            <article>
              <h2 className="font-display text-2xl text-brand-700">Ticket handoff into the PSA</h2>
              <p className="mt-3 leading-7 text-brand-600">{handoff}</p>
            </article>
            <article>
              <h2 className="font-display text-2xl text-brand-700">Backup and patch monitors</h2>
              <p className="mt-3 leading-7 text-brand-600">{monitors}</p>
            </article>
            {extra ? (
              <article>
                <h2 className="font-display text-2xl text-brand-700">{extra.heading}</h2>
                <p className="mt-3 leading-7 text-brand-600">{extra.body}</p>
              </article>
            ) : null}
            <article>
              <h2 className="font-display text-2xl text-brand-700">Onboarding</h2>
              <p className="mt-3 leading-7 text-brand-600">{ONBOARDING_TODO}</p>
            </article>
            <p className="text-sm leading-7 text-brand-600">
              Back to the <Link href="/rmm-integrations" className="link-underline">RMM integrations hub</Link>, the{' '}
              <Link href="/managed-noc-services-for-msps" className="link-underline">managed NOC services for MSPs</Link>, and the{' '}
              <Link href="/free-alert-audit" className="link-underline">free after-hours alert audit</Link>.
              No partner badge is shown here unless it is a real certification on file.
            </p>
          </div>
        </div>
      </section>
      <FaqList items={faqs} />
      <CalendlyBlock />
    </MarketingShell>
  );
}
