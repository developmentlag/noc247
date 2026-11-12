import MarketingShell from '../components/MarketingShell';
import PageMeta, { webPageJsonLd } from '../components/PageMeta';
import CalendlyBlock from '../components/CalendlyBlock';

const title = 'MSP NOC case studies | NOC247';
const description =
  'How MSPs use a white-label NOC. Named stories are not published yet — placeholders only, until a client agrees to be quoted.';
const path = '/case-studies';

const stories = [
  {
    title: '[placeholder] Overnight queue for a US MSP',
    body: '[placeholder] RMM, endpoint count, and what changed. No result is filled in.',
  },
  {
    title: '[placeholder] UK after-hours cover',
    body: '[placeholder] Tools and hours. No client name and no metric.',
  },
  {
    title: '[placeholder] Backup and patch window',
    body: '[placeholder] What the MSP kept in-house versus what the NOC ran. Examples coming.',
  },
];

export default function CaseStudiesPage() {
  return (
    <MarketingShell activePath={path}>
      <PageMeta title={title} description={description} path={path} jsonLd={webPageJsonLd({ path, title, description })} />
      <section className="bg-white pt-14 pb-8 md:pt-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">Examples coming</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-brand-700 md:text-5xl">
              How MSPs use a white-label NOC
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-600">
              Consented stories are not on the site yet. The blocks below are marked [placeholder]. Nothing here is a client result.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto grid max-w-3xl gap-6">
            {stories.map((story) => (
              <article key={story.title} className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card">
                <h2 className="font-display text-2xl text-brand-700">{story.title}</h2>
                <p className="mt-3 leading-7 text-brand-600">{story.body}</p>
                <p className="mt-4 text-sm text-brand-500">[placeholder] Book a scoping call — this story is not a testimonial.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CalendlyBlock heading="Book a scoping call" />
    </MarketingShell>
  );
}
