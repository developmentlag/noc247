import ArticleShell from '../../components/ArticleShell';
import PresentBody from '../../components/PresentBody';
import { loadCase } from '../../lib/content';

const PAGES = {
  'us-msp-after-hours-noc': {
    file: 'case-us.md',
    title: 'How NOC247 Covered a Texas MSP Overnight | NOC247',
    description:
      "How NOC247 took nights, weekends and holidays for a 40-person Texas MSP inside ConnectWise Automate and Manage.",
    h1: 'How NOC247 covered a 40-person Texas MSP overnight and on weekends',
    crumb: 'US MSP after-hours NOC',
    lang: 'en-US',
    image: '/og/case-us.png',
    hero: '/illustrations/region-us.svg',
    alt: 'Stylised map of the United States with Texas marked.',
    mid: 'The quickest way to see how much of your overnight noise needs a person is to send us a week of it.',
  },
  'uk-msp-out-of-hours-noc': {
    file: 'case-uk.md',
    title: 'How NOC247 Covered a UK MSP Out of Hours | NOC247',
    description:
      'How NOC247 covered a 25-person UK MSP out of hours, inside NinjaOne and HaloPSA, with UK GDPR in view.',
    h1: 'How NOC247 covered a 25-person UK MSP out of hours',
    crumb: 'UK MSP out-of-hours NOC',
    lang: 'en-GB',
    image: '/og/case-uk.png',
    hero: '/illustrations/region-uk.svg',
    alt: 'Stylised map of the United Kingdom.',
    mid: 'Send one week of your out-of-hours alerts and see which pages needed a person.',
  },
  'australia-msp-24x7-noc': {
    file: 'case-au.md',
    title: 'How NOC247 Covered an Australian MSP | NOC247',
    description:
      'How NOC247 covered a 35-person Australian MSP across Sydney and Perth, with Essential Eight evidence in the tickets.',
    h1: 'How NOC247 covered a 35-person Australian MSP across AEST and AWST',
    crumb: 'Australian MSP 24/7 NOC',
    lang: 'en-AU',
    image: '/og/case-au.png',
    hero: '/illustrations/region-au.svg',
    alt: 'Stylised map of Australia with Sydney and Perth marked.',
    mid: 'Send one week of your after-hours alerts and see which pages needed a person.',
  },
  'europe-msp-multi-country-noc': {
    file: 'case-eu.md',
    title: 'How NOC247 Covered a Three-Country MSP | NOC247',
    description:
      'How NOC247 covered a 30-person MSP with clients in the Netherlands, Belgium and Germany.',
    h1: 'How NOC247 covered a 30-person MSP serving clients in three EU countries',
    crumb: 'European MSP multi-country NOC',
    lang: 'en-US',
    image: '/og/case-eu.png',
    hero: '/illustrations/region-eu.svg',
    alt: 'Stylised map marking the Netherlands, Belgium and Germany.',
    mid: 'Send one week of your after-hours alerts and see which pages needed a person.',
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
        image: `https://www.noc247.io${page.image}`,
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

export default function CaseStudyPage({ slug, banner, body, faq, headings }) {
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
      image={page.image}
      h1={page.h1}
      banner={banner}
      toc={headings}
      hero={{ src: page.hero, alt: page.alt, width: 640, height: 360 }}
    >
      <PresentBody markdown={markdown} midAfter="The challenge" midText={page.mid} />
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
