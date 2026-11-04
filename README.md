# da-site

Standalone GATE DA website (Next.js 16), split out of garden-of-eden.

```
app/        Next.js routes: / (trends), /pyq-bank, /mock, /exam, /notes, /notes/[slug], /cheatsheet
components/ Navbar, Footer, Logo, book/ (KaTeX block renderer)
features/   search/CommandPalette (Cmd+K over chapters and sections)
lib/        books.ts (types + chapter index), books.server.ts (reads data/chapters)
data/       generated JSON: index.json, chapters/, pyq-bank, pyq-analysis, syllabus-map
raw/        downloaded GateXAIML HTML notes (tools/fetch_gate_da.py)
images/     original figure files (copies are served from public/books/gate-da)
official/   official GATE 2026 and 2027 DA syllabus PDFs (served from public/gate-da)
source/     GATE_DA_Complete_PYQ_Book.pdf
public/     figures and syllabus PDFs served by the site
content/    cheatsheet/ (formula sheet, one file per subject), notes/ (Markdown chapters 61-81),
            solutions/ (worked PYQ solutions, one file per subject), studyplan.ts (12-week plan)
tools/      fetch_gate_da.py, build_gate_da.py (source notes), build_extra_notes.py (content/notes -> chapters),
            fix_notes.py, build_solutions.py, build_pyq_index.py, extract_pyq_images.py, build_syllabus_map.py,
            audit_notes.py / audit_math.mjs / audit_cheatsheet.mjs / audit_completeness.py / audit_dropped.py (quality checks)
```

Run: `npm install`, then `npm run dev` (or `npm run build && npm start`).
Not a git repo yet.

Notes pipeline: `build_gate_da.py` (chapters 1-60 from the source HTML) -> `fix_notes.py` -> `build_extra_notes.py` (chapters 61-81 from content/notes) -> `build_syllabus_map.py`. Check with the audit scripts.

PYQ data: `data/pyq-bank.json` (ids are year*100 + paper question number), `data/pyq-solutions.json` (built from content/solutions),
`data/pyq-notes.json` (hand-written notes shown with a question: cut-off source content, or a key that looks wrong).
Images in `public/pyq/` come from `source/` (gitignored) via `tools/extract_pyq_images.py`.
