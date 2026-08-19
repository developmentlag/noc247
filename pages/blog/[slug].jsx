import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { fetchAllBlogs, fetchBlogBySlug } from '../../lib/github';

export default function BlogPostPage({ blog }) {
  if (!blog) return null;

  const {
    slug,
    title,
    description,
    datePublished,
    dateModified,
    dateFormatted,
    dateModifiedFormatted,
    author,
    tags,
    image,
    content,
    rawHtml,
    readingTime,
  } = blog;

  const canonicalUrl = `https://noc247.io/blog/${slug}`;
  const pageTitle = `${title} | NOC247`;
  const heroImage = image || 'https://noc247.io/og-default.png';

  // Article and Breadcrumb JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: title,
        description: description,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
          '@type': 'Organization',
          name: author || 'NOC247',
          url: 'https://noc247.io',
        },
        publisher: {
          '@type': 'Organization',
          name: 'NOC247',
          url: 'https://noc247.io',
          logo: {
            '@type': 'ImageObject',
            url: 'https://noc247.io/logo.png',
          },
        },
        mainEntityOfPage: canonicalUrl,
        url: canonicalUrl,
        image: heroImage,
        keywords: (tags || []).join(', '),
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://noc247.io',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Insights',
            item: 'https://noc247.io/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={heroImage} />
        <meta property="og:site_name" content="NOC247" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:published_time" content={datePublished} />
        {dateModified && <meta property="article:modified_time" content={dateModified} />}
        <meta property="article:author" content={author || 'NOC247'} />
        {tags && tags.map((t) => <meta key={t} property="article:tag" content={t} />)}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={heroImage} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="flex min-h-screen flex-col bg-white text-brand-700 antialiased font-sans">
        <Header activePath="/blog" />

        <main id="main" className="flex-1">
          <article className="bg-white pt-12 pb-16 md:pt-16">
            <div className="container mx-auto px-4 md:px-8">
              <div className="mx-auto max-w-3xl">
                {/* Back to all articles */}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-accent-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                  All articles
                </Link>

                {/* Article Header */}
                <h1 className="mt-7 font-sans text-4xl font-bold leading-[1.12] tracking-[-0.03em] text-neutral-950 md:text-[2.9rem]">
                  {title}
                </h1>

                {/* Article Metadata */}
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-neutral-400">
                  <time dateTime={datePublished}>{dateFormatted}</time>
                  {dateModified && dateModified !== datePublished && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-xs text-neutral-400">
                        Updated {dateModifiedFormatted}
                      </span>
                    </>
                  )}
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
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
                      className="lucide lucide-clock h-4 w-4"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {readingTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-neutral-600">{author || 'NOC247'}</span>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Article Content */}
                <MarkdownRenderer content={content} rawHtml={rawHtml} />

                {/* Article Footer Divider */}
                <div className="my-12 border-t border-neutral-200" />

                {/* Consultation Card */}
                <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6 sm:p-8">
                  <h3 className="font-sans text-xl font-bold text-brand-700">
                    Looking for 24×7 NOC coverage for your MSP?
                  </h3>
                  <p className="mt-2 text-sm text-brand-600 leading-relaxed">
                    NOC247 monitors, triages, and resolves alerts inside your RMM around the clock under your brand. Book a scoping call to get started.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href="https://calendly.com/noc247-scoping-call/30min"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn-accent text-sm"
                    >
                      Book a consultation
                    </a>
                    <Link href="/contact" className="btn-secondary text-sm">
                      Contact us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const blogs = await fetchAllBlogs();
    const paths = blogs.map((b) => ({
      params: { slug: b.slug },
    }));

    return {
      paths,
      fallback: 'blocking', // Allows new GitHub repos to be discovered and rendered on-demand
    };
  } catch (error) {
    console.error('[BlogPost] Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const blog = await fetchBlogBySlug(slug);

    if (!blog) {
      return {
        notFound: true,
        revalidate: 30, // Try again in 30 seconds if author just pushed repo
      };
    }

    return {
      props: {
        blog,
      },
      revalidate: 60, // Incremental Static Regeneration every 60s
    };
  } catch (error) {
    console.error(`[BlogPost] Error fetching blog "${slug}":`, error);
    return {
      notFound: true,
      revalidate: 30,
    };
  }
}
