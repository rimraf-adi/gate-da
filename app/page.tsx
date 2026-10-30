import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import map from '@/data/syllabus-map.json';
import { INDEX } from '@/lib/books';

export default function Home() {
  const subjects = [...new Set(map.topics.map((t) => t.section))].map((s) => {
    const ts = map.topics.filter((t) => t.section === s);
    return { s, topics: ts.length, avg: ts.reduce((a, t) => a + t.totalMarks, 0) / 3, gaps: ts.filter((t) => t.status !== 'covered').length };
  });
  const cards = [
    ['/board', 'Prep board', 'Every official syllabus topic with its notes, PYQs, trend and your own progress.'],
    ['/notes', 'Notes', `${INDEX.chapters.length} chapters across the syllabus, with worked examples and figures.`],
    ['/pyq-bank', 'PYQ bank', 'All 195 questions from 2024–26 by subject, area and topic, with answer keys.'],
    ['/pyq-analysis', 'Trends', 'Marks by subject, question mix and how the exam changed year to year.'],
  ];
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-14">
      <header className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300">GATE Data Science & AI</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-serif font-medium tracking-tight">Prepare from the syllabus, not from guesswork.</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          The official GATE 2027 DA syllabus, mapped to notes and to every question asked in 2024–26, with the trend for each topic.
        </p>
        <Link href="/board" className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-zinc-950">
          Open the prep board <ArrowRight className="h-4 w-4" />
        </Link>
      </header>
      <section className="grid sm:grid-cols-2 gap-4">
        {cards.map(([href, t, d]) => (
          <Link key={href} href={href} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-6 hover:border-amber-500 transition">
            <h2 className="font-serif text-xl">{t}</h2><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{d}</p>
          </Link>
        ))}
      </section>
      <section>
        <h2 className="font-serif text-2xl mb-4">The syllabus at a glance</h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100/70 dark:bg-white/5"><tr>{['Subject', 'Topics', 'Marks / paper', 'Gaps in notes'].map((h) => <th key={h} className="px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wider text-zinc-500">{h}</th>)}</tr></thead>
            <tbody>
              {subjects.map((x) => (
                <tr key={x.s} className="border-t border-zinc-200 dark:border-white/10"><td className="px-3 py-2.5 font-medium">{x.s}</td><td className="px-3 py-2.5">{x.topics}</td><td className="px-3 py-2.5">{x.avg.toFixed(1)}M</td><td className="px-3 py-2.5">{x.gaps}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-zinc-500">Marks per paper are averaged over 2024–26 from the PYQ bank.</p>
      </section>
    </main>
  );
}
