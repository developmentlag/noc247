import ArticleShell from '../components/ArticleShell';
import PresentBody from '../components/PresentBody';
import { loadBackup } from '../lib/content';

const PATH = '/msp-backup-monitoring';
const TITLE = 'MSP Backup Monitoring: Overnight Failure Flow | NOC247';
const DESCRIPTION =
  'How NOC247 handles a failed backup overnight: triage, controlled retry, fixes within your permissions, PSA ticket, on-call escalation and a morning report.';
const H1 = 'MSP backups fail overnight: how NOC247 handles it';

function graph(faq) {
  const url = `https://www.noc247.io${PATH}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: H1,
        description: DESCRIPTION,
        inLanguage: 'en-US',
        datePublished: '2026-11-16',
        dateModified: '2026-11-16',
        publisher: {
          '@type': 'Organization',
          name: 'NOC247',
          url: 'https://www.noc247.io',
          logo: { '@type': 'ImageObject', url: 'https://www.noc247.io/logo.png' },
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
          { '@type': 'ListItem', position: 2, name: 'MSP backup monitoring', item: url },
        ],
      },
    ],
  };
}

export default function BackupMonitoringPage({ body, faq, headings }) {
  return (
    <ArticleShell
      title={TITLE}
      description={DESCRIPTION}
      path={PATH}
      jsonLd={graph(faq)}
      h1={H1}
      publishedTime="2026-11-16"
      image="/og/msp-backup.png"
      toc={headings}
      hero={{
        src: '/illustrations/backup-hero.svg',
        alt: 'Diagram of an overnight backup: alert, five-way triage, a stop branch for a ransomware signal, then retry and a morning report. Not a dashboard screenshot.',
        width: 640,
        height: 360,
      }}
    >
      <PresentBody
        markdown={body}
        midAfter="Step 4: controlled retry"
        midText="Send one week of after-hours alerts from your RMM and the free After-Hours Alert Audit shows which pages needed a human and which were noise."
      />
    </ArticleShell>
  );
}

export function getStaticProps() {
  return { props: loadBackup() };
}
