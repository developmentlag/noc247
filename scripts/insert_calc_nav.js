const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && full.endsWith('.html')) process(full);
  }
}

function process(f) {
  let s = fs.readFileSync(f, 'utf8');
  // skip if nav already contains calculator
  if (s.includes('aria-label="Primary"')) {
    const navStart = s.indexOf('aria-label="Primary"');
    const navOpen = s.lastIndexOf('<nav', navStart);
    const navClose = s.indexOf('</nav>', navStart);
    if (navOpen !== -1 && navClose !== -1) {
      const navBlock = s.slice(navOpen, navClose + 6);
      if (navBlock.includes('href="/calculator"')) return;
    }
  }
  const nocIdx = s.indexOf('NOC Services');
  if (nocIdx === -1) return;
  const divClose = s.indexOf('</div>', nocIdx);
  if (divClose === -1) return;

  const link = '\n    <a class="text-[0.95rem] transition text-neutral-600 hover:text-neutral-950" href="/calculator" data-discover="true">Calculator</a>';
  const newS = s.slice(0, divClose + 6) + link + s.slice(divClose + 6);
  fs.copyFileSync(f, f + '.bak_nav');
  fs.writeFileSync(f, newS, 'utf8');
  console.log('Inserted nav link in', f);
}

walk('public');
