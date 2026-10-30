# da-site

Standalone GATE DA website (Next.js 16), split out of garden-of-eden.

```
app/        Next.js routes: / (trends), /pyq-bank, /notes, /notes/[slug]
components/ Navbar, Footer, Logo, book/ (KaTeX block renderer)
features/   search/CommandPalette (Cmd+K over chapters and sections)
lib/        books.ts (types + chapter index), books.server.ts (reads data/chapters)
data/       generated JSON: index.json, chapters/, pyq-bank, pyq-analysis, syllabus-map
raw/        downloaded GateXAIML HTML notes (tools/fetch_gate_da.py)
images/     original figure files (copies are served from public/books/gate-da)
official/   official GATE 2026 and 2027 DA syllabus PDFs (served from public/gate-da)
source/     GATE_DA_Complete_PYQ_Book.pdf
public/     figures and syllabus PDFs served by the site
tools/      fetch_gate_da.py, build_gate_da.py, build_pyq_index.py, build_syllabus_map.py
```

Run: `npm install`, then `npm run dev` (or `npm run build && npm start`).
Not a git repo yet.
