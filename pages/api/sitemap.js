const { fetchAllBlogs } = require('../../lib/github');

const STATIC_ROUTES = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'white-label-noc-services', priority: '0.8', changefreq: 'monthly' },
  { path: 'managed-noc-services-for-msps', priority: '0.8', changefreq: 'monthly' },
  { path: '247-noc-support', priority: '0.8', changefreq: 'monthly' },
  { path: 'outsourced-noc', priority: '0.8', changefreq: 'monthly' },
  { path: 'rmm-integrations', priority: '0.8', changefreq: 'monthly' },
  { path: 'pricing', priority: '0.8', changefreq: 'monthly' },
  { path: 'msp-lead-generation', priority: '0.8', changefreq: 'monthly' },
  { path: 'calculator', priority: '0.8', changefreq: 'monthly' },
  { path: 'about', priority: '0.8', changefreq: 'monthly' },
  { path: 'contact', priority: '0.8', changefreq: 'monthly' },
  { path: 'blog', priority: '0.8', changefreq: 'daily' },
];

export async function generateSitemapXml() {
  const blogs = await fetchAllBlogs();
  const today = new Date().toISOString().slice(0, 10);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Static Pages
  for (const page of STATIC_ROUTES) {
    const loc = page.path ? `https://noc247.io/${page.path}` : 'https://noc247.io/';
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  // 2. Dynamic Blog Pages
  for (const blog of blogs) {
    const loc = `https://noc247.io/blog/${blog.slug}`;
    const lastmod = blog.dateModified || blog.datePublished || today;
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += '    <priority>0.6</priority>\n';
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return xml;
}

export default async function handler(req, res) {
  try {
    const xml = await generateSitemapXml();
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
  } catch (error) {
    console.error('[Sitemap API] Failed to generate sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
