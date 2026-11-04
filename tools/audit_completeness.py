#!/usr/bin/env python3
"""Compare each converted chapter with its source HTML: words, figures, tables, headings, odd elements."""
import json, os, re, glob
from bs4 import BeautifulSoup
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORDER = [('ps', 8), ('mla', 7), ('va', 4), ('calc', 6), ('python', 6), ('dsa', 10), ('dbms', 7), ('dw', 3), ('mls', 6), ('mlu', 3)]
words = lambda s: len(re.findall(r"[A-Za-z0-9]+", s))

def conv_stats(c):
    w = f = t = h = code = 0
    def walk(bl):
        nonlocal w, f, t, h, code
        for b in bl:
            k = b['t']
            if k in ('p', 'math', 'code'): w += words(re.sub(r'<[^>]+>', ' ', b['x']))
            if k == 'h': h += 1; w += words(b['x'])
            if k == 'fig': f += len(b.get('srcs') or b.get('figs') or [1]); w += words(b.get('caption', ''))
            if k == 'table':
                t += 1
                for r in b['rows']:
                    for x in r: w += words(re.sub(r'<[^>]+>', ' ', x))
            if k == 'box': w += words(b.get('title') or ''); walk(b['blocks'])
            if k == 'list':
                for it in b['items']: walk(it['blocks'])
    walk(c['intro'])
    for s in c['sections']: h += 1; w += words(s['title']); walk(s['blocks'])
    return w, f, t, h

rows = []; num = 0
for sub, n in ORDER:
    for i in range(1, n + 1):
        num += 1
        raw = open(os.path.join(ROOT, 'raw', sub, f'ch{i:02d}.html'), encoding='utf-8').read()
        soup = BeautifulSoup(raw, 'html.parser')
        body = soup.select_one('.content-inner') or soup.body
        for x in body(['script', 'style']): x.decompose()
        rw = words(body.get_text(' '))
        imgs = len(body.find_all('img')); tabs = len(body.find_all('table'))
        odd = {k: len(body.find_all(k)) for k in ('svg', 'canvas', 'iframe', 'video', 'details', 'button', 'input', 'select') if body.find_all(k)}
        c = json.load(open(glob.glob(os.path.join(ROOT, 'data', 'chapters', f'{num:02d}-*.json'))[0]))
        w, f, t, h = conv_stats(c)
        rows.append((num, sub, i, c['title'][:34], rw, w, round(w / max(rw, 1), 2), imgs, f, tabs, t, odd))
print(f"{'#':>2} {'src':<7} {'title':<34} {'rawW':>6} {'outW':>6} {'ratio':>5} {'img':>4}/{'out':<4} {'tab':>3}/{'out':<3} odd")
for r in rows:
    flag = '  <-- CHECK' if r[6] < 0.8 or r[7] != r[8] or r[9] != r[10] or r[11] else ''
    print(f"{r[0]:>2} {r[1]}/ch{r[2]:02d} {r[3]:<34} {r[4]:>6} {r[5]:>6} {r[6]:>5} {r[7]:>4}/{r[8]:<4} {r[9]:>3}/{r[10]:<3} {r[11] or ''}{flag}")
