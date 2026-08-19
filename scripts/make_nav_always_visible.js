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
  const navOpenIdx = s.indexOf('aria-label="Primary"');
  if (navOpenIdx === -1) return;
  // find start of <nav tag
  const tagStart = s.lastIndexOf('<nav', navOpenIdx);
  if (tagStart === -1) return;
  const tagEnd = s.indexOf('>', tagStart);
  if (tagEnd === -1) return;
  const tag = s.slice(tagStart, tagEnd + 1);
  if (!/\bhidden\b/.test(tag) && /\bflex\b/.test(tag)) return; // already visible

  let newTag = tag.replace(/\bhidden\b/g, '');
  newTag = newTag.replace(/\blg:flex\b/g, 'flex');
  // ensure we have 'flex' present
  if (!/\bflex\b/.test(newTag)) {
    newTag = newTag.replace(/class=("|')/, 'class=$1flex ');
  }
  // collapse multiple spaces inside class attribute
  newTag = newTag.replace(/class=("|')([^"']+)("|')/, (m, q1, cls, q3) => {
    const cleaned = cls.replace(/\s+/g, ' ').trim();
    return `class=${q1}${cleaned}${q3}`;
  });

  if (newTag !== tag) {
    fs.copyFileSync(file, file + '.bak_navvis');
    s = s.slice(0, tagStart) + newTag + s.slice(tagEnd + 1);
    fs.writeFileSync(file, s, 'utf8');
    console.log('Patched nav in', file);
  }
}

walk('public');
