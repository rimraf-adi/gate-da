import type { Metadata } from 'next';
import map from '@/data/syllabus-map.json';
import { chaptersBySubject, texToPlain } from '@/lib/books';
import NotesExplorer from './NotesExplorer';

export const metadata: Metadata = { title: 'GATE DA Notes', description: 'Complete notes for every subject in the GATE DA syllabus, with progress tracking and PYQ weightage.' };

export default function NotesIndex() {
  const pyq = new Map(map.chapters.map((c) => [c.num, c]));
  const groups = chaptersBySubject().map((g) => ({
    tag: g.tag,
    chapters: g.chapters.map((c) => ({
      num: c.num, slug: c.slug, label: c.label, min: c.readingTimeMin,
      title: texToPlain(c.title),
      pyqMarks: pyq.get(c.num)?.pyqMarks ?? 0, topics: pyq.get(c.num)?.topics ?? 0,
      sections: c.sections.map((s) => ({ id: s.id, title: texToPlain(s.title) })),
    })),
  }));
  const missing = [{ tag: 'Artificial Intelligence', marks: 10 }, { tag: 'General Aptitude', marks: 15 }];
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <p className="font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300">GATE DA · notes</p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-medium tracking-tight">Notes, with your progress</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {groups.reduce((a, g) => a + g.chapters.length, 0)} chapters. Tick chapters as you finish them, jump to any section, and use the marks column to start with what the exam rewards most. Progress is stored in this browser.
      </p>
      <div className="mt-8"><NotesExplorer groups={groups} missing={missing} /></div>
    </main>
  );
}
