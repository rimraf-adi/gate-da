import type { Metadata } from 'next';
import Link from 'next/link';
import data from '@/data/pyq-analysis.json';
import bank from '@/data/pyq-bank.json';
import map from '@/data/syllabus-map.json';

export const metadata: Metadata = {
  title: 'GATE DA Trends — what the exam rewards',
  description: 'Subject weightage, question-format mix and year-by-year evolution of GATE Data Science & AI, 2024–2026, with a prep playbook.',
};

const card = 'rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5';
const th = 'px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wider text-zinc-500';
const nameKey = (n: string) => n.slice(0, 8);
const td = 'px-3 py-2.5 align-top';

export default function PyqAnalysisPage() {
  const subjects = data.subjects;
  const maxAvg = Math.max(...subjects.map((s) => s.avg));
  const total = subjects.reduce((a, s) => a + s.avg, 0);
  const top3 = subjects.slice(0, 3).reduce((a, s) => a + s.avg, 0);
  const qs = bank.questions;
  const mix = subjects.map((s) => {
    const q = qs.filter((x) => x.subject.startsWith(nameKey(s.name)));
    const by = (t: string) => q.filter((x) => x.type === t).length;
    return {
      name: s.name, mcq: by('MCQ'), msq: by('MSQ'), nat: by('NAT'),
      q1: q.filter((x) => x.marks === 1).length, q2: q.filter((x) => x.marks === 2).length,
      counted: data.years.map((y) => q.filter((x) => String(x.year) === y).reduce((a, x) => a + x.marks, 0)),
    };
  });
  const sum = (k: 'mcq' | 'msq' | 'nat' | 'q1' | 'q2') => mix.reduce((a, m) => a + m[k], 0);

  const yrs = [2024, 2025, 2026];
  const heat = (m: number) => `rgba(245, 158, 11, ${Math.min(0.08 + (m / 22) * 0.62, 0.72).toFixed(2)})`;
  const spark = (v: number[]) => {
    const max = 22, W = 72, H = 24;
    const pts = v.map((m, i) => `${(i / (v.length - 1)) * W},${H - (m / max) * H}`).join(' ');
    return <svg width={W} height={H + 4} viewBox={`0 -2 ${W} ${H + 4}`} aria-hidden className="overflow-visible"><polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.6" className="text-amber-600" /><circle cx={W} cy={H - (v[v.length - 1] / max) * H} r="2.4" className="fill-amber-600" /></svg>;
  };
  const byYear = yrs.map((y) => {
    const q = qs.filter((x) => x.year === y);
    return { y, mcq: q.filter((x) => x.type === 'MCQ').length, msq: q.filter((x) => x.type === 'MSQ').length, nat: q.filter((x) => x.type === 'NAT').length };
  });
  const asked = map.topics.filter((t) => t.questions > 0);
  const delta = (t: (typeof asked)[number]) => t.marks['2026'] - t.marks['2024'];
  const rising = [...asked].sort((a, b) => delta(b) - delta(a) || b.totalMarks - a.totalMarks).filter((t) => delta(t) > 0).slice(0, 7);
  const fading = [...asked].sort((a, b) => delta(a) - delta(b) || b.totalMarks - a.totalMarks).filter((t) => delta(t) < 0).slice(0, 7);
  const staples = asked.filter((t) => t.yearsAsked === 3).sort((a, b) => b.totalMarks - a.totalMarks).slice(0, 10);
  const oneOffs = asked.filter((t) => t.yearsAsked === 1).length;
  const never = map.topics.filter((t) => t.questions === 0);
  const moverRow = (t: (typeof asked)[number]) => (
    <li key={t.id} className="flex items-baseline justify-between gap-3 text-sm">
      <span className="min-w-0"><span className="truncate">{t.topic}</span><span className="block text-xs text-zinc-500">{t.section}</span></span>
      <span className="shrink-0 font-mono text-xs">{t.marks['2024']} → {t.marks['2025']} → {t.marks['2026']}M</span>
    </li>
  );

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300">GATE DA · trends</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-medium tracking-tight">What the exam rewards, 2024–2026</h1>
        <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-400">
          195 questions across IISc Bengaluru (2024), IIT Roorkee (2025) and IIT Guwahati (2026), reduced to what should change how you study.
          Source: {data.source}. <Link href="/pyq-bank" className="underline underline-offset-2">Question bank →</Link> · <Link href="/notes" className="underline underline-offset-2">Notes →</Link>
        </p>
        <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['Heaviest subject', `Prob & Stats · ${subjects[0].avg}M`],
            ['Top-3 share', `${((top3 / total) * 100).toFixed(0)}% (${top3.toFixed(0)}M)`],
            ['Record sitting', '21M · Stats, 2026'],
            ['Questions', '195 · 65 per paper'],
          ].map(([k, v]) => (
            <div key={k} className={card}><dt className="text-xs text-zinc-500">{k}</dt><dd className="mt-1 font-serif text-xl">{v}</dd></div>
          ))}
        </dl>
      </header>

      <section>
        <h2 className="text-2xl font-serif mb-1">Marks by subject and year</h2>
        <p className="mb-4 text-sm text-zinc-500">Counted from the 195 questions. Darker means more marks. The line shows 2024 → 2026.</p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100/70 dark:bg-white/5"><tr><th className={th}>Subject</th>{yrs.map((y) => <th key={y} className={`${th} text-center`}>{y}</th>)}<th className={th}>Trend</th></tr></thead>
            <tbody>
              {mix.map((m) => {
                const v = [m.counted[2], m.counted[1], m.counted[0]];
                return (
                  <tr key={m.name} className="border-t border-zinc-200 dark:border-white/10">
                    <td className={`${td} font-medium`}>{m.name}</td>
                    {v.map((x, i) => <td key={i} className="px-3 py-2.5 text-center font-mono" style={{ background: heat(x) }}>{x}M</td>)}
                    <td className={td}>{spark(v)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-1">Format mix by year</h2>
        <p className="mb-4 text-sm text-zinc-500">Share of the 65 questions in each paper that carry no safety net (MSQ and NAT).</p>
        <div className="space-y-3">
          {byYear.map((b) => (
            <div key={b.y} className="flex items-center gap-3">
              <span className="w-12 font-mono text-sm">{b.y}</span>
              <div className="flex h-8 flex-1 overflow-hidden rounded-lg text-[11px] font-mono text-white" role="img" aria-label={`${b.y}: ${b.mcq} MCQ, ${b.msq} MSQ, ${b.nat} NAT`}>
                <div className="flex items-center justify-center bg-zinc-500" style={{ width: `${(b.mcq / 65) * 100}%` }}>{b.mcq} MCQ</div>
                <div className="flex items-center justify-center bg-amber-600" style={{ width: `${(b.msq / 65) * 100}%` }}>{b.msq} MSQ</div>
                <div className="flex items-center justify-center bg-rose-600" style={{ width: `${(b.nat / 65) * 100}%` }}>{b.nat} NAT</div>
              </div>
              <span className="w-14 text-right font-mono text-xs text-zinc-500">{Math.round(((b.msq + b.nat) / 65) * 100)}%</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-1">Topic movers</h2>
        <p className="mb-4 text-sm text-zinc-500">Marks per paper on each syllabus topic, 2024 → 2025 → 2026. A question can touch more than one topic, so do not add these up.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className={card}><h3 className="font-serif text-lg">Rising since 2024</h3><ul className="mt-3 space-y-2.5">{rising.map(moverRow)}</ul></div>
          <div className={card}><h3 className="font-serif text-lg">Fading since 2024</h3><ul className="mt-3 space-y-2.5">{fading.map(moverRow)}</ul></div>
          <div className={card}><h3 className="font-serif text-lg">Asked in every paper</h3><ul className="mt-3 space-y-2.5">{staples.map(moverRow)}</ul></div>
          <div className={card}>
            <h3 className="font-serif text-lg">In the syllabus, never asked</h3>
            <p className="mt-1 text-xs text-zinc-500">{never.length} topics had no questions in three papers; another {oneOffs} appeared in only one. Low priority, not zero.</p>
            <ul className="mt-3 space-y-1.5 text-sm">{never.map((t) => <li key={t.id}>{t.topic}<span className="text-xs text-zinc-500"> · {t.section}</span></li>)}</ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-4">Marks by subject <span className="text-sm font-sans text-zinc-500">(as printed in the source book)</span></h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100/70 dark:bg-white/5"><tr>
              <th className={th}>Subject</th>{data.years.map((y) => <th key={y} className={th}>{y}</th>)}
              <th className={th}>Avg</th><th className={th}>Range</th><th className={th}>Swing</th><th className={th}>Share of paper</th>
            </tr></thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s.name} className="border-t border-zinc-200 dark:border-white/10">
                  <td className={`${td} font-medium`}>{s.name}</td>
                  {s.marks.map((m, i) => <td key={i} className={td}>{m}M</td>)}
                  <td className={`${td} font-semibold`}>{s.avg}M</td>
                  <td className={td}>{s.range}</td>
                  <td className={td}>±{s.swing}M</td>
                  <td className={`${td} min-w-40`}>
                    <div className="h-2 rounded-full bg-zinc-200 dark:bg-white/10"><div className="h-2 rounded-full bg-amber-500" style={{ width: `${(s.avg / maxAvg) * 100}%` }} /></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-zinc-500">Each paper is 100M: 30 one-mark questions (30M) and 35 two-mark questions (70M). Swing is a typical deviation from the three-sitting average.</p>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-4">Question mix by subject <span className="text-sm font-sans text-zinc-500">(recounted from the question bank)</span></h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100/70 dark:bg-white/5"><tr>
              {['Subject', 'MCQ', 'MSQ', 'NAT', '1M', '2M', 'Total'].map((h) => <th key={h} className={th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {mix.map((s) => (
                <tr key={s.name} className="border-t border-zinc-200 dark:border-white/10">
                  <td className={`${td} font-medium`}>{s.name}</td><td className={td}>{s.mcq}</td><td className={td}>{s.msq}</td><td className={td}>{s.nat}</td>
                  <td className={td}>{s.q1}</td><td className={td}>{s.q2}</td><td className={td}>{s.q1 + s.q2}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-zinc-300 dark:border-white/20 font-semibold">
                <td className={td}>All three papers</td><td className={td}>{sum('mcq')}</td><td className={td}>{sum('msq')}</td><td className={td}>{sum('nat')}</td>
                <td className={td}>{sum('q1')}</td><td className={td}>{sum('q2')}</td><td className={td}>{sum('q1') + sum('q2')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 list-disc pl-5">
          <li>MCQ is {((sum('mcq') / 195) * 100).toFixed(1)}% of questions, NAT {((sum('nat') / 195) * 100).toFixed(1)}%, MSQ {((sum('msq') / 195) * 100).toFixed(1)}%.</li>
          <li>Probability & Statistics holds {mix[0].nat} of {sum('nat')} NATs ({((mix[0].nat / sum('nat')) * 100).toFixed(0)}%): numerical accuracy decides this subject.</li>
          <li>MSQs concentrate in Stats ({mix[0].msq}), Programming/DSA ({mix[1].msq}), Linear Algebra ({mix[5].msq}), AI ({mix[6].msq}) and ML ({mix[3].msq}), where partial credit is zero.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-4">Recount check: printed vs question bank</h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100/70 dark:bg-white/5"><tr><th className={th}>Subject</th>{data.years.map((y) => <th key={y} className={th}>{y} printed → counted</th>)}</tr></thead>
            <tbody>
              {subjects.map((s, i) => (
                <tr key={s.name} className="border-t border-zinc-200 dark:border-white/10">
                  <td className={`${td} font-medium`}>{s.name}</td>
                  {s.marks.map((m, j) => <td key={j} className={`${td} ${m !== mix[i].counted[j] ? 'text-amber-700 dark:text-amber-300' : ''}`}>{m}M → {mix[i].counted[j]}M</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-zinc-500">Highlighted cells disagree. Both versions are the book’s own; plan with the range, not a single figure.</p>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-4">How the exam evolved</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {data.editions.map((e) => (
            <article key={e.year} className={card}>
              <p className="font-mono text-xs text-zinc-500">GATE {e.year} · {e.venue}</p>
              <h3 className="mt-1 font-serif text-lg">{e.theme}</h3>
              <p className="mt-2 text-sm"><span className="text-zinc-500">Core: </span>{e.core}</p>
              <ul className="mt-2 text-sm list-disc pl-5 text-zinc-600 dark:text-zinc-400">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              <p className="mt-3 font-mono text-xs">{e.mix.mcq} MCQ · {e.mix.msq} MSQ · {e.mix.nat} NAT</p>
            </article>
          ))}
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100/70 dark:bg-white/5"><tr>
              <th className={th}>Dimension</th>{data.editions.map((e) => <th key={e.year} className={th}>{e.year} ({e.venue})</th>)}<th className={th}>Trajectory</th>
            </tr></thead>
            <tbody>
              {data.evolution.map((r) => (
                <tr key={r.dimension} className="border-t border-zinc-200 dark:border-white/10">
                  <td className={`${td} font-medium`}>{r.dimension}</td>{r.v.map((x, i) => <td key={i} className={td}>{x}</td>)}<td className={`${td} font-medium`}>{r.trajectory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 list-disc pl-5">{data.takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-4">Subject trajectory and question style</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {subjects.map((s) => (
            <article key={s.name} className={card}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-lg">{s.name}</h3><span className="font-mono text-xs text-amber-700 dark:text-amber-300">{s.trend}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-zinc-500">{s.marks.join('M → ')}M ({data.years.join(' → ')})</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{s.style}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-4">The aspirant’s playbook</h2>
        <ol className="space-y-4">
          {data.playbook.map((p, i) => (
            <li key={p.rule} className={card}>
              <h3 className="font-serif text-lg"><span className="font-mono text-sm text-amber-700 dark:text-amber-300 mr-2">Rule {i + 1}</span>{p.rule}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="text-xs text-zinc-500 space-y-1 border-t border-zinc-200 dark:border-white/10 pt-6">
        {data.notes.map((n) => <p key={n}>Note: {n}</p>)}
      </footer>
    </main>
  );
}
