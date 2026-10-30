'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, Search, Flame, AlertTriangle, Play } from 'lucide-react';

type Ch = { num: number; slug: string; title: string; label: string; min: number; pyqMarks: number; topics: number; sections: { id: string; title: string }[] };
type Group = { tag: string; chapters: Ch[] };
const DONE_KEY = 'gate-da-notes-done-v1';
const LAST_KEY = 'gate-da-last-chapter';

export default function NotesExplorer({ groups, missing }: { groups: Group[]; missing: { tag: string; marks: number }[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [last, setLast] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [subject, setSubject] = useState('All');
  const [hotOnly, setHotOnly] = useState(false);
  const [sort, setSort] = useState<'syllabus' | 'marks'>('syllabus');
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(DONE_KEY) ?? '{}'));
      setLast(localStorage.getItem(LAST_KEY));
    } catch {}
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') { e.preventDefault(); search.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggle = (slug: string) => setDone((d) => {
    const n = { ...d, [slug]: !d[slug] };
    try { localStorage.setItem(DONE_KEY, JSON.stringify(n)); } catch {}
    return n;
  });

  const all = useMemo(() => groups.flatMap((g) => g.chapters), [groups]);
  const lastCh = all.find((c) => c.slug === last);
  const nextUp = all.find((c) => !done[c.slug]);
  const doneCount = all.filter((c) => done[c.slug]).length;
  const doneMin = all.filter((c) => done[c.slug]).reduce((a, c) => a + c.min, 0);
  const totalMin = all.reduce((a, c) => a + c.min, 0);
  const hot = (c: Ch) => c.pyqMarks >= 12;
  const thin = (c: Ch) => c.min <= 2 && c.pyqMarks > 0;

  const needle = q.trim().toLowerCase();
  const view = groups
    .filter((g) => subject === 'All' || g.tag === subject)
    .map((g) => {
      let cs = g.chapters.filter((c) => (!hotOnly || hot(c)) && (!needle || c.title.toLowerCase().includes(needle) || c.sections.some((s) => s.title.toLowerCase().includes(needle))));
      if (sort === 'marks') cs = [...cs].sort((a, b) => b.pyqMarks - a.pyqMarks);
      return { ...g, chapters: cs };
    })
    .filter((g) => g.chapters.length);

  return (
    <div>
      {/* progress strip */}
      <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-serif text-xl">{doneCount} of {all.length} chapters done</p>
            <p className="text-xs text-zinc-500">{Math.round(doneMin / 60 * 10) / 10}h of {Math.round(totalMin / 60 * 10) / 10}h reading</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {lastCh && (
              <Link href={`/notes/${lastCh.slug}`} className="inline-flex items-center gap-2 rounded-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 text-sm font-medium">
                <Play className="h-3.5 w-3.5" /> Continue: {lastCh.title}
              </Link>
            )}
            {nextUp && nextUp.slug !== lastCh?.slug && (
              <Link href={`/notes/${nextUp.slug}`} className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-white/15 px-4 py-2 text-sm hover:border-amber-500">
                Next unread: {nextUp.title}
              </Link>
            )}
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-zinc-200 dark:bg-white/10"><div className="h-2 rounded-full bg-amber-500 transition-all" style={{ width: `${all.length ? (doneCount / all.length) * 100 : 0}%` }} /></div>
      </div>

      {/* controls */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 px-3 py-1.5 text-sm flex-1 min-w-56">
          <Search className="h-4 w-4 text-zinc-400" />
          <input ref={search} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter chapters and sections…  ( / )" className="flex-1 bg-transparent outline-none" />
        </label>
        <button onClick={() => setHotOnly(!hotOnly)} aria-pressed={hotOnly} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm ${hotOnly ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-200 dark:border-white/10'}`}>
          <Flame className="h-3.5 w-3.5 text-amber-500" /> High-yield only
        </button>
        <button onClick={() => setSort(sort === 'syllabus' ? 'marks' : 'syllabus')} className="rounded-full border border-zinc-200 dark:border-white/10 px-3 py-1.5 text-sm">
          Sort: {sort === 'syllabus' ? 'syllabus order' : 'PYQ marks'}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
        {['All', ...groups.map((g) => g.tag)].map((t) => (
          <button key={t} onClick={() => setSubject(t)} className={`rounded-full border px-3 py-1 ${subject === t ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400'}`}>{t}</button>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        <Flame className="inline h-3 w-3 text-amber-500" /> High-yield = chapter covers topics worth 12+ marks across the 2024–26 papers.{' '}
        <AlertTriangle className="inline h-3 w-3 text-rose-500" /> Thin = one or two minutes of notes on a topic that is asked.
      </p>

      {/* subjects */}
      <div className="mt-6 grid md:grid-cols-2 gap-5">
        {view.map((g) => {
          const gd = g.chapters.filter((c) => done[c.slug]).length;
          const gAll = groups.find((x) => x.tag === g.tag)!.chapters;
          const gDone = gAll.filter((c) => done[c.slug]).length;
          return (
            <section key={g.tag} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5 self-start">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-serif text-xl">{g.tag}</h2>
                <span className="font-mono text-xs text-zinc-500">{gDone}/{gAll.length}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-zinc-200 dark:bg-white/10"><div className="h-1.5 rounded-full bg-amber-500 transition-all" style={{ width: `${(gDone / gAll.length) * 100}%` }} /></div>
              <ol className="mt-3 space-y-1">
                {g.chapters.map((c) => {
                  const isOpen = open[c.slug] || (!!needle && c.sections.some((s) => s.title.toLowerCase().includes(needle)));
                  return (
                    <li key={c.slug} className="rounded-lg">
                      <div className="flex items-center gap-2 group">
                        <button onClick={() => toggle(c.slug)} aria-label={done[c.slug] ? 'Mark as unread' : 'Mark as read'} aria-pressed={!!done[c.slug]}
                          className={`h-5 w-5 shrink-0 rounded-md border flex items-center justify-center ${done[c.slug] ? 'bg-amber-500 border-amber-500 text-white' : 'border-zinc-300 dark:border-white/20 hover:border-amber-500'}`}>
                          {done[c.slug] && <Check className="h-3.5 w-3.5" />}
                        </button>
                        <Link href={`/notes/${c.slug}`} className={`flex-1 min-w-0 flex items-center gap-2 py-1.5 text-sm hover:text-amber-700 dark:hover:text-amber-300 ${done[c.slug] ? 'text-zinc-500 line-through decoration-zinc-400/50' : ''}`}>
                          <span className="font-mono text-xs text-zinc-500 w-5 shrink-0">{c.label}</span>
                          <span className="truncate">{c.title}</span>
                          {hot(c) && <Flame className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-label="High-yield" />}
                          {thin(c) && <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-500" aria-label="Thin notes" />}
                        </Link>
                        <span className="font-mono text-[11px] text-zinc-500 shrink-0" title="PYQ marks over 2024–26 for topics taught here">{c.pyqMarks ? `${c.pyqMarks}M` : '–'}</span>
                        <span className="font-mono text-[11px] text-zinc-500 w-8 text-right shrink-0">{c.min}m</span>
                        <button onClick={() => setOpen((o) => ({ ...o, [c.slug]: !isOpen }))} aria-label="Show sections" aria-expanded={isOpen} className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {isOpen && (
                        <ul className="ml-7 mb-2 border-l border-zinc-200 dark:border-white/10 pl-3 space-y-0.5 text-xs">
                          {c.sections.map((s) => (
                            <li key={s.id + s.title}>
                              <Link href={`/notes/${c.slug}#sec-${s.id}`} className={`block py-0.5 hover:text-amber-700 dark:hover:text-amber-300 ${needle && s.title.toLowerCase().includes(needle) ? 'text-amber-700 dark:text-amber-300 font-medium' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                <span className="font-mono text-zinc-400 mr-1.5">{s.id}</span>{s.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ol>
              {gd === 0 && g.chapters.length === 0 && <p className="text-xs text-zinc-500">No chapters match.</p>}
            </section>
          );
        })}
        {subject === 'All' && !needle && !hotOnly ? missing.map((m) => (
          <section key={m.tag} className="rounded-2xl border border-dashed border-rose-400/50 p-5 self-start">
            <h2 className="font-serif text-xl">{m.tag}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">No notes yet. About {m.marks}M a paper in 2024–26.</p>
          </section>
        )) : null}
      </div>
      {view.length === 0 && <p className="mt-8 text-sm text-zinc-500">No chapters match “{q}”.</p>}
    </div>
  );
}
