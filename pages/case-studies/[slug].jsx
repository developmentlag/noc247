import ArticleShell from '../../components/ArticleShell';
import ContentMarkdown from '../../components/ContentMarkdown';
import { loadCase } from '../../lib/content';

const PAGES = {
  'us-msp-after-hours-noc': {
    file: 'case-us.md',
    title: 'US MSP After-Hours NOC Scenario (Texas) | NOC247',
    description:
      "Illustrative scenario: how NOC247 would cover a 40-person Texas MSP's nights, weekends and holidays inside ConnectWise. Modelled, not a client result.",
    h1: 'Illustrative scenario: how NOC247 would cover a 40-person Texas MSP overnight and on weekends',
    crumb: 'US MSP after-hours NOC',
    lang: 'en-US',
  },
  'uk-msp-out-of-hours-noc': {
    file: 'case-uk.md',
    title: 'UK MSP Out-of-Hours NOC Scenario | NOC247',
    description:
      'Illustrative scenario: how NOC247 would cover a 25-person UK MSP out of hours, with UK GDPR in view, inside NinjaOne and HaloPSA. Not a client result.',
    h1: 'Illustrative scenario: how NOC247 would give a 25-person UK MSP out-of-hours cover',
    crumb: 'UK MSP out-of-hours NOC',
    lang: 'en-GB',
  },
  'australia-msp-24x7-noc': {
    file: 'case-au.md',
    title: 'Australian MSP 24/7 NOC Scenario | NOC247',
    description:
      'Illustrative scenario: how NOC247 would cover a 35-person MSP across AEST and AWST, with Essential Eight evidence. Modelled, not a client result.',
    h1: 'Illustrative scenario: how NOC247 would cover a 35-person Australian MSP across AEST and AWST',
    crumb: 'Australian MSP 24/7 NOC',
    lang: 'en-AU',
  },
  'europe-msp-multi-country-noc': {
    file: 'case-eu.md',
    title: 'European MSP Multi-Country NOC Scenario | NOC247',
    description:
      'Illustrative scenario: how NOC247 would cover a 30-person MSP serving three EU countries, with GDPR and NIS2 in view. Modelled, not a client result.',
    h1: 'Illustrative scenario: how NOC247 would cover a 30-person MSP serving clients in three EU countries',
    crumb: 'European MSP multi-country NOC',
    lang: 'en-US',
  },
};

function graph(slug, page, faq) {
  const url = `https://www.noc247.io/case-studies/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: page.h1,
        description: page.description,
        datePublished: '2026-11-16',
        dateModified: '2026-11-16',
        author: { '@type': 'Organization', name: 'NOC247', url: 'https://www.noc247.io' },
        publisher: {
          '@type': 'Organization',
          name: 'NOC247',
          url: 'https://www.noc247.io',
          logo: { '@type': 'ImageObject', url: 'https://www.noc247.io/logo.png' },
        },
        mainEntityOfPage: url,
        url,
        image: 'https://www.noc247.io/og-default.png',
        inLanguage: page.lang,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.noc247.io' },
          { '@type': 'ListItem', position: 2, name: 'Case studies', item: 'https://www.noc247.io/case-studies' },
          { '@type': 'ListItem', position: 3, name: page.crumb, item: url },
        ],
      },
    ],
  };
}

export default function CaseStudyPage({ slug, banner, body, faq }) {
  const page = PAGES[slug];
  const markdown = body.replace(/<!--\s*(REAL-RESULTS-SLOT:[^>]*?)\s*-->/g, '\n\n$1\n\n');
  return (
    <ArticleShell
      title={page.title}
      description={page.description}
      path={`/case-studies/${slug}`}
      jsonLd={graph(slug, page, faq)}
      ogType="article"
      publishedTime="2026-11-16"
      h1={page.h1}
      banner={banner}
    >
      <ContentMarkdown markdown={markdown} />
    </ArticleShell>
  );
}

export function getStaticPaths() {
  return {
    paths: Object.keys(PAGES).map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const page = PAGES[params.slug];
  const loaded = loadCase(page.file);
  return { props: { slug: params.slug, ...loaded } };
}
