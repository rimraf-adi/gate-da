'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TrendsTabs() {
  const path = usePathname();
  const tabs = [['/pyq-analysis', 'Pattern analysis'], ['/pyq-bank', 'Question bank']];
  return (
    <div className="border-b border-zinc-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex gap-1">
        {tabs.map(([href, label]) => (
          <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}
            className={`px-4 py-3 text-sm border-b-2 -mb-px ${path === href ? 'border-amber-500 text-zinc-900 dark:text-zinc-100 font-medium' : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}>{label}</Link>
        ))}
      </div>
    </div>
  );
}
