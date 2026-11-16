import ArticleShell from '../../components/ArticleShell';
import PresentBody from '../../components/PresentBody';
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
        image: 'https://www.noc247.io/og/choose-partner.png',
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
      image="/og/choose-partner.png"
      h1={H1}
      meta="Updated 16 November 2026 · 12 min read · NOC247"
      tags={['White-Label NOC', 'Buyer guide', 'Checklist']}
      toc={headings}
      hero={{
        src: '/illustrations/night-shift.svg',
        alt: 'Night-shift timeline from an 18:00 handover, past a 2:14 backup alert, to the 08:00 day desk. Illustrative clock, not a client timeline.',
        width: 640,
        height: 400,
      }}
    >
      <PresentBody
        markdown={body}
        checklist
        midAfter="4. Escalation ownership"
        midText="Before you compare vendors, find out how much of your overnight noise needs a human."
      />
    </ArticleShell>
  );
}

export function getStaticProps() {
  const page = loadChoosePartner();
  return { props: page };
}
