import type { Metadata } from 'next';
import Link from 'next/link';
import { chaptersBySubject, texToPlain } from '@/lib/books';

export const metadata: Metadata = { title: 'GATE DA Notes', description: 'Complete notes for every subject in the GATE DA syllabus.' };

export default function NotesIndex() {
  const groups = chaptersBySubject();
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <p className="font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300">GATE DA · notes</p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-medium tracking-tight">All notes, subject by subject</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">Notes still missing: Artificial Intelligence and General Aptitude. See the <Link href="/board" className="underline">prep board</Link> for gaps.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-5">
        {groups.map((g) => (
          <section key={g.tag} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5">
            <h2 className="font-serif text-xl">{g.tag}</h2>
            <p className="text-xs text-zinc-500">{g.chapters.length} chapters · {g.chapters.reduce((a, c) => a + c.readingTimeMin, 0)} min</p>
            <ol className="mt-3 space-y-1.5 text-sm">
              {g.chapters.map((c) => (
                <li key={c.slug}>
                  <Link href={`/notes/${c.slug}`} className="flex justify-between gap-3 hover:text-amber-700 dark:hover:text-amber-300">
                    <span><span className="font-mono text-xs text-zinc-500 mr-2">{c.label}</span>{texToPlain(c.title)}</span>
                    <span className="font-mono text-xs text-zinc-500 shrink-0">{c.readingTimeMin}m</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </main>
  );
}
