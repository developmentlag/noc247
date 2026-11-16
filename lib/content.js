const fs = require('fs');
const path = require('path');

function readContent(name) {
  return fs.readFileSync(path.join(process.cwd(), 'content', name), 'utf8');
}

function bodyAfter(raw) {
  const match = raw.match(/^## Body copy[^\n]*\n+/m);
  if (!match) throw new Error('Body copy heading missing');
  return raw.slice(match.index + match[0].length).replace(/\s+$/, '');
}

function plainText(value) {
  return String(value || '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractFaq(markdown) {
  const match = markdown.match(/^## (?:Frequently asked questions|FAQ[^\n]*)\n+([\s\S]*)$/m);
  if (!match) return [];
  const section = match[1].split(/\n---\n|\n## /)[0].trim();
  const items = [];
  const re = /\*\*([^*]+)\*\*\s*\n+([\s\S]*?)(?=\n\*\*[^*]+\*\*|\s*$)/g;
  let found;
  while ((found = re.exec(section))) {
    items.push({
      question: plainText(found[1]),
      answer: plainText(found[2]),
    });
  }
  return items;
}

function headingId(text) {
  return String(text)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractHeadings(markdown) {
  return markdown
    .split('\n')
    .filter((line) => /^## /.test(line))
    .map((line) => line.replace(/^## /, '').trim())
    .filter((line) => !/^FAQ/i.test(line) && line !== 'Frequently asked questions')
    .map((text) => ({ text, id: headingId(text) }));
}

function prepareCaseBody(markdown) {
  let body = markdown.replace(/^\s*> \*\*Illustrative scenario[\s\S]*?\n\n/, '');
  body = body.replace(/^# .+\n+/, '');
  return body;
}

function prepareIndexBody(markdown) {
  return markdown.replace(/^# .+\n+/, '');
}

function loadChoosePartner() {
  const body = bodyAfter(readContent('choose-partner.md')).replace(
    /^\*Updated 16 November 2026 · 12 min read · NOC247\*\s*\n+/,
    ''
  );
  return { body, faq: extractFaq(body), headings: extractHeadings(body) };
}

function loadCaseIndex() {
  const body = prepareIndexBody(bodyAfter(readContent('case-index.md')));
  return { body, faq: extractFaq(body) };
}

function loadCase(name) {
  const rawBody = bodyAfter(readContent(name));
  const bannerMatch = rawBody.match(/^> \*\*([\s\S]*?)\n\n/);
  const banner = bannerMatch
    ? bannerMatch[1].replace(/\n> /g, ' ').replace(/\*\*/g, '').trim()
    : '';
  const body = prepareCaseBody(rawBody);
  return { banner, body, faq: extractFaq(body), headings: extractHeadings(body) };
}

function loadBackup() {
  let body = bodyAfter(readContent('backup-flow.md')).split('\n---\n')[0]
    .replace(/^# .+\n+/, '')
    .replace(/<!--\s*BUILD NOTE[\s\S]*?-->\s*/g, '\n\n{{BACKUP_FLOW}}\n\n');
  body = body.replace(
    'The ticket in your PSA carries that priority from the start, under your technician identity.',
    'The ticket in your PSA carries that priority from the start, under your technician identity. Noisy alerts are tuned, not ignored: [cut RMM alert noise](/blog/reduce-rmm-alert-noise).'
  );
  body = body.replace(
    'Open the network ticket, link the backup ticket to it, re-check the job after the link returns',
    'Open the network ticket, link the backup ticket to it, re-check the job after the link returns. [Auvik also reports network configuration backups](/auvik-noc)'
  );
  body = body.replace(
    "## What NOC247 doesn't do\n",
    "## What NOC247 doesn't do\n\nAlongside [managed NOC services for MSPs](/managed-noc-services-for-msps):\n"
  );
  return { body, faq: extractFaq(body), headings: extractHeadings(body) };
}

module.exports = {
  plainText,
  headingId,
  loadChoosePartner,
  loadCaseIndex,
  loadCase,
  loadBackup,
};
