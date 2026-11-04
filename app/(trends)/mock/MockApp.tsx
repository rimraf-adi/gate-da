'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Flag, Clock, Play, RotateCcw, Eraser } from 'lucide-react';
import MathText from '@/components/book/MathText';
import { attempted, keyText, score, type Answer, type Q } from '@/lib/scoring';

type Sizes = Record<string, { w: number; h: number }>;
type Mode = { kind: 'paper'; year: number } | { kind: 'drill'; subject: string; n: number };
type Attempt = { label: string; score: number; max: number; at: string; seconds: number };
const HISTORY = 'gate-da-mock-attempts-v1';
const fmt = (s: number) => `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const btn = 'rounded-full border border-zinc-300 dark:border-white/15 px-4 py-2 text-sm hover:border-amber-500';

export default function MockApp({ questions, subjects, sizes, solutions, notes }: { questions: Q[]; subjects: string[]; sizes: Sizes; solutions: Record<string, string[]>; notes: Record<string, string> }) {
  const [solShown, setSolShown] = useState<Record<string, boolean>>({});
  const [phase, setPhase] = useState<'setup' | 'run' | 'result'>('setup');
  const [mode, setMode] = useState<Mode | null>(null);
  const [set, setSet] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [cur, setCur] = useState(0);
  const [left, setLeft] = useState(0);
  const [history, setHistory] = useState<Attempt[]>([]);
  const [drillSubject, setDrillSubject] = useState(subjects[0]);
  const [drillN, setDrillN] = useState(10);
  const [showImg, setShowImg] = useState<Record<string, boolean>>({});
  const endAt = useRef(0);
  const started = useRef(0);
  const total = useRef(0);

  useEffect(() => { try { setHistory(JSON.parse(localStorage.getItem(HISTORY) ?? '[]')); } catch {} }, []);

  const start = (m: Mode) => {
    let qs: Q[];
    if (m.kind === 'paper') qs = questions.filter((q) => q.year === m.year).sort((a, b) => a.no - b.no);
    else {
      const pool = questions.filter((q) => q.subject === m.subject);
      qs = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(m.n, pool.length));
    }
    const secs = m.kind === 'paper' ? 3 * 3600 : Math.round(qs.length * 2.77 * 60);
    total.current = secs; started.current = Date.now(); endAt.current = Date.now() + secs * 1000;
    setMode(m); setSet(qs); setAnswers({}); setMarked({}); setVisited({ [qs[0].id]: true }); setCur(0); setLeft(secs); setShowImg({}); setPhase('run');
  };

  const finish = useCallback(() => {
    setPhase('result');
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (phase !== 'run') return;
    const t = setInterval(() => {
      const l = Math.max(0, Math.round((endAt.current - Date.now()) / 1000));
      setLeft(l);
      if (l === 0) finish();
    }, 1000);
    return () => clearInterval(t);
  }, [phase, finish]);

  const results = useMemo(() => set.map((q) => ({ q, ...score(q, answers[q.id]) })), [set, answers]);
  const totalScore = results.reduce((a, r) => a + r.points, 0);
  const maxScore = set.reduce((a, q) => a + q.marks, 0);

  useEffect(() => {
    if (phase !== 'result' || !mode) return;
    const a: Attempt = {
      label: mode.kind === 'paper' ? `GATE DA ${mode.year}` : `${mode.subject}, ${set.length} questions`,
      score: Math.round(totalScore * 100) / 100, max: maxScore, at: new Date().toISOString(), seconds: Math.min(total.current, Math.round((Date.now() - started.current) / 1000)),
    };
    setHistory((h) => {
      const n = [a, ...h].slice(0, 20);
      try { localStorage.setItem(HISTORY, JSON.stringify(n)); } catch {}
      return n;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const q = set[cur];
  const go = (i: number) => { const n = Math.max(0, Math.min(set.length - 1, i)); setCur(n); setVisited((v) => ({ ...v, [set[n].id]: true })); };
  const setAns = (a: Answer) => setAnswers((x) => ({ ...x, [q.id]: a }));
  const toggleOpt = (l: string) => {
    const now = (answers[q.id] as string[]) ?? [];
    if (q.type === 'MCQ') setAns([l]);
    else setAns(now.includes(l) ? now.filter((x) => x !== l) : [...now, l].sort());
  };

  // ---------------- setup ----------------
  if (phase === 'setup') {
    return (
      <div className="space-y-10">
        <section>
          <h2 className="font-serif text-2xl mb-3">Full papers</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[2026, 2025, 2024].map((y) => {
              const best = history.filter((h) => h.label === `GATE DA ${y}`).sort((a, b) => b.score - a.score)[0];
              return (
                <div key={y} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5">
                  <p className="font-mono text-xs text-zinc-500">{y === 2026 ? 'IIT Guwahati' : y === 2025 ? 'IIT Roorkee' : 'IISc Bengaluru'}</p>
                  <h3 className="font-serif text-xl">GATE DA {y}</h3>
                  <p className="mt-1 text-sm text-zinc-500">65 questions · 100 marks · 3 hours</p>
                  {best && <p className="mt-1 text-xs text-zinc-500">Best so far: {best.score} / {best.max}</p>}
                  <button onClick={() => start({ kind: 'paper', year: y })} className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 text-sm font-medium"><Play className="h-3.5 w-3.5" /> Start paper</button>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-zinc-500">Marked with the real scheme: MCQ wrong answers cost one third of the marks; MSQ and NAT have no negative marking, and MSQ gives no partial credit. The timer runs for the full three hours and the paper submits itself at zero.</p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-3">Subject drill</h2>
          <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5 flex flex-wrap items-end gap-4">
            <label className="text-sm">Subject<br />
              <select value={drillSubject} onChange={(e) => setDrillSubject(e.target.value)} className="mt-1 rounded-lg border border-zinc-300 dark:border-white/15 bg-transparent px-2 py-1.5">
                {subjects.map((s) => <option key={s} className="text-zinc-900">{s}</option>)}
              </select>
            </label>
            <label className="text-sm">Questions<br />
              <select value={drillN} onChange={(e) => setDrillN(Number(e.target.value))} className="mt-1 rounded-lg border border-zinc-300 dark:border-white/15 bg-transparent px-2 py-1.5">
                {[5, 10, 15, 20].map((n) => <option key={n} className="text-zinc-900">{n}</option>)}
              </select>
            </label>
            <button onClick={() => start({ kind: 'drill', subject: drillSubject, n: drillN })} className={btn}>Start drill</button>
            <p className="text-xs text-zinc-500">Random questions from that subject across 2024–26, timed at about 2 min 45 s each.</p>
          </div>
        </section>

        {history.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl mb-3">Your attempts</h2>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100/70 dark:bg-white/5"><tr>{['Test', 'Score', 'Time used', 'Date'].map((h) => <th key={h} className="px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wider text-zinc-500">{h}</th>)}</tr></thead>
                <tbody>{history.map((h, i) => (
                  <tr key={i} className="border-t border-zinc-200 dark:border-white/10"><td className="px-3 py-2">{h.label}</td><td className="px-3 py-2 font-mono">{h.score} / {h.max}</td><td className="px-3 py-2 font-mono">{fmt(h.seconds)}</td><td className="px-3 py-2 text-zinc-500">{new Date(h.at).toLocaleDateString()}</td></tr>
                ))}</tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    );
  }

  // ---------------- result ----------------
  if (phase === 'result') {
    const bySubject = subjects.map((s) => {
      const r = results.filter((x) => x.q.subject === s);
      return { s, got: r.reduce((a, x) => a + x.points, 0), max: r.reduce((a, x) => a + x.q.marks, 0), n: r.length, ok: r.filter((x) => x.verdict === 'correct' || x.verdict === 'awarded').length };
    }).filter((x) => x.n);
    const byType = ['MCQ', 'MSQ', 'NAT'].map((t) => {
      const r = results.filter((x) => x.q.type === t);
      return { t, n: r.length, ok: r.filter((x) => x.verdict === 'correct' || x.verdict === 'awarded').length, wrong: r.filter((x) => x.verdict === 'wrong').length, skip: r.filter((x) => x.verdict === 'skipped').length };
    }).filter((x) => x.n);
    const negative = results.filter((r) => r.points < 0).reduce((a, r) => a + r.points, 0);
    return (
      <div className="space-y-8">
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6">
          <p className="font-mono text-xs text-zinc-500">{mode?.kind === 'paper' ? `GATE DA ${mode.year}` : `${mode?.subject} drill`}</p>
          <p className="mt-1 font-serif text-4xl">{(Math.round(totalScore * 100) / 100).toFixed(2)} <span className="text-xl text-zinc-500">/ {maxScore}</span></p>
          <p className="mt-1 text-sm text-zinc-500">Time used {fmt(Math.min(total.current, Math.round((Date.now() - started.current) / 1000)))}{negative < 0 ? ` · negative marks ${negative.toFixed(2)}` : ''}</p>
          <button onClick={() => setPhase('setup')} className={`${btn} mt-4 inline-flex items-center gap-2`}><RotateCcw className="h-3.5 w-3.5" /> Back to tests</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
            <table className="w-full text-sm">
              <caption className="px-3 py-2 text-left font-serif text-lg">By subject</caption>
              <tbody>{bySubject.map((x) => <tr key={x.s} className="border-t border-zinc-200 dark:border-white/10"><td className="px-3 py-2">{x.s}</td><td className="px-3 py-2 font-mono text-right">{(Math.round(x.got * 100) / 100)} / {x.max}</td><td className="px-3 py-2 font-mono text-xs text-zinc-500 text-right">{x.ok}/{x.n} right</td></tr>)}</tbody>
            </table>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
            <table className="w-full text-sm">
              <caption className="px-3 py-2 text-left font-serif text-lg">By type</caption>
              <tbody>{byType.map((x) => <tr key={x.t} className="border-t border-zinc-200 dark:border-white/10"><td className="px-3 py-2">{x.t}</td><td className="px-3 py-2 font-mono text-xs">{x.ok} right · {x.wrong} wrong · {x.skip} skipped</td></tr>)}</tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl mb-3">Review</h2>
          <ul className="space-y-2">
            {results.map((r, i) => {
              const a = answers[r.q.id];
              const given = !attempted(r.q, a) ? '—' : r.q.type === 'NAT' ? String(a) : (a as string[]).join(', ');
              const colour = r.verdict === 'correct' || r.verdict === 'awarded' ? 'border-emerald-500/40 bg-emerald-500/5' : r.verdict === 'wrong' ? 'border-rose-500/40 bg-rose-500/5' : 'border-zinc-200 dark:border-white/10';
              return (
                <li key={r.q.id} className={`rounded-xl border p-3 text-sm ${colour}`}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-mono font-medium">{i + 1}.</span>
                    <span className="font-mono text-xs text-zinc-500">{r.q.type} · {r.q.marks}M · {r.q.area}</span>
                    <span className="ml-auto font-mono text-xs">{r.verdict === 'skipped' ? 'skipped' : r.verdict === 'awarded' ? 'marks to all' : r.verdict} · {r.points > 0 ? '+' : ''}{Math.round(r.points * 100) / 100}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Your answer: <b>{given}</b> · Key: <b>{keyText(r.q)}</b></p>
                  <button onClick={() => setShowImg((s) => ({ ...s, [r.q.id]: !s[r.q.id] }))} className="mt-1 text-xs underline">{showImg[r.q.id] ? 'Hide question' : 'Show question'}</button>
                  {solutions[r.q.id] && <button onClick={() => setSolShown((s) => ({ ...s, [r.q.id]: !s[r.q.id] }))} className="mt-1 ml-3 text-xs underline">{solShown[r.q.id] ? 'Hide solution' : 'Show solution'}</button>}
                  {solutions[r.q.id] && solShown[r.q.id] && (
                    <ol className="mt-2 space-y-1.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3 text-sm list-decimal pl-7">
                      {solutions[r.q.id].map((s, i) => <li key={i}><MathText x={s} /></li>)}
                    </ol>
                  )}
                  {showImg[r.q.id] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/pyq/${r.q.id}.webp`} alt={`Question ${r.q.no}`} width={sizes[r.q.id]?.w} height={sizes[r.q.id]?.h} loading="lazy" className="mt-2 w-full max-w-xl h-auto rounded-md bg-white border border-zinc-200" />
                  )}
                  {showImg[r.q.id] && notes[r.q.id] && <p className="mt-2 max-w-xl rounded-md border border-amber-500/40 bg-amber-500/5 px-3 py-2 text-xs">Note: {notes[r.q.id]}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  // ---------------- run ----------------
  const opts = ['A', 'B', 'C', 'D'];
  const status = (x: Q) => {
    const a = attempted(x, answers[x.id]); const m = marked[x.id];
    if (a && m) return 'bg-violet-600 text-white';
    if (m) return 'bg-violet-300 text-violet-950';
    if (a) return 'bg-emerald-600 text-white';
    if (visited[x.id]) return 'bg-rose-500/80 text-white';
    return 'bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300';
  };
  const answered = set.filter((x) => attempted(x, answers[x.id])).length;
  return (
    <div className="lg:grid lg:grid-cols-[1fr_16rem] lg:gap-6">
      <div>
        <div className="sticky top-16 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-2 bg-[#fafafc]/90 dark:bg-[#08090d]/90 backdrop-blur flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-white/10">
          <span className="font-mono text-sm">Question {cur + 1} of {set.length}</span>
          <span className={`inline-flex items-center gap-1.5 font-mono text-lg ${left < 600 ? 'text-rose-600' : ''}`}><Clock className="h-4 w-4" />{fmt(left)}</span>
          <button onClick={() => { if (confirm(`Submit now? You have answered ${answered} of ${set.length}.`)) finish(); }} className="rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-4 py-1.5 text-sm font-medium">Submit</button>
        </div>

        <div className="mt-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-4">
          <p className="font-mono text-xs text-zinc-500">{q.type} · {q.marks} mark{q.marks > 1 ? 's' : ''} · {q.subject}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={q.id} src={`/pyq/${q.id}.webp`} alt={`Question ${q.no}`} width={sizes[q.id]?.w} height={sizes[q.id]?.h} className="mt-3 w-full max-w-xl h-auto rounded-md bg-white border border-zinc-200" />
          {notes[q.id] && <p className="mt-2 max-w-xl rounded-md border border-amber-500/40 bg-amber-500/5 px-3 py-2 text-xs">Note: {notes[q.id]}</p>}
          <div className="mt-4">
            {q.type === 'NAT' ? (
              <label className="text-sm">Your answer (a number)<br />
                <input inputMode="decimal" value={(answers[q.id] as string) ?? ''} onChange={(e) => setAns(e.target.value)} className="mt-1 w-48 rounded-lg border border-zinc-300 dark:border-white/15 bg-transparent px-3 py-2 font-mono" placeholder="e.g. 0.35" />
              </label>
            ) : (
              <fieldset>
                <legend className="text-sm mb-2">{q.type === 'MSQ' ? 'Select all correct options' : 'Select one option'}</legend>
                <div className="flex flex-wrap gap-2">
                  {opts.map((l) => {
                    const on = ((answers[q.id] as string[]) ?? []).includes(l);
                    return (
                      <button key={l} onClick={() => toggleOpt(l)} aria-pressed={on} className={`h-11 w-14 rounded-lg border font-mono text-sm ${on ? 'border-amber-500 bg-amber-500/15' : 'border-zinc-300 dark:border-white/15 hover:border-amber-500'}`}>{l}</button>
                    );
                  })}
                </div>
              </fieldset>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => go(cur - 1)} disabled={cur === 0} className={`${btn} inline-flex items-center gap-1 disabled:opacity-40`}><ChevronLeft className="h-4 w-4" /> Previous</button>
          <button onClick={() => go(cur + 1)} disabled={cur === set.length - 1} className={`${btn} inline-flex items-center gap-1 disabled:opacity-40`}>Save and next <ChevronRight className="h-4 w-4" /></button>
          <button onClick={() => { setMarked((m) => ({ ...m, [q.id]: !m[q.id] })); }} className={`${btn} inline-flex items-center gap-1`} aria-pressed={!!marked[q.id]}><Flag className="h-4 w-4" /> {marked[q.id] ? 'Unmark review' : 'Mark for review'}</button>
          <button onClick={() => setAns(q.type === 'NAT' ? '' : [])} className={`${btn} inline-flex items-center gap-1`}><Eraser className="h-4 w-4" /> Clear</button>
        </div>
      </div>

      <aside className="mt-6 lg:mt-0">
        <div className="lg:sticky lg:top-32 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-4">
          <p className="font-mono text-xs text-zinc-500 mb-2">{answered} answered · {Object.values(marked).filter(Boolean).length} marked</p>
          <div className="grid grid-cols-8 lg:grid-cols-5 gap-1.5">
            {set.map((x, i) => (
              <button key={x.id} onClick={() => go(i)} aria-label={`Question ${i + 1}`} className={`h-8 rounded-md text-xs font-mono ${status(x)} ${i === cur ? 'ring-2 ring-amber-500' : ''}`}>{i + 1}</button>
            ))}
          </div>
          <ul className="mt-3 space-y-1 text-[11px] text-zinc-500">
            <li><span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-600 mr-1.5" />answered</li>
            <li><span className="inline-block h-2.5 w-2.5 rounded-sm bg-rose-500/80 mr-1.5" />seen, not answered</li>
            <li><span className="inline-block h-2.5 w-2.5 rounded-sm bg-violet-300 mr-1.5" />marked for review</li>
            <li><span className="inline-block h-2.5 w-2.5 rounded-sm bg-violet-600 mr-1.5" />answered and marked</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
