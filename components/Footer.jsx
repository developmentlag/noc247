import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-brand-100 bg-brand-50/40" role="contentinfo">
      {/* Trust Bar */}
      <div className="border-t border-brand-100 bg-white/70" aria-label="Trust bar">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 py-2 text-xs font-medium uppercase tracking-wider text-brand-500 sm:gap-8 sm:text-[11px] md:gap-10 md:text-xs">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-500"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>24×7 Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-500"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>White-Label</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-500"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>US &amp; UK MSPs</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-500"
              >
                <path d="M12 22v-5" />
                <path d="M9 8V2" />
                <path d="M15 8V2" />
                <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
              </svg>
              <span>Works in Your RMM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand Info */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 font-display text-lg text-white shadow-card">
                N
              </span>
              <span className="font-display text-2xl font-semibold text-brand-700">NOC247</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-brand-500">
              White-label, 24×7 managed NOC services built exclusively for MSPs in the US and UK. We staff the overnight shifts so your team can sleep — your brand, your tools, your clients.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-brand-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-500"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <a className="hover:text-accent-600" href="mailto:hello@noc247.io">
                hello@noc247.io
              </a>
            </div>
            <div className="mt-6">
              <Link href="/contact" className="btn-secondary !px-4 !py-2.5 inline-flex text-sm">
                Talk to our team
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-400">Quick Links</h2>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <li>
                <Link href="/" className="inline-flex items-center gap-1.5 py-1.5 text-brand-700 transition hover:text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>Home
                </Link>
              </li>
              <li>
                <Link href="/white-label-noc-services" className="inline-flex items-center gap-1.5 py-1.5 text-brand-700 transition hover:text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>White-Label NOC
                </Link>
              </li>
              <li>
                <Link href="/managed-noc-services-for-msps" className="inline-flex items-center gap-1.5 py-1.5 text-brand-700 transition hover:text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>Managed NOC Services
                </Link>
              </li>
              <li>
                <Link href="/247-noc-support" className="inline-flex items-center gap-1.5 py-1.5 text-brand-700 transition hover:text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>24×7 NOC Support
                </Link>
              </li>
              <li>
                <Link href="/outsourced-noc" className="inline-flex items-center gap-1.5 py-1.5 text-brand-700 transition hover:text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>Outsourced NOC Services
                </Link>
              </li>
              <li>
                <Link href="/rmm-integrations" className="inline-flex items-center gap-1.5 py-1.5 text-brand-700 transition hover:text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>RMM Integrations
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="inline-flex items-center gap-1.5 py-1.5 text-brand-700 transition hover:text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>Pricing &amp; Packages
                </Link>
              </li>
              <li>
                <Link href="/blog" className="inline-flex items-center gap-1.5 py-1.5 text-brand-700 transition hover:text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>Insights &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/msp-lead-generation" className="inline-flex items-center gap-1.5 py-1.5 text-brand-700 transition hover:text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>MSP Lead Generation
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-flex items-center gap-1.5 py-1.5 text-brand-700 transition hover:text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>About NOC247
                </Link>
              </li>
            </ul>
          </div>

          {/* Serving */}
          <div className="md:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-400">Serving</h2>
            <ul className="mt-4 space-y-2 text-sm text-brand-600">
              <li>Managed Service Providers</li>
              <li>United States</li>
              <li>United Kingdom</li>
              <li>Remote-first follow-the-sun</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Trust badges">
              <span className="rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-medium text-brand-500">24×7 Coverage</span>
              <span className="rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-medium text-brand-500">White-Label</span>
              <span className="rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-medium text-brand-500">US &amp; UK MSPs</span>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="mt-14 border-t border-brand-100 pt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-400">Our offices</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-10">
            <div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-500"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                <p className="font-semibold text-brand-700">Mumbai</p>
              </div>
              <address className="mt-2 not-italic text-sm leading-7 text-brand-600">
                <span className="block">2nd Floor, Awfis, Kalpataru Prime</span>
                <span className="block">Wagle Industrial Estate, Thane West</span>
                <span className="block">Maharashtra 400604</span>
              </address>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-500"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                <p className="font-semibold text-brand-700">London</p>
              </div>
              <p className="mt-2 text-sm leading-7 text-brand-600">
                UK
                <span className="mt-1 block text-xs uppercase tracking-wider text-brand-400">Registration in progress</span>
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-500"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                <p className="font-semibold text-brand-700">Fort Worth</p>
              </div>
              <p className="mt-2 text-sm leading-7 text-brand-600">
                Dallas, United States
                <span className="mt-1 block text-xs uppercase tracking-wider text-brand-400">Registration in progress</span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-brand-600">
            <span className="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-500"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              24×7×365 NOC · Office Mon–Sat 10:30–19:30 IST
            </span>
            <span className="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-500"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
              <a className="hover:text-accent-600" href="mailto:hello@noc247.io">hello@noc247.io</a>
            </span>
          </div>
        </div>

        {/* Copyright and Certifications */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-brand-100 pt-6 text-xs text-brand-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} NOC247. All rights reserved. — White-label NOC for MSPs.</p>
          <div className="flex gap-5">
            <a href="#top" className="hover:text-accent-600">Back to top</a>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="w-full rounded-2xl bg-brand-800 px-6 py-6 sm:px-10">
            <img
              src="/certifications.png"
              alt="ISO 27001 certified · Startup India recognised · GDPR compliant"
              width="1020"
              height="180"
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-[540px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
