// Renders every $math$ string in content/cheatsheet/*.ts and data/pyq-solutions.json with KaTeX (throwOnError).
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const katex = require('katex');
const macros = JSON.parse(fs.readFileSync('lib/katexMacros.json', 'utf8'));
const MATH = /(?<!\\)\$((?:\\.|[^$\\])+?)\$/g;
let n = 0, bad = 0;
const check = (where, text) => {
  for (const m of text.matchAll(MATH)) {
    n++;
    try { katex.renderToString(m[1], { macros: { ...macros }, throwOnError: true, strict: 'ignore' }); }
    catch (e) { bad++; console.log('BAD', where, m[1].slice(0, 70), String(e.message).slice(0, 70)); }
  }
};
for (const f of fs.readdirSync('content/cheatsheet').filter((f) => f.endsWith('.ts') && !['index.ts', 'types.ts'].includes(f))) {
  const src = fs.readFileSync(`content/cheatsheet/${f}`, 'utf8').replace(/import type[^\n]*\n/, '');
  const out = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const m = { exports: {} };
  new Function('module', 'exports', out)(m, m.exports);
  const s = Object.values(m.exports)[0];
  const texts = [...s.points, ...s.traps, ...s.formulas.flatMap((g) => g.items.flatMap((i) => [i.label, i.tex])), ...(s.tables ?? []).flatMap((t) => t.rows.flat())];
  for (const t of texts) check(f, t);
}
const sol = JSON.parse(fs.readFileSync('data/pyq-solutions.json', 'utf8'));
for (const [id, steps] of Object.entries(sol)) for (const s of steps) check(id, s);
console.log(`${n} math strings in the formula sheet and solutions, ${bad} failed`);
