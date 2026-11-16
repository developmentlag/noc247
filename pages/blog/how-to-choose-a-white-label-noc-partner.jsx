import ArticleShell from '../../components/ArticleShell';
import ContentMarkdown from '../../components/ContentMarkdown';
import { loadChoosePartner } from '../../lib/content';

const PATH = '/blog/how-to-choose-a-white-label-noc-partner';
const TITLE = 'How to Choose a White-Label NOC Partner (2026 Checklist)';
const DESCRIPTION =
  'An 8-point checklist for MSPs choosing a white-label NOC: coverage, tools, permissions, escalation, reporting, pricing, pilot, plus a handover template.';
const H1 = 'How to Choose a White-Label NOC Partner: The 2026 MSP Evaluation Checklist';

function graph(faq) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `https://www.noc247.io${PATH}#article`,
        headline: H1,
        description: DESCRIPTION,
        datePublished: '2026-11-16',
        dateModified: '2026-11-16',
        author: { '@type': 'Organization', name: 'NOC247', url: 'https://www.noc247.io' },
        publisher: {
          '@type': 'Organization',
          name: 'NOC247',
          url: 'https://www.noc247.io',
          logo: { '@type': 'ImageObject', url: 'https://www.noc247.io/logo.png' },
        },
        mainEntityOfPage: `https://www.noc247.io${PATH}`,
        url: `https://www.noc247.io${PATH}`,
        image: 'https://www.noc247.io/og-default.png',
        keywords: 'White-Label NOC, Buyer guide, Checklist',
        inLanguage: 'en-US',
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
          { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://www.noc247.io/blog' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'How to choose a white-label NOC partner',
            item: `https://www.noc247.io${PATH}`,
          },
        ],
      },
    ],
  };
}

export default function ChoosePartnerPage({ body, faq, headings }) {
  return (
    <ArticleShell
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      jsonLd={graph(faq)}
      ogType="article"
      publishedTime="2026-11-16"
      h1={H1}
      meta="Updated 16 November 2026 · 12 min read · NOC247"
      toc={headings}
    >
      <ul className="mb-8 flex flex-wrap gap-2">
        {['White-Label NOC', 'Buyer guide', 'Checklist'].map((tag) => (
          <li key={tag} className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600">
            {tag}
          </li>
        ))}
      </ul>
      <ContentMarkdown markdown={body} />
    </ArticleShell>
  );
}

export function getStaticProps() {
  const page = loadChoosePartner();
  return { props: page };
}
