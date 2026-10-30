#!/usr/bin/env python3
"""Parse the GATE DA PYQ Book text (pypdf extract) into data/pyq-bank.json.

Usage: python3 tools/build_pyq_index.py <pyq-text.txt>
Each question: id (year*100 + paper question number), no, subject, year, type, marks, area, topic, answer key.
"""
import json, os, re, sys, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUBJ = {1: 'Probability & Statistics', 2: 'Linear Algebra', 3: 'Calculus & Optimization', 4: 'Programming, Data Structures & Algorithms',
        5: 'Database Management & Warehousing', 6: 'Machine Learning', 7: 'Artificial Intelligence', 8: 'General Aptitude'}
t = open(sys.argv[1], encoding='utf-8').read()
t = re.sub(r'\n\d+\n=====PAGE \d+\nGATE DA: Previous Year[^\n]*\n', '\n', t)
clean = lambda s: re.sub(r'\s+', ' ', re.sub(r'(\w)-\n(\w)', r'\1\2', s)).strip()

keys = {(int(a), int(b), int(c)): k.strip() for a, b, c, k in re.findall(r'Q(\d+)\.(\d+)\.(\d+)\s*\[Key:\s*([^\]]+)\]', t)}
rows = re.findall(r'Q(\d+)\.(\d+)\.(\d+)\s*\[Key:[^\]]*\]\s*Topic:(.+?)\[(MCQ|MSQ|NAT),\s*(\d)M\]', t, re.S)
qs, rows_key = [], []
SUBJ_ORDER = {v: k for k, v in SUBJ.items()}
for ch, yy, n, topic, typ, marks in rows:
    rows_key.append((ch, yy, n))
    area, _, tp = clean(topic).partition(' - ')
    qs.append({'id': f'Q{ch}.{yy}.{n}', 'subject': SUBJ[int(ch)], 'year': 2000 + int(yy), 'type': typ, 'marks': int(marks),
               'area': area, 'topic': tp or area, 'key': keys[(int(ch), int(yy), int(n))]})
assert len(qs) == 195, len(qs)
# Our own id: year * 100 + the question's number in the actual GATE paper (2026, Q19 -> 202619).
for q, (ch, yy, n) in zip(qs, rows_key):
    q['no'] = int(n)
    q['id'] = f"{2000 + int(yy)}{int(n):02d}"
assert len({q['id'] for q in qs}) == 195, 'ids must be unique'
qs.sort(key=lambda q: (SUBJ_ORDER[q['subject']], -q['year'], q['no']))
out = os.path.join(ROOT, 'data', 'pyq-bank.json')
json.dump({'subjects': list(SUBJ.values()), 'questions': qs}, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
c = collections.Counter((q['subject'], q['area']) for q in qs)
print(len(qs), 'questions;', len(c), 'areas')
