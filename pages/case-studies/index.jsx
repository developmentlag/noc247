import ArticleShell from '../../components/ArticleShell';
import ContentMarkdown from '../../components/ContentMarkdown';
import { loadCaseIndex } from '../../lib/content';

const PATH = '/case-studies';
const TITLE = 'MSP NOC Case Studies: Scenarios by Region | NOC247';
const DESCRIPTION =
  'Illustrative NOC scenarios for US, UK, Australian and European MSPs: tool stack, after-hours gap, onboarding, escalation and reporting. Not client results.';
const H1 = 'MSP NOC case studies: scenarios by region';
const CASES = [
  { name: 'US MSP after-hours NOC', path: '/case-studies/us-msp-after-hours-noc' },
  { name: 'UK MSP out-of-hours NOC', path: '/case-studies/uk-msp-out-of-hours-noc' },
  { name: 'Australian MSP 24/7 NOC', path: '/case-studies/australia-msp-24x7-noc' },
  { name: 'European MSP multi-country NOC', path: '/case-studies/europe-msp-multi-country-noc' },
];

function graph(faq) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `https://www.noc247.io${PATH}#page`,
        url: `https://www.noc247.io${PATH}`,
        name: H1,
        description: DESCRIPTION,
        inLanguage: 'en-US',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: CASES.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: `https://www.noc247.io${item.path}`,
          })),
        },
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
          { '@type': 'ListItem', position: 2, name: 'Case studies', item: `https://www.noc247.io${PATH}` },
        ],
      },
    ],
  };
}

export default function CaseStudyIndex({ intro, callout, rest, faq }) {
  return (
    <ArticleShell
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      jsonLd={graph(faq)}
      h1={H1}
      publishedTime="2026-11-16"
    >
      <p>{intro}</p>
      <aside className="scenario-banner" aria-label="How to read these scenarios">
        <p>{callout}</p>
      </aside>
      <ContentMarkdown markdown={rest} />
    </ArticleShell>
  );
}

export function getStaticProps() {
  const page = loadCaseIndex();
  const parts = page.body.split('\n\n');
  return {
    props: {
      faq: page.faq,
      intro: parts[0],
      callout: parts[1],
      rest: parts.slice(2).join('\n\n'),
    },
  };
}
