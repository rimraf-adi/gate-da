#!/usr/bin/env python3
"""Crop every question out of the GATE DA PYQ Book as an image.

Usage: python3 -I tools/extract_pyq_images.py        (needs pymupdf, pillow)
Reads  source/GATE_DA_Complete_PYQ_Book.pdf  (two-column question pages)
Writes public/pyq/<Q-id>.webp and data/pyq-images.json  ({id: {w, h}}).

Each question starts at a "▶ Area: Topic" block and ends at the next such block or heading in the same
column. Text that runs over into the next column or page is cropped and stitched underneath.
"""
import io, json, os, re
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, 'source', 'GATE_DA_Complete_PYQ_Book.pdf')
OUT = os.path.join(ROOT, 'public', 'pyq')
TOP, BOTTOM, MID, ZOOM, PAD = 40, 798, 297, 2.4, 3
HEAD = re.compile(r'^(▶|GATE 20\d\d \(|Part \d)')
QID = re.compile(r'Q(\d+)\.(\d+)\.(\d+)')

doc = pymupdf.open(PDF)
pieces = {}   # id -> [PIL images in reading order]
last = None   # id of the question a following column may continue
os.makedirs(OUT, exist_ok=True)


def shot(page, rect):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(ZOOM, ZOOM), clip=rect)
    return Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')


for pn, page in enumerate(doc):
    blocks = [b for b in page.get_text('blocks') if b[4].strip()]
    if any('[Key:' in b[4] for b in blocks) or not any(b[4].startswith('▶') for b in blocks):
        last = None  # answer-key tables and similar pages end any running question
        continue
    body = [b for b in blocks if TOP <= b[1] and b[3] <= BOTTOM and not re.fullmatch(r'\d+\s*', b[4])]
    draws = [d['rect'] for d in page.get_drawings() if TOP < d['rect'].y0 and d['rect'].y1 < BOTTOM and d['rect'].width < 300]
    new_chapter = any(re.match(r'Part \d', b[4]) for b in body)
    for col, (x0, x1) in enumerate(((0, MID), (MID, page.rect.width))):
        cb = sorted([b for b in body if (b[0] < MID) == (col == 0)], key=lambda b: b[1])
        cd = [r for r in draws if (r.x0 < MID) == (col == 0)]
        starts = [b for b in cb if HEAD.match(b[4])]
        col_bottom = max([b[3] for b in cb] + [r.y1 for r in cd] + [TOP])
        # leading text before the first heading continues the previous question
        first = starts[0][1] if starts else col_bottom + 1
        lead = [b for b in cb if b[1] < first]
        if lead and last and not new_chapter:
            bottom = max([b[3] for b in lead] + [r.y1 for r in cd if r.y0 < first] + [TOP])
            pieces[last].append(shot(page, pymupdf.Rect(x0 + 38 if col == 0 else x0 + 12, TOP, 309 if col == 0 else x1 - 38, min(bottom + PAD, first - 2))))
        for i, s in enumerate(starts):
            if not s[4].startswith('▶'):
                last = None
                continue
            end = starts[i + 1][1] - 3 if i + 1 < len(starts) else col_bottom + PAD
            text = ' '.join(b[4] for b in cb if s[1] <= b[1] < end)
            m = QID.search(text)
            if not m:
                continue
            qid = m.group(0)
            pieces[qid] = [shot(page, pymupdf.Rect(x0 + 38 if col == 0 else x0 + 12, s[1] - PAD, 309 if col == 0 else x1 - 38, min(end, BOTTOM)))]
            last = qid

sizes = {}
for qid, imgs in pieces.items():
    w = max(i.width for i in imgs)
    canvas = Image.new('RGB', (w, sum(i.height for i in imgs)), 'white')
    y = 0
    for i in imgs:
        canvas.paste(i, (0, y)); y += i.height
    canvas.save(os.path.join(OUT, qid + '.webp'), quality=88, method=6)
    sizes[qid] = {'w': canvas.width, 'h': canvas.height}
json.dump(sizes, open(os.path.join(ROOT, 'data', 'pyq-images.json'), 'w'), indent=0)
bank = {q['id'] for q in json.load(open(os.path.join(ROOT, 'data', 'pyq-bank.json')))['questions']}
print(len(sizes), 'images;', 'missing:', sorted(bank - set(sizes))[:10], 'extra:', sorted(set(sizes) - bank)[:5])
