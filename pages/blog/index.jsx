import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogCard from '../../components/BlogCard';
import { fetchAllBlogs } from '../../lib/github';

export default function BlogIndexPage({ blogs = [] }) {
  const pageTitle = 'NOC & MSP Operations Insights | NOC247';
  const pageDescription =
    'Practical writing on NOC operations for MSPs — alert tuning, support tiers, RMM platforms, and the economics of outsourcing overnight coverage.';
  const canonicalUrl = 'https://noc247.io/blog';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://noc247.io/blog#blog',
    name: 'NOC247 — NOC & MSP operations insights',
    description: pageDescription,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'NOC247',
      url: 'https://noc247.io',
      logo: {
        '@type': 'ImageObject',
        url: 'https://noc247.io/logo.png',
      },
    },
    blogPost: blogs.map((b) => ({
      '@type': 'BlogPosting',
      headline: b.title,
      description: b.description,
      datePublished: b.datePublished,
      dateModified: b.dateModified || b.datePublished,
      url: `https://noc247.io/blog/${b.slug}`,
      author: {
        '@type': 'Organization',
        name: b.author || 'NOC247',
      },
    })),
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://noc247.io/og-default.png" />
        <meta property="og:site_name" content="NOC247" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://noc247.io/og-default.png" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="flex min-h-screen flex-col bg-white text-brand-700 antialiased font-sans">
        <Header activePath="/blog" />

        <main id="main" className="flex-1">
          {/* Hero Section */}
          <section aria-label="Blog intro" className="bg-white pt-14 pb-10 md:pt-20 md:pb-14">
            <div className="container mx-auto px-4 md:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">
                  Insights
                </p>
                <h1 className="mt-4 font-sans text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-neutral-950 md:text-[3.25rem]">
                  NOC &amp; MSP operations,
                  <br />
                  written by people who run it
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-neutral-500">
                  No listicles. Practical notes on alert tuning, support tiers, RMM platforms and the economics of overnight coverage.
                </p>
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section aria-label="All posts" className="bg-white pb-20 md:pb-24">
            <div className="container mx-auto px-4 md:px-8">
              {blogs.length === 0 ? (
                <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 p-8 text-center">
                  <p className="text-neutral-500">No blog posts available at the moment.</p>
                </div>
              ) : (
                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {blogs.map((blog) => (
                    <BlogCard key={blog.slug} blog={blog} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Call to action section */}
          <section
            aria-label="Call to action"
            className="container mx-auto px-4 pb-20 md:px-8"
          >
            <div className="relative isolate overflow-hidden rounded-3xl border border-brand-100 bg-brand-700 text-white shadow-hover">
              <div
                className="absolute inset-0 -z-10 opacity-20"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    'radial-gradient(60% 60% at 0% 0%, #1F6FEB 0%, transparent 60%), radial-gradient(50% 50% at 100% 100%, #13315C 0%, transparent 60%)',
                }}
              />
              <div className="flex flex-col gap-8 p-8 md:p-12 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-200">
                    Ready to see what white-label NOC does for your MSP?
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                    Book a 30-minute NOC consultation.
                  </h2>
                  <p className="mt-4 max-w-xl text-brand-200 md:text-lg">
                    No hard sell. We&#39;ll walk through your endpoint count, existing RMM stack, overnight gaps, and build a transparent go-live plan. Most MSPs are live in 7–10 business days.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
                  <a
                    href="https://calendly.com/noc247-scoping-call/30min"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-accent min-h-[48px]"
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
                      className="lucide lucide-calendar h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                    Book a Call
                  </a>
                  <Link
                    href="/contact"
                    className="btn-secondary min-h-[48px] !border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
                  >
                    Send us a message
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
                      className="lucide lucide-arrow-right h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const blogs = await fetchAllBlogs();
    return {
      props: {
        blogs,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('[Blog Index] Error in getStaticProps:', error);
    return {
      props: {
        blogs: [],
      },
      revalidate: 30,
    };
  }
}
