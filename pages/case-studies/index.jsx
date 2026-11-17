import ArticleShell from '../../components/ArticleShell';
import PresentBody from '../../components/PresentBody';
import { loadCaseIndex } from '../../lib/content';

const PATH = '/case-studies';
const TITLE = 'MSP NOC Case Studies: Scenarios by Region | NOC247';
const DESCRIPTION =
  'NOC case studies for US, UK, Australian and European MSPs: stack, hours, onboarding, escalation and the morning report.';
const H1 = 'MSP NOC case studies by region';
const CASES = [
  { name: 'US MSP after-hours NOC', path: '/case-studies/us-msp-after-hours-noc' },
  { name: 'UK MSP out-of-hours NOC', path: '/case-studies/uk-msp-out-of-hours-noc' },
  { name: 'Australian MSP 24/7 NOC', path: '/case-studies/australia-msp-24x7-noc' },
  { name: 'European MSP multi-country NOC', path: '/case-studies/europe-msp-multi-country-noc' },
];

function graph() {
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
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.noc247.io' },
          { '@type': 'ListItem', position: 2, name: 'Case studies', item: `https://www.noc247.io${PATH}` },
        ],
      },
    ],
  };
}

export default function CaseStudyIndex({ intro, rest }) {
  return (
    <ArticleShell
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      jsonLd={graph()}
      h1={H1}
      publishedTime="2026-11-16"
      image="/og/case-studies.png"
      hero={{
        src: '/illustrations/region-index.svg',
        alt: 'Four region markers for the United States, the United Kingdom, Australia and Europe.',
        width: 640,
        height: 300,
      }}
    >
      <p className="present-lede">{intro}</p>
      <PresentBody
        markdown={rest}
        midAfter="How to read the numbers"
        midText="If your stack and your gap look similar, the free After-Hours Alert Audit will show how much of your own overnight alert volume needs a person."
      />
    </ArticleShell>
  );
}

export function getStaticProps() {
  const page = loadCaseIndex();
  const intro = page.body.split('\n\n')[0];
  const rest = page.body
    .replace(/^[\s\S]*?(?=## The four scenarios)/, '')
    .replace(/\n## FAQ[\s\S]*$/, '');
  return { props: { intro, rest } };
}
