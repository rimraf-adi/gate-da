import type { Metadata } from 'next';
import Link from 'next/link';
import MathText from '@/components/book/MathText';
import { SHEET } from '@/lib/cheatsheet';
import PrintButton from './PrintButton';

export const metadata: Metadata = {
  title: 'GATE DA Formula Sheet',
  description: 'Formulas, key points and common traps for every GATE DA subject, on one page.',
};

const card = 'rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5 print:border-zinc-300 print:bg-white print:break-inside-avoid';
const th = 'px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wider text-zinc-500';

export default function CheatSheet() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 print:py-0 print:max-w-none">
      <header className="print:hidden">
        <p className="font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300">GATE DA · quick revision</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-medium tracking-tight">Formula sheet and key points</h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Every subject on one page: the points to remember, the formulas, and the mistakes the exam sets traps for. Subjects follow the syllabus order; the marks beside each name show how much it carries.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <PrintButton />
          <Link href="/notes" className="rounded-full border border-zinc-200 dark:border-white/10 px-4 py-2 text-sm hover:border-amber-500">Full notes</Link>
        </div>
        <nav aria-label="Subjects" className="mt-6 flex flex-wrap gap-1.5 text-xs">
          {SHEET.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full border border-zinc-200 dark:border-white/10 px-3 py-1 hover:border-amber-500">{s.name} · {s.marks}</a>
          ))}
        </nav>
      </header>

      <div className="mt-10 space-y-14 print:mt-0 print:space-y-6">
        {SHEET.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-2 print:break-after-avoid">
              <h2 className="font-serif text-2xl sm:text-3xl">{s.name}</h2>
              <span className="font-mono text-xs text-zinc-500">{s.marks} per paper</span>
            </div>

            <div className={`${card} mt-4`}>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-300">Key points</h3>
              <ul className="mt-2 space-y-1.5 text-sm list-disc pl-5">
                {s.points.map((p, i) => <li key={i}><MathText x={p} /></li>)}
              </ul>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              {s.formulas.map((g) => (
                <div key={g.title} className={card}>
                  <h3 className="font-serif text-lg">{g.title}</h3>
                  <dl className="mt-3 space-y-2.5">
                    {g.items.map((f, i) => (
                      <div key={i} className="text-sm">
                        <dt className="text-xs text-zinc-500"><MathText x={f.label} /></dt>
                        <dd className="mt-0.5 overflow-x-auto"><MathText x={f.tex} /></dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            {s.tables?.map((t) => (
              <div key={t.title} className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10 print:break-inside-avoid">
                <table className="w-full text-sm">
                  <caption className="px-3 py-2 text-left font-serif text-lg">{t.title}</caption>
                  <thead className="bg-zinc-100/70 dark:bg-white/5"><tr>{t.head.map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {t.rows.map((row, i) => (
                      <tr key={i} className="border-t border-zinc-200 dark:border-white/10">
                        {row.map((c, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'font-medium' : ''}`}><MathText x={c} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            <div className="mt-4 rounded-2xl border border-rose-300/50 dark:border-rose-400/20 bg-rose-50/40 dark:bg-rose-950/10 p-5 print:break-inside-avoid">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-rose-700 dark:text-rose-300">Common traps</h3>
              <ul className="mt-2 space-y-1.5 text-sm list-disc pl-5">
                {s.traps.map((p, i) => <li key={i}><MathText x={p} /></li>)}
              </ul>
            </div>

            {s.notes === null && <p className="mt-3 text-xs text-zinc-500 print:hidden">Full notes for this subject are not written yet.</p>}
          </section>
        ))}
      </div>
    </main>
  );
}
