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

function rowsOf(children) {
  const rows = [];
  React.Children.forEach(children, (section) => {
    React.Children.forEach(section && section.props ? section.props.children : null, (row) => {
      const cells = [];
      React.Children.forEach(row && row.props ? row.props.children : null, (cell) => {
        cells.push(cell.props.children);
      });
      if (cells.length) rows.push(cells);
    });
  });
  return rows;
}

function leadNumber(label, value) {
  if (/endpoint/i.test(label)) {
    const count = value.match(/(\d{1,3}(?:,\d{3})+|\d+)/);
    return count ? count[1] : null;
  }
  if (/profile|people/i.test(label)) {
    const people = value.match(/(\d[\d,]*)\s+people/);
    return people ? people[1] : null;
  }
  if (/window/i.test(label)) {
    const hours = value.match(/(\d[\d,]*)\s+hours/);
    return hours ? hours[1] : null;
  }
  return null;
}

const REGIONS = [
  { test: /Australia|Australian/i, tag: 'Australia', src: '/illustrations/region-au.webp', alt: 'Night map of Australia with city lights at Sydney and Perth.' },
  { test: /\bUK\b|United Kingdom/i, tag: 'United Kingdom', src: '/illustrations/region-uk.webp', alt: 'Night map of the United Kingdom with city lights at London, Manchester and Edinburgh.' },
  { test: /Europe|European/i, tag: 'Europe', src: '/illustrations/region-eu.webp', alt: 'Night map of the Netherlands, Belgium and western Germany with city lights at Amsterdam, Brussels and Frankfurt.' },
  { test: /\bUS\b|Texas|United States/i, tag: 'United States', src: '/illustrations/region-us.webp', alt: 'Night map of Texas with city lights at Dallas, Houston and Austin.' },
];

function regionFor(node) {
  const text = textOf(node);
  return REGIONS.find((item) => item.test.test(text)) || REGIONS[3];
}

function CardList({ children }) {
  const items = React.Children.toArray(children).filter(React.isValidElement);
  return (
    <ul className="card-list">
      {items.map((item, index) => (
        <li key={item.key || index}>
          <span className="card-list__icon" aria-hidden="true">{index + 1}</span>
          <div>{item.props.children}</div>
        </li>
      ))}
    </ul>
  );
}

function StepList({ children }) {
  const items = React.Children.toArray(children).filter(React.isValidElement);
  return (
    <ol className="step-list">
      {items.map((item, index) => (
        <li key={item.key || index}>
          <span className="step-list__n" aria-hidden="true">{index + 1}</span>
          <div>{item.props.children}</div>
        </li>
      ))}
    </ol>
  );
}

function GlanceGrid({ rows }) {
  return (
    <div className="glance-grid">
      {rows.slice(1).map((row) => {
        const label = textOf(row[0]);
        const value = textOf(row[1]);
        const figure = leadNumber(label, value);
        return (
          <article className="glance-card" key={label}>
            {figure ? <p className="figure">{figure}</p> : null}
            <p><strong>{label}.</strong> {row[1]}</p>
          </article>
        );
      })}
    </div>
  );
}

function RegionGrid({ rows }) {
  const headers = rows[0].map((cell) => textOf(cell));
  return (
    <div className="region-grid">
      {rows.slice(1).map((row) => {
        const region = regionFor(row[0]);
        return (
          <article className="region-card" key={textOf(row[0])}>
            <img src={region.src} alt={region.alt} width="1600" height="900" loading="lazy" decoding="async" />
            <p className="tag">{region.tag}</p>
            <h3>{row[0]}</h3>
            <dl>
              {headers.slice(1).map((header, index) => (
                <div key={header}>
                  <dt>{header.replace(/\s*\(assumed\)/gi, '')}</dt>
                  <dd>{row[index + 1]}</dd>
                </div>
              ))}
            </dl>
          </article>
        );
      })}
    </div>
  );
}

