import type { Metadata } from 'next';
import Link from 'next/link';
import index from '@/data/index.json';
import map from '@/data/syllabus-map.json';
import bank from '@/data/pyq-bank.json';
import analysis from '@/data/pyq-analysis.json';
import { WEEKS, DAILY } from '@/content/studyplan';

export const metadata: Metadata = {
  title: 'GATE DA Exam Guide',
  description: 'Paper pattern, marking scheme, time strategy and a 12-week study plan for GATE Data Science and AI.',
};

const card = 'rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5';
const th = 'px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wider text-zinc-500';
const td = 'px-3 py-2.5 align-top';

export default function ExamGuide() {
  const chapters = new Map(index.chapters.map((c) => [c.num, c]));
  const qc = map.questionChapters as Record<string, number>;
  const q = bank.questions;
  const per = (y: number) => q.filter((x) => x.year === y);
  const ones = per(2026).filter((x) => x.marks === 1).length;
  const twos = per(2026).filter((x) => x.marks === 2).length;
  const mixes = [2024, 2025, 2026].map((y) => ({ y, mcq: per(y).filter((x) => x.type === 'MCQ').length, msq: per(y).filter((x) => x.type === 'MSQ').length, nat: per(y).filter((x) => x.type === 'NAT').length }));

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300">GATE DA · exam guide</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-medium tracking-tight">Know the paper, then plan for it</h1>
        <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-400">
          What the paper looks like, how it is marked, how to spend the three hours, and a 12-week plan built on the chapters in these notes. Always confirm details against the official GATE brochure for your year.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-serif mb-4">The paper at a glance</h2>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['Duration', '3 hours, computer-based'],
            ['Questions', '65 questions, 100 marks'],
            ['General Aptitude', '10 questions, 15 marks'],
            ['Subject paper', '55 questions, 85 marks'],
            ['1-mark questions', `${ones} (30 marks)`],
            ['2-mark questions', `${twos} (70 marks)`],
            ['Question types', 'MCQ, MSQ, NAT'],
            ['Calculator', 'on-screen virtual calculator only'],
          ].map(([k, v]) => (
            <div key={k} className={card}><dt className="text-xs text-zinc-500">{k}</dt><dd className="mt-1 font-serif text-lg">{v}</dd></div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-4">Marking scheme</h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100/70 dark:bg-white/5"><tr>{['Type', 'What you give', 'Marks for a correct answer', 'Wrong answer'].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>
              {[
                ['MCQ (one correct option)', 'one option', '1 or 2', 'negative: one third of the marks (−1/3 on a 1-mark, −2/3 on a 2-mark question)'],
                ['MSQ (one or more correct options)', 'all correct options', '1 or 2', 'no negative marks, and no partial credit: one wrong or missing option scores zero'],
                ['NAT (numerical answer)', 'a number typed in', '1 or 2', 'no negative marks; the key is usually a range, so round as the question says'],
              ].map((r) => <tr key={r[0]} className="border-t border-zinc-200 dark:border-white/10">{r.map((c, i) => <td key={i} className={`${td} ${i === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 list-disc pl-5">
          <li>Only MCQs are penalised, so guess on an MCQ only after you can rule out at least one option. MSQ and NAT cost nothing to attempt.</li>
          <li>Since MSQ and NAT together are now close to half the paper, option elimination helps far less than it used to.</li>
          <li>If a question is cancelled or has a flaw, the organisers may award marks to everyone (a "marks to all" key). One question in these papers has such a key, and the mock tests handle it.</li>
        </ul>
        <div className="mt-6 grid md:grid-cols-3 gap-3">
          {mixes.map((m) => (
            <div key={m.y} className={card}>
              <p className="font-mono text-xs text-zinc-500">{m.y} paper</p>
              <p className="mt-1 font-serif text-lg">{m.mcq} MCQ · {m.msq} MSQ · {m.nat} NAT</p>
              <p className="text-xs text-zinc-500">{Math.round(((m.msq + m.nat) / 65) * 100)}% had no option-elimination safety net</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-1">Where the marks come from</h2>
        <p className="mb-4 text-sm text-zinc-500">Average marks per paper over 2024–26, as printed in the source analysis.</p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100/70 dark:bg-white/5"><tr>{['Subject', 'Avg marks', 'Share of paper', 'Study-time share'].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>
              {analysis.subjects.map((s) => (
                <tr key={s.name} className="border-t border-zinc-200 dark:border-white/10"><td className={`${td} font-medium`}>{s.name}</td><td className={td}>{s.avg}M</td><td className={td}>{Math.round(s.avg)}%</td><td className={td}>about {Math.round(s.avg)}%</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-zinc-500">A sensible rule is to split your time in proportion to marks, then add a little extra to subjects you find hard.</p>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-4">Spending the three hours</h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100/70 dark:bg-white/5"><tr>{['Phase', 'Time', 'What to do'].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>
              {[
                ['First pass', '~100 min', 'Answer everything you can do in under two minutes (1-mark) or four minutes (2-mark). Skip the rest immediately and mark it.'],
                ['General Aptitude', '~15 min', 'Ten questions worth 15 marks. They are the most predictable marks in the paper, so take them early.'],
                ['Second pass', '~45 min', 'Return to the skipped questions in order of marks. Work NATs carefully; one slip loses the whole question.'],
                ['Review', '~15 min', 'Check MSQs for a missed option, re-read NAT rounding, and finally decide the MCQs you were unsure about.'],
                ['Buffer', '~5 min', 'Leave a margin for the final submit.'],
              ].map((r) => <tr key={r[0]} className="border-t border-zinc-200 dark:border-white/10">{r.map((c, i) => <td key={i} className={`${td} ${i === 0 ? 'font-medium whitespace-nowrap' : ''}`}>{c}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-zinc-500">Average time per question is about 2 minutes 45 seconds. Practise with the <Link href="/mock" className="underline">timed mock tests</Link> to find your own pace.</p>
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-1">12-week study plan</h2>
        <p className="mb-4 text-sm text-zinc-500">Read time is the total reading time of the chapters; plan roughly three to four times that for problem solving. Question counts are previous-year questions linked to those chapters.</p>
        <ol className="space-y-3">
          {WEEKS.map((w) => {
            const mins = w.chapters.reduce((a, n) => a + (chapters.get(n)?.readingTimeMin ?? 0), 0);
            const qs = Object.entries(qc).filter(([, n]) => w.chapters.includes(n)).length;
            return (
              <li key={w.week} className={card}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg"><span className="font-mono text-sm text-amber-700 dark:text-amber-300 mr-2">Week {w.week}</span>{w.title}</h3>
                  {w.chapters.length > 0 && <span className="font-mono text-xs text-zinc-500">{(mins / 60).toFixed(1)} h reading · {qs} PYQs</span>}
                </div>
                <p className="text-xs text-zinc-500">{w.focus}</p>
                {w.chapters.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                    {w.chapters.map((n) => {
                      const c = chapters.get(n);
                      return c ? <Link key={n} href={`/notes/${c.slug}`} className="rounded-md border border-zinc-200 dark:border-white/10 px-2 py-0.5 hover:border-amber-500">Ch {n} · {c.title.replace(/\$/g, '')}</Link> : null;
                    })}
                  </div>
                ) : (
                  <p className="mt-2 text-sm"><Link href="/mock" className="underline">Open the mock tests</Link>: 2024, 2025 and 2026 papers, timed and scored with the real marking scheme.</p>
                )}
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{w.tip}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className={card}>
          <h3 className="font-serif text-lg">Every study day</h3>
          <ul className="mt-2 space-y-1.5 text-sm list-disc pl-5">{DAILY.map((d) => <li key={d}>{d}</li>)}</ul>
        </div>
        <div className={card}>
          <h3 className="font-serif text-lg">Final week checklist</h3>
          <ul className="mt-2 space-y-1.5 text-sm list-disc pl-5">
            <li>Re-read the <Link href="/cheatsheet" className="underline">formula sheet</Link> for all eight subjects.</li>
            <li>Redo every question you marked for review in the question bank.</li>
            <li>One full paper under exam conditions, then analyse every mistake.</li>
            <li>Sleep properly the night before; do not start new topics.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
