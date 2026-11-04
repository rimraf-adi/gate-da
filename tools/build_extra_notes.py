#!/usr/bin/env python3
"""Convert hand-written Markdown notes in content/notes/*.md into the chapter JSON the reader uses.

Adds data/chapters/<num>-<slug>.json and updates data/index.json. Safe to re-run: chapters with the same
numbers are replaced. Run tools/audit_notes.py and tools/audit_math.mjs afterwards.

Markdown subset
  ---  front matter: num, title, tag  ---
  ## Section        starts a section (ids <num>.1, <num>.2, ...); text before the first ## is the intro
  ### Heading       sub-heading
  paragraphs, "- " bullets, "1. " numbered lists, | tables |, ``` code ```, $inline$ and $$display$$ math
  :::definition|example|concept|fact Title ... :::   boxes (no nesting)
  **bold**, *italic*, `code`
"""
import glob, json, math, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'content', 'notes')
OUT = os.path.join(ROOT, 'data', 'chapters')
BOXES = {'definition': ('definition', 'Definition'), 'example': ('example', 'Example'), 'concept': ('theorem', 'Concept'), 'fact': ('nuance', 'Fact')}
MATH = re.compile(r'((?<!\\)\$(?:\\.|[^$\\])+?\$)')


def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', re.sub(r'<[^>]+>|\$[^$]*\$', '', s).lower()).strip('-')


def inline(s):
    """Markdown-ish inline text to the reader's mini-markup. Math is protected first so **bold $x$ bold** works."""
    maths = []
    def stash(m):
        maths.append(m.group(1)); return f'\x00{len(maths) - 1}\x00'
    s = MATH.sub(stash, s)
    s = s.replace('<', '&lt;').replace('>', '&gt;')
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'(?<![\w*])\*([^*\s][^*]*?)\*(?![\w*])', r'<i>\1</i>', s)
    return re.sub(r'\x00(\d+)\x00', lambda m: maths[int(m.group(1))], s)


def parse_blocks(lines):
    blocks, i = [], 0
    n = len(lines)
    special = lambda l: l.startswith(('```', '$$', ':::', '### ', '## ', '|', '- ')) or re.match(r'\d+\. ', l)
    while i < n:
        line = lines[i].rstrip()
        if not line.strip():
            i += 1; continue
        if line.startswith('```'):
            j = i + 1
            while j < n and not lines[j].startswith('```'): j += 1
            blocks.append({'t': 'code', 'x': '\n'.join(lines[i + 1:j])}); i = j + 1; continue
        if line.startswith('$$'):
            buf = [line[2:]]
            j = i
            while not buf[-1].rstrip().endswith('$$'):
                j += 1; buf.append(lines[j])
            tex = '\n'.join(buf).rstrip()[:-2].strip()
            blocks.append({'t': 'math', 'x': tex}); i = j + 1; continue
        if line.startswith(':::'):
            kind, _, title = line[3:].strip().partition(' ')
            j = i + 1
            while j < n and lines[j].strip() != ':::': j += 1
            k, name = BOXES[kind]
            blocks.append({'t': 'box', 'kind': k, 'name': name, 'num': None, 'title': inline(title) or None, 'blocks': parse_blocks(lines[i + 1:j])})
            i = j + 1; continue
        if line.startswith('### '):
            x = inline(line[4:].strip())
            blocks.append({'t': 'h', 'level': 3, 'x': x, 'id': slugify(x)}); i += 1; continue
        if line.startswith('|'):
            rows = []
            while i < n and lines[i].startswith('|'):
                cells = [c.strip() for c in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r':?-{2,}:?', c) for c in cells): rows.append([inline(c) for c in cells])
                i += 1
            blocks.append({'t': 'table', 'rows': rows}); continue
        m = re.match(r'(- |\d+\. )', line)
        if m:
            ordered = m.group(1) != '- '
            items = []
            while i < n and re.match(r'(- |\d+\. )', lines[i]):
                body = [re.sub(r'^(- |\d+\. )', '', lines[i]).strip()]; i += 1
                while i < n and lines[i].startswith('  ') and lines[i].strip():
                    body.append(lines[i].strip()); i += 1
                items.append({'blocks': [{'t': 'p', 'x': inline(' '.join(body))}]})
            blocks.append({'t': 'list', 'ordered': ordered, 'style': None, 'desc': False, 'items': items}); continue
        buf = []
        while i < n and lines[i].strip() and not special(lines[i]):
            buf.append(lines[i].strip()); i += 1
        blocks.append({'t': 'p', 'x': inline(' '.join(buf))})
    return blocks


def text_of(o):
    if isinstance(o, str): return re.sub(r'<[^>]+>', ' ', o)
    if isinstance(o, dict): return ' '.join(text_of(v) for k, v in o.items() if k not in ('t', 'kind', 'name', 'id'))
    if isinstance(o, list): return ' '.join(text_of(v) for v in o)
    return ''


def build(path):
    raw = open(path, encoding='utf-8').read()
    fm, body = re.match(r'---\n(.*?)\n---\n(.*)', raw, re.S).groups()
    meta = dict(re.match(r'(\w+):\s*(.*)', l).groups() for l in fm.splitlines() if l.strip())
    num, title, tag = int(meta['num']), meta['title'], meta['tag']
    chunks = re.split(r'(?m)^## ', body)
    intro = parse_blocks(chunks[0].splitlines())
    sections = []
    for k, ch in enumerate(chunks[1:], 1):
        head, _, rest = ch.partition('\n')
        sections.append({'id': f'{num}.{k}', 'title': inline(head.strip()), 'blocks': parse_blocks(rest.splitlines())})
    words = len(re.findall(r'[A-Za-z0-9]+', text_of([intro, sections])))
    first = next((b['x'] for b in intro if b['t'] == 'p'), '')
    summary = re.sub(r'\s+', ' ', first)[:240] + ('…' if len(first) > 240 else '')
    tag_slug = {'Artificial Intelligence': 'ai'}.get(tag, slugify(tag))
    slug = f'{num:02d}-{tag_slug}-{slugify(title)[:46].rstrip("-")}'
    ch = {'book': 'gate-da', 'num': num, 'label': str(num), 'slug': slug, 'title': title, 'tag': tag, 'summary': summary,
          'wordCount': words, 'readingTimeMin': max(1, round(words / 230)), 'intro': intro, 'sections': sections, 'sectionCount': len(sections)}
    return ch


def main():
    chapters = [build(p) for p in sorted(glob.glob(os.path.join(SRC, '*.md')))]
    nums = {c['num'] for c in chapters}
    for f in glob.glob(os.path.join(OUT, '*.json')):
        if int(os.path.basename(f).split('-')[0]) in nums: os.remove(f)
    idx_path = os.path.join(ROOT, 'data', 'index.json')
    idx = json.load(open(idx_path))
    idx['chapters'] = [c for c in idx['chapters'] if c['num'] not in nums]
    for c in chapters:
        json.dump(c, open(os.path.join(OUT, c['slug'] + '.json'), 'w', encoding='utf-8'), ensure_ascii=False)
        meta = {k: v for k, v in c.items() if k not in ('intro', 'sections')}
        meta['sections'] = [{'id': s['id'], 'title': s['title']} for s in c['sections']]
        idx['chapters'].append(meta)
    idx['chapters'].sort(key=lambda c: c['num'])
    json.dump(idx, open(idx_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for c in chapters: print(f"ch{c['num']} {c['title']}: {c['wordCount']} words, {c['readingTimeMin']} min, {c['sectionCount']} sections")


if __name__ == '__main__':
    main()
