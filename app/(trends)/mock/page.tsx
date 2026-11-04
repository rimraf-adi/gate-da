import type { Metadata } from 'next';
import bank from '@/data/pyq-bank.json';
import sizes from '@/data/pyq-images.json';
import solutions from '@/data/pyq-solutions.json';
import notes from '@/data/pyq-notes.json';
import MockApp from './MockApp';

export const metadata: Metadata = {
  title: 'GATE DA Mock Tests',
  description: 'Timed GATE DA papers (2024, 2025, 2026) and subject drills, scored with the real marking scheme.',
};

export default function MockPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <p className="font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300">GATE DA · practice</p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-medium tracking-tight">Mock tests</h1>
      <p className="mt-2 mb-8 max-w-3xl text-zinc-600 dark:text-zinc-400">Sit a real paper under exam conditions, or drill one subject. Your score, mistakes and time are saved in this browser.</p>
      <MockApp questions={bank.questions} subjects={bank.subjects} sizes={sizes} solutions={solutions as Record<string, string[]>} notes={notes as Record<string, string>} />
    </main>
  );
}
