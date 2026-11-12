import Head from 'next/head';

const ORIGIN = 'https://www.noc247.io';

export default function PageMeta({ title, description, path, jsonLd }) {
  const url = `${ORIGIN}${path}`;
  const image = `${ORIGIN}/og-default.png`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="NOC247" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
    </Head>
  );
}

export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': `${ORIGIN}/#organization`,
    name: 'NOC247',
    url: ORIGIN,
    email: 'mailto:hello@noc247.io',
    description:
      'White-label, 24×7 managed NOC services delivered exclusively to MSPs in the US and UK — under your brand, inside your RMM.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2nd Floor, Awfis, Kalpataru Prime, Wagle Industrial Estate',
      addressLocality: 'Thane West',
      addressRegion: 'Maharashtra',
      postalCode: '400604',
      addressCountry: 'IN',
    },
    logo: {
      '@type': 'ImageObject',
      url: `${ORIGIN}/logo.png`,
    },
  };
}

export function faqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function webPageJsonLd({ path, title, description }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationJsonLd(),
      {
        '@type': 'WebPage',
        '@id': `${ORIGIN}${path}#webpage`,
        url: `${ORIGIN}${path}`,
        name: title,
        description,
        isPartOf: { '@id': `${ORIGIN}/#website` },
        about: { '@id': `${ORIGIN}/#organization` },
        inLanguage: 'en-US',
      },
    ],
  };
}
