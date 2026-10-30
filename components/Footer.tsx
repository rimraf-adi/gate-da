import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 dark:border-white/5 bg-white/60 dark:bg-[#08090d] py-10 text-sm text-zinc-600 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Logo className="h-7 w-7" />
          <span className="font-serif text-lg text-zinc-900 dark:text-zinc-100">GATE DA</span>
          <span className="text-xs">Syllabus, notes, PYQs and trends in one place.</span>
        </div>
        <nav className="flex gap-5 text-xs font-mono">
          <Link href="/notes">Notes</Link><Link href="/pyq-analysis">Trends</Link>
        </nav>
      </div>
    </footer>
  );
}
