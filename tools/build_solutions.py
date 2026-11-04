#!/usr/bin/env python3
"""Convert content/solutions/*.md into data/pyq-solutions.json.

Format: "## <question id>" starts a solution; each "- " bullet (or paragraph) is one step. Inline markup as in
content/notes ($math$, **bold**, `code`). A line "Answer: ..." ends the solution (kept as the last step, bold).
"""
import glob, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_extra_notes import inline

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bank = {q['id'] for q in json.load(open(os.path.join(ROOT, 'data', 'pyq-bank.json')))['questions']}
out, bad = {}, []
for f in sorted(glob.glob(os.path.join(ROOT, 'content', 'solutions', '*.md'))):
    for chunk in re.split(r'(?m)^## ', open(f, encoding='utf-8').read())[1:]:
        head, _, body = chunk.partition('\n')
        qid = head.strip()
        if qid not in bank: bad.append(qid); continue
        steps, cur = [], []
        for line in body.splitlines():
            if line.startswith('- '):
                if cur: steps.append(' '.join(cur))
                cur = [line[2:].strip()]
            elif line.strip() and cur and line.startswith('  '):
                cur.append(line.strip())
            elif line.strip():
                if cur: steps.append(' '.join(cur)); cur = []
                cur = [line.strip()]
            elif cur:
                steps.append(' '.join(cur)); cur = []
        if cur: steps.append(' '.join(cur))
        out[qid] = [inline(s) for s in steps]
json.dump(out, open(os.path.join(ROOT, 'data', 'pyq-solutions.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print(len(out), 'solutions;', 'unknown ids:', bad)
