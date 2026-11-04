#!/usr/bin/env python3
"""Idempotent clean-ups for defects that come from the source notes themselves. Run after tools/build_gate_da.py.

- escaped <sup>/<sub> tags shown as text (ch2: cm&lt;sup&gt;2&lt;/sup&gt;)
- heading-only sections (empty in the source) are dropped from chapters and from data/index.json
- currency written as $\\$500$ with doubled backslashes and missing spaces (ch42)
"""
import glob, json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LITERAL = [
    ('$\\\\$2000$', '$\\$2000$'),
    ('withdrawal of$\\\\$2500$ should', 'withdrawal of $\\$2500$ should'),
    ('$\\\\$500$and$\\\\$100$occur', '$\\$500$ and $\\$100$ occur'),
    ('write back$\\\\$9500$and$\\\\$9900$.', 'write back $\\$9500$ and $\\$9900$.'),
]

def fix(s):
    s = re.sub(r'&lt;(sup|sub)&gt;(.*?)&lt;/\1&gt;', r'<\1>\2</\1>', s)
    for a, b in LITERAL: s = s.replace(a, b)
    return s

def walk(o):
    if isinstance(o, str): return fix(o)
    if isinstance(o, list): return [walk(v) for v in o]
    if isinstance(o, dict): return {k: walk(v) for k, v in o.items()}
    return o

empty = set()
changed = 0
for f in sorted(glob.glob(os.path.join(ROOT, 'data', 'chapters', '*.json'))):
    old = json.load(open(f)); new = walk(old)
    for sec in [x for x in new['sections'] if not x['blocks']]:
        empty.add((new['num'], sec['id']))
    new['sections'] = [x for x in new['sections'] if x['blocks']]
    new['sectionCount'] = len(new['sections']) if 'sectionCount' in new else None
    if new['sectionCount'] is None: del new['sectionCount']
    if new != old:
        json.dump(new, open(f, 'w', encoding='utf-8'), ensure_ascii=False); changed += 1
        print('fixed', os.path.basename(f))
idx_path = os.path.join(ROOT, 'data', 'index.json')
idx = json.load(open(idx_path))
for c in idx['chapters']:
    keep = [x for x in c['sections'] if (c['num'], x['id']) not in empty]
    if len(keep) != len(c['sections']):
        c['sections'] = keep; c['sectionCount'] = len(keep)
json.dump(idx, open(idx_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(changed, 'files changed;', len(empty), 'empty sections dropped')
