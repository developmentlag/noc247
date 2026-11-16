import Link from 'next/link';
import MarketingShell from './MarketingShell';
import PageMeta from './PageMeta';

export default function ArticleShell({
  title,
  description,
  path,
  jsonLd,
  ogType = 'website',
  publishedTime,
  eyebrow,
  h1,
  meta,
  banner,
  toc,
  children,
}) {
  return (
    <MarketingShell activePath={path}>
      <PageMeta
        title={title}
        description={description}
        path={path}
        jsonLd={jsonLd}
        ogType={ogType}
        publishedTime={publishedTime}
      />
      <article className="bg-white pt-12 pb-16 md:pt-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-neutral-500">
              <Link href="/" className="link-underline">Home</Link>
              {path.startsWith('/blog') ? (
                <>
                  {' / '}
                  <Link href="/blog" className="link-underline">Insights</Link>
                </>
              ) : null}
              {path.startsWith('/case-studies/') ? (
                <>
                  {' / '}
                  <Link href="/case-studies" className="link-underline">Case studies</Link>
                </>
              ) : null}
            </p>
            {banner ? (
              <aside className="scenario-banner" aria-label="Illustrative scenario">
                <p className="scenario-banner__label">Illustrative scenario</p>
                <p>{banner}</p>
              </aside>
            ) : null}
            {eyebrow ? (
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">{eyebrow}</p>
            ) : null}
            <h1 className="mt-4 font-sans text-4xl font-bold leading-[1.12] tracking-[-0.03em] text-neutral-950 md:text-[2.6rem]">
              {h1}
            </h1>
            {meta ? <p className="mt-6 text-sm text-neutral-500">{meta}</p> : null}
            {toc && toc.length ? (
              <nav className="content-toc" aria-label="On this page">
                <p>On this page</p>
                <ol>
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a className="link-underline" href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </article>
    </MarketingShell>
  );
}
