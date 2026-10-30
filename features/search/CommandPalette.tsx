'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { INDEX, texToPlain } from '@/lib/books';
import map from '@/data/syllabus-map.json';

type Hit = { title: string; sub: string; href: string };

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const all = useMemo<Hit[]>(() => [
    ...map.topics.map((t) => ({ title: t.topic, sub: `Syllabus · ${t.section}`, href: '/board' })),
    ...INDEX.chapters.map((c) => ({ title: texToPlain(c.title), sub: `Notes · ${c.tag}`, href: `/notes/${c.slug}` })),
    ...INDEX.chapters.flatMap((c) => c.sections.map((s) => ({ title: texToPlain(s.title), sub: `${texToPlain(c.title)} · section ${s.id}`, href: `/notes/${c.slug}#sec-${s.id}` }))),
  ], []);
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? all.filter((h) => h.title.toLowerCase().includes(t)).slice(0, 30) : [];
  }, [q, all]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); window.dispatchEvent(new Event('open-command-palette')); }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  useEffect(() => { if (isOpen) { setQ(''); setTimeout(() => input.current?.focus(), 0); } }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-zinc-950/60 backdrop-blur-sm p-4 pt-24" onClick={onClose}>
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-white/10 px-4 py-3">
          <Search className="h-4 w-4 text-zinc-400" />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search topics, chapters, sections…" className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <ul className="max-h-96 overflow-y-auto">
          {hits.map((h, i) => (
            <li key={i}>
              <button onClick={() => { onClose(); router.push(h.href); }} className="w-full text-left px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-white/5">
                <span className="block text-sm">{h.title}</span><span className="block text-xs text-zinc-500">{h.sub}</span>
              </button>
            </li>
          ))}
          {q && !hits.length && <li className="px-4 py-6 text-sm text-zinc-500">No results.</li>}
          {!q && <li className="px-4 py-6 text-sm text-zinc-500">Type to search the syllabus and all 60 chapters.</li>}
        </ul>
      </div>
    </div>
  );
}
