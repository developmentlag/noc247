import Head from 'next/head';
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
  image,
  h1,
  meta,
  banner,
  toc,
  hero,
  tags,
  children,
}) {
  const withToc = toc && toc.length;
  return (
    <MarketingShell activePath={path}>
      <Head>
        <link rel="stylesheet" href="/assets/content-present.css" />
      </Head>
      <PageMeta
        title={title}
        description={description}
        path={path}
        jsonLd={jsonLd}
        ogType={ogType}
        publishedTime={publishedTime}
        image={image}
      />
      <article className="present-page">
        <div className="container mx-auto px-4 md:px-8">
          <header className="present-hero">
            <div>
              <p className="text-sm text-neutral-500">
                <Link href="/" className="link-underline">Home</Link>
                {path.startsWith('/blog') ? (
                  <>
                    {' / '}
                    <Link href="/blog" className="link-underline">Insights</Link>
                  </>
                ) : null}
                {path === '/case-studies' ? ' / Case studies' : null}
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
              <h1>{h1}</h1>
              {meta ? <p className="present-meta">{meta}</p> : null}
              {tags ? (
                <ul className="present-tags">
                  {tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              ) : null}
            </div>
            {hero ? (
              <img
                className="present-hero__art"
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                decoding="async"
              />
            ) : null}
          </header>
          <div className={withToc ? 'present-layout present-layout--toc' : 'present-layout'}>
            {withToc ? (
              <nav className="present-toc" aria-label="On this page">
                <details open>
                  <summary>On this page</summary>
                  <ol>
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a className="link-underline" href={`#${item.id}`}>{item.text}</a>
                      </li>
                    ))}
                  </ol>
                </details>
              </nav>
            ) : null}
            <div className="present-body">{children}</div>
          </div>
        </div>
      </article>
    </MarketingShell>
  );
}
