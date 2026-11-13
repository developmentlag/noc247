import { CALENDLY_URL } from '../lib/analytics';

export default function CalendlyBlock({
  heading = 'Book a 30-minute scoping call',
  body = 'Pick a 30-minute slot on the live calendar.',
  buttonLabel = 'Book a 30-minute scoping call',
}) {
  return (
    <section aria-label="Book a 30-minute scoping call" className="bg-brand-50/40 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-700">{heading}</h2>
          <p className="mt-4 text-brand-600">{body}</p>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer noopener" className="btn-accent mt-6 inline-flex">
            {buttonLabel}
          </a>
          <div className="mt-8 overflow-hidden rounded-2xl border border-brand-100 bg-white">
            <iframe
              title="Book a 30-minute scoping call"
              src={CALENDLY_URL}
              className="h-[720px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
