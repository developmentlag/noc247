import React, { useState } from 'react';
import Link from 'next/link';

export default function Header({ activePath = '/blog' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-6 md:pt-5">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 rounded-full border border-neutral-200/70 bg-white/90 pl-6 pr-3 shadow-[0_6px_28px_-8px_rgba(11,37,69,0.18)] backdrop-blur-md md:h-[4.5rem] md:pl-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="NOC247 home">
          <span className="font-sans text-xl font-bold tracking-[-0.04em] text-neutral-950 md:text-[1.6rem]">
            NOC247
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 xl:gap-8" aria-label="Primary">
          {/* NOC Services Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              onMouseEnter={() => setServicesOpen(true)}
              className="flex items-center gap-1.5 text-[0.95rem] text-neutral-600 transition hover:text-neutral-950"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              NOC Services
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
                className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {servicesOpen && (
              <div
                onMouseLeave={() => setServicesOpen(false)}
                className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-neutral-200 bg-white p-3 shadow-xl"
              >
                <Link
                  href="/white-label-noc-services"
                  className="block rounded-xl px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-accent-600"
                >
                  <p className="font-semibold text-neutral-950">White-Label NOC</p>
                  <p className="text-xs text-neutral-500">Delivered under your brand</p>
                </Link>
                <Link
                  href="/managed-noc-services-for-msps"
                  className="block rounded-xl px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-accent-600"
                >
                  <p className="font-semibold text-neutral-950">Managed NOC Services</p>
                  <p className="text-xs text-neutral-500">24×7 monitoring & response</p>
                </Link>
                <Link
                  href="/247-noc-support"
                  className="block rounded-xl px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-accent-600"
                >
                  <p className="font-semibold text-neutral-950">24×7 NOC Support</p>
                  <p className="text-xs text-neutral-500">Follow-the-sun coverage</p>
                </Link>
                <Link
                  href="/outsourced-noc"
                  className="block rounded-xl px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-accent-600"
                >
                  <p className="font-semibold text-neutral-950">Outsourced NOC</p>
                  <p className="text-xs text-neutral-500">Scale without hiring</p>
                </Link>
                <Link
                  href="/rmm-integrations"
                  className="block rounded-xl px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-accent-600"
                >
                  <p className="font-semibold text-neutral-950">RMM Integrations</p>
                  <p className="text-xs text-neutral-500">ConnectWise, NinjaOne, Datto</p>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/calculator"
            className="text-[0.95rem] transition text-neutral-600 hover:text-neutral-950"
          >
            Calculator
          </Link>
          <Link
            href="/msp-lead-generation"
            className="text-[0.95rem] transition text-neutral-600 hover:text-neutral-950"
          >
            MSP Lead Gen
          </Link>
          <Link
            href="/pricing"
            className="text-[0.95rem] transition text-neutral-600 hover:text-neutral-950"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className={`text-[0.95rem] transition ${
              activePath === '/blog' || activePath.startsWith('/blog/')
                ? 'font-medium text-neutral-950'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Insights
          </Link>
          <Link
            href="/about"
            className="text-[0.95rem] transition text-neutral-600 hover:text-neutral-950"
          >
            About
          </Link>
        </nav>

        {/* Contact Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-neutral-950 px-7 py-3.5 text-[0.95rem] font-medium text-white transition hover:bg-neutral-800"
          >
            Contact us
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-950 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                  <path d="M4 6h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-[1400px] rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl lg:hidden">
          <nav className="flex flex-col space-y-3" aria-label="Mobile">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">NOC Services</p>
            <Link
              href="/white-label-noc-services"
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              White-Label NOC Services
            </Link>
            <Link
              href="/managed-noc-services-for-msps"
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Managed NOC Services
            </Link>
            <Link
              href="/247-noc-support"
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              24×7 NOC Support
            </Link>
            <Link
              href="/outsourced-noc"
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Outsourced NOC Services
            </Link>
            <Link
              href="/rmm-integrations"
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              RMM Integrations
            </Link>
            <div className="my-2 border-t border-neutral-100" />
            <Link
              href="/calculator"
              className="rounded-lg px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-50"
            >
              Calculator
            </Link>
            <Link
              href="/msp-lead-generation"
              className="rounded-lg px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-50"
            >
              MSP Lead Gen
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-50"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="rounded-lg px-3 py-2 text-base font-medium text-accent-600 bg-brand-50/50"
            >
              Insights & Blog
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-50"
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
