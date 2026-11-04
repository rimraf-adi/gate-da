#!/usr/bin/env python3
"""Structural audit of data/chapters/*.json: stray markup, empty blocks, missing figure files, placeholder text.

Writes data/_audit.json (math strings for tools/audit_math.mjs) and prints a summary.
"""
import json, glob, os, re, collections
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
issues = collections.defaultdict(list)
maths = []
figs_total = 0

def walk(blocks, ch, path=''):
    global figs_total
    for i, b in enumerate(blocks):
        t = b['t']; where = f"{ch} {path}#{i}"
        if t == 'p':
            x = b['x']
            if not x.strip(): issues['empty paragraph'].append(where)
            if re.search(r'\\(begin|end|ding|textbf|emph|item|label|ref|cite)\b', re.sub(r'(?<!\\)\$(?:\\.|[^$\\])+?\$', ' ', x)): issues['raw latex command in text'].append((where, x[:80]))
            if x.count('$') % 2: issues['odd number of $'].append((where, x[:80]))
            if re.search(r'&(amp|lt|gt|nbsp|#\d+);', x): issues['html entity'].append((where, x[:60]))
            if re.search(r'<(?!/?(b|i|code|br|sub|sup|u|em|strong|a|span)\b)[a-z]', x): issues['unexpected tag'].append((where, x[:80]))
            if re.search(r'\b(TODO|FIXME|lorem)\b', x, re.I): issues['placeholder'].append(where)
            for m in re.findall(r'(?<!\\)\$((?:\\.|[^$\\])+?)\$', x): maths.append((where, m, False))
        elif t == 'math':
            maths.append((where, b['x'], True))
            if not b['x'].strip(): issues['empty math'].append(where)
        elif t == 'h':
            if not b['x'].strip(): issues['empty heading'].append(where)
        elif t == 'fig':
            figs_total += 1
            for s in b.get('srcs') or []:
                f = os.path.join(ROOT, 'public', s.lstrip('/'))
                if not os.path.exists(f): issues['missing figure file'].append((where, s))
                elif os.path.getsize(f) < 300: issues['tiny figure file'].append((where, s))
            if not b.get('srcs') and not b.get('figs'): issues['figure without source'].append(where)
        elif t == 'table':
            if not b['rows'] or all(not any(c.strip() for c in r) for r in b['rows']): issues['empty table'].append(where)
            w = {len(r) for r in b['rows']}
            if len(w) > 1: issues['ragged table'].append((where, sorted(w)))
            for r in b['rows']:
                for c in r:
                    for m in re.findall(r'(?<!\\)\$((?:\\.|[^$\\])+?)\$', c): maths.append((where, m, False))
        elif t == 'code':
            if not b['x'].strip(): issues['empty code'].append(where)
        elif t == 'box':
            if not b['blocks']: issues['empty box'].append(where)
            walk(b['blocks'], ch, path + 'box/')
        elif t == 'list':
            if not b['items']: issues['empty list'].append(where)
            for it in b['items']: walk(it['blocks'], ch, path + 'li/')

stats = []
for f in sorted(glob.glob(os.path.join(ROOT, 'data', 'chapters', '*.json'))):
    c = json.load(open(f)); ch = f"ch{c['num']}"
    walk(c['intro'], ch, 'intro/')
    for s in c['sections']:
        if not s['blocks']: issues['empty section'].append((ch, s['id'], s['title']))
        walk(s['blocks'], ch, f"{s['id']}/")
    stats.append((c['num'], c['title'], c['wordCount'], len(c['sections'])))
json.dump([{'where': w, 'tex': m, 'display': d} for w, m, d in maths], open(os.path.join(ROOT, 'data', '_audit_math.json'), 'w'))
print('chapters', len(stats), '| math strings', len(maths), '| figures', figs_total)
for k, v in sorted(issues.items(), key=lambda kv: -len(kv[1])):
    print(f"\n{k}: {len(v)}")
    for x in v[:6]: print('  ', x)
print('\nthinnest chapters:', sorted(stats, key=lambda s: s[2])[:10])
