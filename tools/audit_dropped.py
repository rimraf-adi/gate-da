#!/usr/bin/env python3
"""Words (4+ letters) present in a source chapter but absent from its converted JSON: a robust check for dropped content."""
import json, os, re, glob, sys, collections
from bs4 import BeautifulSoup
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORDER = [('ps', 8), ('mla', 7), ('va', 4), ('calc', 6), ('python', 6), ('dsa', 10), ('dbms', 7), ('dw', 3), ('mls', 6), ('mlu', 3)]
words = lambda s: collections.Counter(w.lower() for w in re.findall(r'[A-Za-z]{4,}', s))

def strings(o):
    if isinstance(o, str): yield o
    elif isinstance(o, dict):
        for v in o.values(): yield from strings(v)
    elif isinstance(o, list):
        for v in o: yield from strings(v)

num = 0; total_missing = 0
for sub, n in ORDER:
    for i in range(1, n + 1):
        num += 1
        body = BeautifulSoup(open(os.path.join(ROOT, 'raw', sub, f'ch{i:02d}.html'), encoding='utf-8').read(), 'html.parser')
        body = body.select_one('.content-inner') or body.body
        for x in body(['script', 'style']): x.decompose()
        # math is compared as a whole elsewhere; here only visible prose, so drop it from the source side
        txt = re.sub(r'\\\[.*?\\\]|\\\(.*?\\\)|\$\$.*?\$\$', ' ', body.get_text(' '), flags=re.S)
        raw = words(txt)
        out = words(' '.join(strings(json.load(open(glob.glob(os.path.join(ROOT, 'data', 'chapters', f'{num:02d}-*.json'))[0])))))
        miss = {w: c for w, c in raw.items() if w not in out}
        total_missing += sum(miss.values())
        if sum(miss.values()) >= 3:
            print(f'#{num} {sub}/ch{i:02d}: {sum(miss.values())} word occurrences missing:', ', '.join(f'{w}x{c}' if c > 1 else w for w, c in sorted(miss.items(), key=lambda kv: -kv[1])[:14]))
print('total missing word occurrences:', total_missing)