function CompareCards({ rows }) {
  const headers = rows[0].map((cell) => textOf(cell));
  return (
    <div className="glance-grid">
      {rows.slice(1).map((row) => (
        <article className="compare-card" key={textOf(row[0])}>
          <p className="kicker">{headers[0]}</p>
          <p><strong>{row[0]}</strong></p>
          <p><span className="kicker">{headers[1]}</span><br />{row[1]}</p>
          {row[2] ? (
            <p className="bad"><span className="kicker">{headers[2]}</span><br />{row[2]}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function PermGrid({ rows }) {
  const headers = rows[0].map((cell) => textOf(cell));
  return (
    <div className="perm-grid">
      {rows.slice(1).map((row) => (
        <article className="perm-card" key={textOf(row[0])}>
          <p className="kicker">{headers[0]}</p>
          <p><strong>{row[0]}</strong></p>
          {row.slice(1).map((cell, index) => (
            <p key={headers[index + 1]}><span className="kicker">{headers[index + 1]}</span><br />{cell}</p>
          ))}
        </article>
      ))}
    </div>
  );
}

function NightList({ rows }) {
  return (
    <div className="glance-grid">
      {rows.slice(1).map((row) => (
        <article className="night-card" key={`${textOf(row[0])}-${textOf(row[1]).slice(0, 24)}`}>
          <p className="when">{row[0]}</p>
          <p>{row[1]}</p>
          <p><span className="kicker">Who acts</span><br />{row[2]}</p>
        </article>
      ))}
    </div>
  );
}

function WeightList({ rows }) {
  return (
    <div className="weight-list">
      {rows.slice(1).map((row) => {
        const weight = Number(textOf(row[1])) || 0;
        return (
          <div className="weight-row" key={textOf(row[0])}>
            <p><strong>{row[0]}</strong></p>
            <p>Suggested weight: {row[1]} out of 100</p>
            <div className="weight-bar" aria-hidden="true"><span style={{ width: `${weight}%` }} /></div>
          </div>
        );
      })}
    </div>
  );
}

function findLink(node, found) {
  if (node == null) return found;
  if (Array.isArray(node)) {
    node.forEach((child) => findLink(child, found));
    return found;
  }
  if (React.isValidElement(node)) {
    if (node.props && node.props.href) {
      found.href = node.props.href;
      found.label = textOf(node.props.children).trim();
    }
    findLink(node.props.children, found);
  }
  return found;
}

function polishCtaDescription(text) {
  const cleaned = text.replace(/^[\s:–—-]+/, '').replace(/\s+/g, ' ').trim();
  if (!cleaned) return '';
  if (/^we will walk through your RMM, endpoint count and overnight gaps\.?$/i.test(cleaned)) {
    return "We'll walk through your RMM, endpoint count and overnight gaps.";
  }
  if (/^send one week of after-hours alerts from your RMM and get counts and examples from your own data\.?$/i.test(cleaned)) {
    return 'Send one week of after-hours alerts from your RMM and get counts and examples from your own data.';
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function CtaCards({ children }) {
  const items = React.Children.toArray(children).filter(React.isValidElement);
  return (
    <ul className="cta-cards">
      {items.map((item, index) => {
        const link = findLink(item.props.children, { href: '', label: '' });
        const description = polishCtaDescription(textOf(item.props.children).replace(link.label, ''));
        const external = /^https?:/i.test(link.href);
        return (
          <li className="cta-card" key={link.href || index}>
            <a
              className={index === 0 ? 'cta-card__btn cta-card__btn--primary' : 'cta-card__btn'}
              href={link.href}
              {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            >
              {link.label}
            </a>
            {description ? <p>{description}</p> : null}
          </li>
        );
      })}
    </ul>
  );
}

function PlainTable({ children }) {
  return (
    <div className="data-table">
      <table>{children}</table>
    </div>
  );
}

export default function ContentMarkdown({ markdown, heading = '' }) {
  const state = { paragraphs: 0, faqQuestion: false };
  const section = heading;
  const isCta = /see your own version|ready to see|see how many/i.test(section);
  const isFaq = /^faq|frequently asked/i.test(section);
  const cardUl = /name what you are buying|what every scenario covers|what is specific|what noc247 doesn't do|step 4:|step 6:|step 8:/i.test(section);
  const stepOl = /four-week|onboard/i.test(section);

  return (
    <div className={isFaq ? 'content-prose prose-body is-faq' : 'content-prose prose-body'}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: MarkdownLink,
          h2: ({ children }) => <h2 id={headingId(textOf(children))}>{children}</h2>,
          h3: ({ children }) => <h3 id={headingId(textOf(children))}>{children}</h3>,
          ul: ({ children }) => (isCta ? <CtaCards>{children}</CtaCards> : cardUl ? <CardList>{children}</CardList> : <ul>{children}</ul>),
          ol: ({ children }) => (stepOl ? <StepList>{children}</StepList> : <ol>{children}</ol>),
          p: ({ children }) => {
            const text = textOf(children).trim();
            if (text === '{{BACKUP_FLOW}}') return <BackupFlow />;
            if (text.startsWith('REAL-RESULTS-SLOT:')) {
              return <div dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }} />;
            }
            state.paragraphs += 1;
            if (!section && state.paragraphs === 1 && (text.startsWith('It is 2:14') || text.startsWith('The job that failed at 11:05'))) {
              return <blockquote className="pull"><p>{children}</p></blockquote>;
            }
            if (text.startsWith('This guide is a working checklist') || text.startsWith('This page shows what happens between')) {
              return (
                <aside className="takeaway">
                  <strong>Key takeaway</strong>
                  <p>{children}</p>
                </aside>
              );
            }
            if (text.startsWith('A note on bias')) {
              return <aside className="bias"><p>{children}</p></aside>;
            }
            if (text.startsWith("We can't show you a client result")) {
              return (
                <aside className="takeaway">
                  <strong>How to read these pages</strong>
                  <p>{children}</p>
                </aside>
              );
            }
            if (isFaq && /^\*\*/.test(text) === false && children && React.Children.count(children) === 1) {
              const only = React.Children.toArray(children)[0];
              if (React.isValidElement(only) && only.type === 'strong') {
                state.faqQuestion = true;
                return <h3 className="faq-q">{children}</h3>;
              }
            }
            const className = state.faqQuestion ? 'faq-a' : undefined;
            state.faqQuestion = false;
            return <p className={className}>{children}</p>;
          },
          table: ({ children }) => {
            const rows = rowsOf(children);
            const headers = (rows[0] || []).map((cell) => textOf(cell));
            const label = headers.join(' ');
            if (section === 'The four scenarios' || label.startsWith('Scenario')) return <RegionGrid rows={rows} />;
            if (headers[0] === 'Item') return <GlanceGrid rows={rows} />;
            if (headers[0] === 'Time') return <NightList rows={rows} />;
            if (headers[0] === 'Tier') return <PermGrid rows={rows} />;
            if (/Red flag|Strong answer/.test(label)) return <CompareCards rows={rows} />;
            if (/Suggested weight/.test(label)) return <WeightList rows={rows} />;
            if (headers[0] === 'Branch' || headers[0] === 'Tool' || headers[0] === 'Measure' || headers[0] === 'Area' || headers[0] === 'Layer') {
              return <PermGrid rows={rows} />;
            }
            return <PlainTable>{children}</PlainTable>;
          },
          th: ({ children }) => <th scope="col">{children}</th>,
          pre: ({ children }) => children,
          code: ({ inline, className, children }) => {
            const text = String(children).replace(/\n$/, '');
            if (!inline && text.includes('SHIFT HANDOVER PROTOCOL')) return <ProtocolBox />;
            if (inline) return <code>{children}</code>;
            return <pre><code className={className}>{children}</code></pre>;
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
