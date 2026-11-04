// Renders every math string from data/_audit_math.json with KaTeX (throwOnError) and reports failures.
import fs from 'node:fs';
import katex from 'katex';

const macros = JSON.parse(fs.readFileSync('lib/katexMacros.json', 'utf8'));
const items = JSON.parse(fs.readFileSync('data/_audit_math.json', 'utf8'));
const bad = [];
for (const it of items) {
  try {
    katex.renderToString(it.tex, { macros: { ...macros }, displayMode: it.display, throwOnError: true, strict: 'ignore', output: 'html' });
  } catch (e) {
    bad.push({ where: it.where, tex: it.tex.slice(0, 140), err: String(e.message).split('\n')[0].slice(0, 110) });
  }
}
fs.writeFileSync('data/_audit_math_bad.json', JSON.stringify(bad, null, 1));
console.log(`${items.length} checked, ${bad.length} failed`);
const byErr = {};
for (const b of bad) byErr[b.err.replace(/at position \d+.*/, '').slice(0, 70)] = (byErr[b.err.replace(/at position \d+.*/, '').slice(0, 70)] ?? 0) + 1;
console.log(Object.entries(byErr).sort((a, b) => b[1] - a[1]).slice(0, 12));
for (const b of bad.slice(0, 10)) console.log(b.where, '|', b.tex, '|', b.err);
