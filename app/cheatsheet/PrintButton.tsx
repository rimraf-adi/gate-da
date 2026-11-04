'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-white/15 px-4 py-2 text-sm hover:border-amber-500 print:hidden">
      <Printer className="h-4 w-4" /> Print or save as PDF
    </button>
  );
}
