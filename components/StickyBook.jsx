import { CALENDLY_URL } from '../lib/analytics';

export default function StickyBook({ label = 'Book a 30-minute scoping call' }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noreferrer noopener"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-hover transition hover:bg-accent-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 md:hidden"
      aria-label={label}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
      {label}
    </a>
  );
}
