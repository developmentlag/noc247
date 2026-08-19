const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && full.endsWith('.html')) process(full);
  }
}

function process(file) {
  let s = fs.readFileSync(file, 'utf8');
  if (s.includes('/_calculator_inject.js')) return;
  const idx = s.lastIndexOf('</head>');
  if (idx === -1) return;
  const tag = '\n    <script src="/_calculator_inject.js" defer></script>\n';
  fs.copyFileSync(file, file + '.bak_inject');
  s = s.slice(0, idx) + tag + s.slice(idx);
  fs.writeFileSync(file, s, 'utf8');
  console.log('Inserted inject tag into', file);
}

walk('public');
