const fs = require('fs');
const path = require('path');

function collectIndexHtmlFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Exclude blog directory so dynamic Next.js pages handle /blog and /blog/[slug]
      if (entry.name === 'blog') continue;
      results.push(...collectIndexHtmlFiles(full));
    } else if (entry.isFile() && entry.name.toLowerCase() === 'index.html') {
      results.push(full);
    }
  }
  return results;
}

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) return [];
    const files = collectIndexHtmlFiles(publicDir);
    const rewrites = [];
    for (const file of files) {
      const rel = path.relative(publicDir, file).replace(/\\/g, '/');
      // rel is like "index.html" or "about/index.html"
      if (rel === 'index.html') {
        rewrites.push({ source: '/', destination: '/index.html' });
      } else {
        const route = '/' + rel.replace(/\/index.html$/, '').replace(/index.html$/, '');
        const dest = '/' + rel;
        // map both /route and /route/ to the same index.html
        rewrites.push({ source: route, destination: dest });
        rewrites.push({ source: route.endsWith('/') ? route.slice(0, -1) : route + '/', destination: dest });
      }
    }
    // explicit mapping for calculator path (serve the copied calculator app)
    // keep both /calculator and /noc247-calculator for compatibility
    rewrites.push({ source: '/calculator', destination: '/calculator/index.html' });
    rewrites.push({ source: '/calculator/', destination: '/calculator/index.html' });
    rewrites.push({ source: '/noc247-calculator', destination: '/calculator/index.html' });
    rewrites.push({ source: '/noc247-calculator/', destination: '/calculator/index.html' });

    // dynamic sitemap
    rewrites.push({ source: '/sitemap.xml', destination: '/api/sitemap' });

    return rewrites;
  }
};
