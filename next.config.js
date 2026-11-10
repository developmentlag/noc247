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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'noc247.io' }],
        destination: 'https://www.noc247.io/:path*',
        permanent: true,
      },
      {
        source: '/blog/What-a-24-7-NOC-really-costs-to-run-in-house',
        destination: '/blog/cost-to-build-24x7-noc',
        permanent: true,
      },
      {
        source: '/blog/How-to-cut-RMM-alert-noise-without-missing-the-one-that-matters',
        destination: '/blog/reduce-rmm-alert-noise',
        permanent: true,
      },
      {
        source: '/blog/L1-L2-and-L3-IT-support-what-the-tiers-actually-mean',
        destination: '/blog/l1-l2-l3-it-support',
        permanent: true,
      },
      {
        source: '/blog/What-is-a-NOC-and-does-your-MSP-actually-need-one-',
        destination: '/blog/what-is-a-noc',
        permanent: true,
      },
      {
        source: '/blog/How-to-set-up-a-NOC-in-house-the-honest-roadmap',
        destination: '/blog/how-to-set-up-a-noc',
        permanent: true,
      },
    ];
  },
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

    return {
      beforeFiles: [{ source: '/sitemap.xml', destination: '/api/sitemap' }],
      afterFiles: rewrites,
    };
  }
};
