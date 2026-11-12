import Link from 'next/link';
import MarketingShell from '../components/MarketingShell';
import PageMeta, { faqJsonLd, webPageJsonLd } from '../components/PageMeta';
import FaqList from '../components/FaqList';
import CalendlyBlock from '../components/CalendlyBlock';
import LeadForm from '../components/LeadForm';

const title = 'Free After-Hours Alert Audit for MSPs | NOC247';
const description =
  "Send one week of after-hours alerts. We'll show how many overnight pages needed a human — inside NinjaOne, N-able or Auvik. Book a scoping call.";
const path = '/free-alert-audit';

const faqs = [
  {
    question: 'What should I send?',
    answer:
      'One week of after-hours alerts, the RMM you use, and a rough endpoint mix. Do not include client names or other client PII. [TODO: Mihir — privacy and NDA wording for how exports are stored and who sees them.]',
  },
  {
    question: 'What comes back?',
    answer:
      'Counts and a few examples of alerts that needed a person versus alerts that did not. [placeholder] sample percentages are not published until a real, approved audit is available to quote.',
  },
  {
    question: 'Which tools?',
    answer:
      'NinjaOne, N-able N-central, N-sight, and Auvik, plus ConnectWise, Datto, Kaseya, and Atera when that is the stack the export comes from.',
  },
  {
    question: 'How long does it take?',
    answer:
      '[TODO: audit turnaround — not confirmed.] Book the audit call if you want a time on the calendar while that window is still open.',
  },
];

export default function FreeAlertAuditPage() {
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">Alert audit</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-brand-700 md:text-5xl">
              See how many overnight pages actually needed a human
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-600">
              Send one week of after-hours alerts from your RMM. The audit separates pages that needed a person from noise. It is not a penetration test, not a full NOC engagement, and not a published case study.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto grid max-w-3xl gap-8 text-brand-600">
            <article>
              <h2 className="font-display text-2xl text-brand-700">What the audit is and is not</h2>
              <p className="mt-3 leading-7">
                It is a read of one week of after-hours alerts. It is not a promise of a specific reduction, and it does not name your clients. [placeholder] outcome metrics stay blank until Mihir approves a real sample.
              </p>
            </article>
            <article>
              <h2 className="font-display text-2xl text-brand-700">What to send</h2>
              <p className="mt-3 leading-7">
                One week of alerts, the RMM type, and no client PII. Say how you will share the export (a redacted file, a screen share, or access that expires). [TODO: Mihir — privacy / NDA wording.]
              </p>
            </article>
            <article>
              <h2 className="font-display text-2xl text-brand-700">What comes back</h2>
              <p className="mt-3 leading-7">
                Counts, and examples of alerts that needed a human. [placeholder] — no “40% reduction” line, and no client name, until a consented example exists.
              </p>
            </article>
            <article>
              <h2 className="font-display text-2xl text-brand-700">Tools</h2>
              <p className="mt-3 leading-7">
                NinjaOne, N-able (N-central and N-sight), and Auvik, plus ConnectWise, Datto, Kaseya, and Atera. Related pages:{' '}
                <Link href="/rmm-integrations" className="link-underline">RMM integrations</Link>,{' '}
                <Link href="/ninjaone-noc" className="link-underline">NinjaOne</Link>,{' '}
                <Link href="/n-able-noc" className="link-underline">N-able</Link>,{' '}
                <Link href="/auvik-noc" className="link-underline">Auvik</Link>,{' '}
                <Link href="/blog/reduce-rmm-alert-noise" className="link-underline">cutting RMM alert noise</Link>.
              </p>
            </article>
            <article>
              <h2 className="font-display text-2xl text-brand-700">Timeline</h2>
              <p className="mt-3 leading-7">
                [TODO: audit timeline.] The scoping call itself is still the existing calendar link. [TODO: call length — 15 or 30 minutes.]
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-brand-50/40 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-brand-700">Request the audit</h2>
            <p className="mt-3 text-sm leading-7 text-brand-600">
              [TODO: replace this form with the approved Tally embed once the form ID exists.] Until then this form posts to the same inquiry inbox as the contact page and records a lead only after a successful send.
            </p>
            <div className="mt-6">
              <LeadForm
                formName="tally_alert_audit"
                intent="alert_audit"
                submitLabel="Send the audit request"
                howSharedLabel="How the alert export will be shared"
                successText="Audit request sent. If you also want time on the calendar, use the booking section below."
              />
            </div>
          </div>
        </div>
      </section>

      <FaqList items={faqs} />
      <CalendlyBlock heading="Book the audit call" buttonLabel="Book the audit call" />
    </MarketingShell>
  );
}
