import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ProtocolBox from './ProtocolBox';
import BackupFlow from './BackupFlow';

function headingId(text) {
  return String(text)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function textOf(node) {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (React.isValidElement(node)) return textOf(node.props.children);
  return '';
}

function MarkdownLink({ href, children }) {
  const className = 'link-underline';
  if (!href) return <span>{children}</span>;
  if (/^https?:/i.test(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function ContentMarkdown({ markdown }) {
  return (
    <div className="content-prose prose-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: MarkdownLink,
          h2: ({ children }) => {
            const id = headingId(textOf(children));
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const id = headingId(textOf(children));
            return <h3 id={id}>{children}</h3>;
          },
          p: ({ children }) => {
            const text = textOf(children).trim();
            if (text === '{{BACKUP_FLOW}}') return <BackupFlow />;
            if (text.startsWith('REAL-RESULTS-SLOT:')) {
              return <div dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }} />;
            }
            return <p>{children}</p>;
          },
          table: ({ children }) => {
            const label = textOf(children).slice(0, 80);
            const stack = label.startsWith('Scenario');
            return (
              <div className={stack ? 'content-table content-table--stack' : 'content-table'}>
                <table>{children}</table>
              </div>
            );
          },
          th: ({ children }) => <th scope="col">{children}</th>,
          pre: ({ children }) => children,
          code: ({ inline, className, children }) => {
            const text = String(children).replace(/\n$/, '');
            if (!inline && text.includes('SHIFT HANDOVER PROTOCOL')) return <ProtocolBox />;
            if (inline) return <code>{children}</code>;
            return (
              <pre>
                <code className={className}>{children}</code>
              </pre>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
