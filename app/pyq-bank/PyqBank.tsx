'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, Eye, EyeOff, Shuffle, RotateCcw, Flag, Search, SlidersHorizontal } from 'lucide-react';

type Q = { id: string; no: number; subject: string; year: number; type: string; marks: number; area: string; topic: string; key: string };
type Status = 'solved' | 'review';
const KEY = 'gate-da-pyq-v1';
const chip = (on: boolean) => `rounded-full border px-3 py-1 text-xs ${on ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'}`;

export default function PyqBank({ questions, subjects, sizes }: { questions: Q[]; subjects: string[]; sizes: Record<string, { w: number; h: number }> }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState(false);
  const [q, setQ] = useState('');
  const [subject, setSubject] = useState('All');
  const [years, setYears] = useState<number[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [marks, setMarks] = useState<number[]>([]);
  const [show, setShow] = useState<'all' | 'todo' | 'review' | 'solved'>('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);

  useEffect(() => { try { setStatus(JSON.parse(localStorage.getItem(KEY) ?? '{}')); } catch {} }, []);
  const mark = (id: string, s: Status) => setStatus((p) => {
    const n = { ...p }; if (n[id] === s) delete n[id]; else n[id] = s;
    try { localStorage.setItem(KEY, JSON.stringify(n)); } catch {}
    return n;
  });
  const toggleIn = <T,>(arr: T[], v: T, set: (a: T[]) => void) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const needle = q.trim().toLowerCase();
  const base = (x: Q) =>
    (!years.length || years.includes(x.year)) && (!types.length || types.includes(x.type)) && (!marks.length || marks.includes(x.marks)) &&
    (!needle || `${x.topic} ${x.area}`.toLowerCase().includes(needle)) &&
    (show === 'all' || (show === 'todo' ? !status[x.id] : status[x.id] === show));
  const inScope = questions.filter(base);
  const list = inScope.filter((x) => subject === 'All' || x.subject === subject);
  const solvedAll = questions.filter((x) => status[x.id] === 'solved').length;

  const grouped = useMemo(() => {
    const out: { subject: string; areas: { area: string; marks: number; topics: { topic: string; qs: Q[] }[] }[] }[] = [];
    for (const s of subjects) {
      const sq = list.filter((x) => x.subject === s);
      if (!sq.length) continue;
      const areas = [...new Set(sq.map((x) => x.area))].map((area) => {
        const aq = sq.filter((x) => x.area === area);
        return { area, marks: aq.reduce((a, x) => a + x.marks, 0), topics: [...new Set(aq.map((x) => x.topic))].map((topic) => ({ topic, qs: aq.filter((x) => x.topic === topic).sort((a, b) => b.year - a.year) })) };
      }).sort((a, b) => b.marks - a.marks);
      out.push({ subject: s, areas });
    }
    return out;
  }, [list, subjects]);

  const random = () => {
    const pool = list.filter((x) => !status[x.id]); const from = pool.length ? pool : list;
    if (!from.length) return;
    const pick = from[Math.floor(Math.random() * from.length)];
    setFocus(pick.id);
    setExpanded((e) => ({ ...e, [pick.id]: true }));
    setTimeout(() => document.getElementById(pick.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  };
  const reset = () => { setQ(''); setSubject('All'); setYears([]); setTypes([]); setMarks([]); setShow('all'); };
  const filtered = !!(q || subject !== 'All' || years.length || types.length || marks.length || show !== 'all');

  const sidebar = (
    <div className="space-y-5 text-sm">
      <label className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 px-3 py-2">
        <Search className="h-4 w-4 text-zinc-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search topics, e.g. Poisson or A*" className="flex-1 bg-transparent outline-none" />
      </label>
      <div>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">Subject</p>
        <ul className="space-y-0.5">
          {['All', ...subjects].map((s) => {
            const n = s === 'All' ? inScope.length : inScope.filter((x) => x.subject === s).length;
            const sol = (s === 'All' ? questions : questions.filter((x) => x.subject === s)).filter((x) => status[x.id] === 'solved').length;
            const tot = (s === 'All' ? questions : questions.filter((x) => x.subject === s)).length;
            return (
              <li key={s}>
                <button onClick={() => setSubject(s)} className={`w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left ${subject === s ? 'bg-amber-500/10 text-amber-800 dark:text-amber-200' : 'hover:bg-zinc-100 dark:hover:bg-white/5'}`}>
                  <span className="truncate">{s}</span>
                  <span className="font-mono text-[11px] text-zinc-500 shrink-0">{sol}/{tot} · {n}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div><p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">Year</p>
        <div className="flex flex-wrap gap-1.5">{[2026, 2025, 2024].map((y) => <button key={y} onClick={() => toggleIn(years, y, setYears)} aria-pressed={years.includes(y)} className={chip(years.includes(y))}>{y}</button>)}</div></div>
      <div><p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">Type</p>
        <div className="flex flex-wrap gap-1.5">{['MCQ', 'MSQ', 'NAT'].map((t) => <button key={t} onClick={() => toggleIn(types, t, setTypes)} aria-pressed={types.includes(t)} className={chip(types.includes(t))}>{t}</button>)}</div></div>
      <div><p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">Marks</p>
        <div className="flex flex-wrap gap-1.5">{[1, 2].map((m) => <button key={m} onClick={() => toggleIn(marks, m, setMarks)} aria-pressed={marks.includes(m)} className={chip(marks.includes(m))}>{m} mark</button>)}</div></div>
      <div><p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">My progress</p>
        <div className="flex flex-wrap gap-1.5">{([['all', 'All'], ['todo', 'Not attempted'], ['review', 'Review'], ['solved', 'Solved']] as const).map(([v, l]) => <button key={v} onClick={() => setShow(v)} aria-pressed={show === v} className={chip(show === v)}>{l}</button>)}</div></div>
      {filtered && <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"><RotateCcw className="h-3 w-3" /> Clear filters</button>}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[17rem_1fr] lg:gap-8">
      <aside className="hidden lg:block"><div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">{sidebar}</div></aside>
      <div className="lg:hidden mb-4">
        <button onClick={() => setFiltersOpen(!filtersOpen)} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 px-4 py-2 text-sm"><SlidersHorizontal className="h-4 w-4" /> Filters{filtered ? ' (on)' : ''}</button>
        {filtersOpen && <div className="mt-3 rounded-2xl border border-zinc-200 dark:border-white/10 p-4">{sidebar}</div>}
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 px-4 py-3">
          <div>
            <p className="font-serif text-lg">{list.length} question{list.length === 1 ? '' : 's'}</p>
            <p className="text-xs text-zinc-500">{solvedAll} of {questions.length} solved overall · {list.reduce((a, x) => a + x.marks, 0)} marks in view</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={random} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white px-3.5 py-1.5 text-sm font-medium"><Shuffle className="h-3.5 w-3.5" /> Random unattempted</button>
            <button onClick={() => setShowAll(!showAll)} aria-pressed={showAll} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/10 px-3.5 py-1.5 text-sm">
              {showAll ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />} {showAll ? 'Hide all keys' : 'Show all keys'}
            </button>
          </div>
        </div>
        <p className="mt-2 text-xs text-zinc-500">Click a question to open it, attempt it, then reveal the key to check. Keys are hidden by default so you can self-test.</p>

        {grouped.length === 0 && <p className="mt-10 text-sm text-zinc-500">No questions match these filters. <button onClick={reset} className="underline">Clear filters</button></p>}
        <div className="mt-5 space-y-10">
          {grouped.map((g) => (
            <section key={g.subject}>
              {subject === 'All' && <h2 className="font-serif text-2xl mb-3">{g.subject}</h2>}
              <div className="space-y-3">
                {g.areas.map((a) => (
                  <details key={a.area} open={needle !== ''} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-4">
                    <summary className="cursor-pointer font-medium">{a.area} <span className="ml-2 font-mono text-xs text-zinc-500">{a.topics.reduce((n, t) => n + t.qs.length, 0)} Qs · {a.marks}M</span></summary>
                    <div className="mt-3 grid gap-1.5">
                      {a.topics.flatMap((t) => t.qs).sort((p, q2) => q2.year - p.year || q2.marks - p.marks).map((x) => {
                              const open = showAll || revealed[x.id];
                              const st = status[x.id];
                              const isOpen = !!expanded[x.id];
                              const dim = sizes[x.id];
                              return (
                                <div key={x.id} id={x.id} className={`rounded-lg border text-xs transition-colors ${focus === x.id ? 'border-amber-500 bg-amber-500/10' : st === 'solved' ? 'border-emerald-500/30 bg-emerald-500/5' : st === 'review' ? 'border-amber-500/40 bg-amber-500/5' : 'border-zinc-200 dark:border-white/10'}`}>
                                  <div className="flex items-center gap-1.5 pr-2">
                                    <button onClick={() => setExpanded((e) => ({ ...e, [x.id]: !e[x.id] }))} aria-expanded={isOpen} aria-controls={`img-${x.id}`}
                                      className="flex flex-1 min-w-0 items-center gap-3 px-3 py-2.5 text-left hover:bg-zinc-100/60 dark:hover:bg-white/5 rounded-l-lg">
                                      <ChevronDown className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : '-rotate-90'}`} />
                                      <span className="font-mono text-sm font-medium whitespace-nowrap">{x.year} · Q{x.no} · {x.type} · {x.marks}M</span>
                                      {!isOpen && <span className="hidden sm:inline text-zinc-400">Click to view question</span>}
                                    </button>
                                    <button onClick={() => mark(x.id, 'review')} aria-pressed={st === 'review'} title="Mark for review" className={`rounded-md border p-1.5 ${st === 'review' ? 'border-amber-500 text-amber-600' : 'border-zinc-200 dark:border-white/10 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}><Flag className="h-3.5 w-3.5" /></button>
                                    <button onClick={() => mark(x.id, 'solved')} aria-pressed={st === 'solved'} title="Mark solved" className={`rounded-md border p-1.5 ${st === 'solved' ? 'border-emerald-500 text-emerald-600' : 'border-zinc-200 dark:border-white/10 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}><Check className="h-3.5 w-3.5" /></button>
                                  </div>
                                  {isOpen && (
                                    <div id={`img-${x.id}`} className="border-t border-zinc-200 dark:border-white/10 p-3 space-y-3">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={`/pyq/${x.id}.webp`} alt={`GATE DA ${x.year} question ${x.no}, ${x.area}`} width={dim?.w} height={dim?.h} loading="lazy"
                                        className="w-full max-w-xl h-auto rounded-md bg-white border border-zinc-200" />
                                      <div className="flex flex-wrap items-center gap-2">
                                        <button onClick={() => setRevealed((r) => ({ ...r, [x.id]: !r[x.id] }))} className="rounded-md border border-zinc-300 dark:border-white/15 px-3 py-1 font-mono hover:border-amber-500">
                                          {open ? <>Key: <span className="text-amber-700 dark:text-amber-300 font-semibold">{x.key}</span></> : 'Reveal answer key'}
                                        </button>
                                        <button onClick={() => mark(x.id, 'solved')} className="rounded-md border border-zinc-300 dark:border-white/15 px-3 py-1 hover:border-emerald-500">{st === 'solved' ? 'Solved ✓' : 'Mark solved'}</button>
                                        <button onClick={() => mark(x.id, 'review')} className="rounded-md border border-zinc-300 dark:border-white/15 px-3 py-1 hover:border-amber-500">{st === 'review' ? 'In review list' : 'Review later'}</button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                      })}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
