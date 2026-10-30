import type { Metadata } from 'next';
import bank from '@/data/pyq-bank.json';
import sizes from '@/data/pyq-images.json';
import PyqBank from './PyqBank';

export const metadata: Metadata = {
  title: 'GATE DA Question Bank',
  description: 'All 195 GATE DA questions from 2024–2026, filterable by subject, year, type and marks, with answer keys and progress tracking.',
};

export default function PyqBankPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <p className="font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300">GATE DA · trends</p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-medium tracking-tight">Question bank</h1>
      <p className="mt-2 mb-8 max-w-3xl text-zinc-600 dark:text-zinc-400">
        All {bank.questions.length} questions from 2024–2026 by subject, area and topic. Open any question, attempt it, then check the key.
      </p>
      <PyqBank questions={bank.questions} subjects={bank.subjects} sizes={sizes} />
    </main>
  );
}
