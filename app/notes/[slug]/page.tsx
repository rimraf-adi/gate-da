import { notFound } from 'next/navigation';
import { INDEX } from '@/lib/books';
import { getChapter } from '@/lib/books.server';
import BlockList from '@/components/book/BlockRenderer';
import MathText from '@/components/book/MathText';
import Link from 'next/link';
import { sheetHrefForTag, sheetNameForTag } from '@/lib/cheatsheet';
import { relatedChapters } from '@/lib/related';
import map from '@/data/syllabus-map.json';
import bank from '@/data/pyq-bank.json';
import BookReaderClient from './BookReaderClient';

const BOOK = 'gate-da';

export function generateStaticParams() {
  return INDEX.chapters.map((c) => ({ slug: c.slug }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const pos = INDEX.chapters.findIndex((c) => c.slug === slug);
  const pick = (c?: (typeof INDEX.chapters)[number]) => (c ? { slug: c.slug, title: c.title, label: c.label } : null);
  const sections = chapter.sections.map((s) => ({
    id: s.id,
    title: s.title,
    subs: s.blocks.filter((b) => b.t === 'h' && b.level === 3 && b.id).map((b) => ({ id: (b as { id: string }).id, title: (b as { x: string }).x })),
  }));

  const related = bank.questions
    .filter((x) => (map.questionChapters as Record<string, number>)[x.id] === chapter.num)
    .sort((a, b) => b.year - a.year || a.no - b.no);
  const links = relatedChapters(chapter.num).map((r) => ({ ...r, c: INDEX.chapters.find((x) => x.num === r.num) })).filter((r) => r.c);
  const relatedMarks = related.reduce((a, x) => a + x.marks, 0);

  return (
    <BookReaderClient
      book={BOOK}
      slug={slug}
      pathHref="/notes"
      bookTitle={INDEX.title}
      chapterLabel={chapter.label}
      title={chapter.title}
      tag={chapter.tag}
      readingTimeMin={chapter.readingTimeMin}
      wordCount={chapter.wordCount}
      sections={sections}
      prev={pick(INDEX.chapters[pos - 1])}
      next={pick(INDEX.chapters[pos + 1])}
      tex=""
    >
      {chapter.intro.length > 0 && <BlockList blocks={chapter.intro} book={BOOK} />}
      {chapter.sections.map((s) => (
        <section key={s.id + s.title} id={`sec-${s.id || s.title}`} className="scroll-mt-28 space-y-6">
          <h2 className="border-b border-zinc-200 dark:border-white/10 pb-3 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 flex items-baseline gap-3">
            {s.id && <span className="font-mono text-xl sm:text-2xl text-amber-700 dark:text-amber-400">{s.id}</span>}
            <MathText x={s.title} />
          </h2>
          <BlockList blocks={s.blocks} book={BOOK} />
        </section>
      ))}
      {links.length > 0 && (
        <aside className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5">
          <p className="font-serif text-lg">{links.some((l) => l.kind === 'deeper') ? 'Go deeper' : 'Builds on'}</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {links.map((l) => (
              <li key={l.num}>
                <Link href={`/notes/${l.c!.slug}`} className="underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-300">Chapter {l.num}: {l.c!.title.replace(/\$/g, '')}</Link>
                <span className="text-zinc-500"> · {l.kind === 'deeper' ? 'covers this topic in more depth, with worked problems' : 'the shorter chapters on this topic'}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}
      <aside className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 p-5">
        <p className="font-serif text-lg">Previous-year questions on this chapter</p>
        {related.length > 0 ? (
          <>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{related.length} question{related.length > 1 ? 's' : ''} worth {relatedMarks} marks in the 2024–26 papers.</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {related.map((x) => (
                <Link key={x.id} href={`/pyq-bank?ids=${x.id}`} className="rounded-md border border-zinc-200 dark:border-white/10 px-2 py-0.5 font-mono text-[11px] hover:border-amber-500">{x.year} · Q{x.no} · {x.type} · {x.marks}M</Link>
              ))}
            </div>
            <Link href={`/pyq-bank?ids=${related.map((x) => x.id).join(',')}`} className="mt-3 inline-block rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-4 py-2 text-sm font-medium">Practise all {related.length} in the question bank</Link>
          </>
        ) : (
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">No question from the 2024–26 papers maps to this chapter, so it is lower priority unless it supports a later chapter.</p>
        )}
      </aside>
      <aside className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
        <p className="font-serif text-lg">Short on time?</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Formulas, key points and common traps for {sheetNameForTag(chapter.tag)} on one page.</p>
        <Link href={sheetHrefForTag(chapter.tag)} className="mt-3 inline-block rounded-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 text-sm font-medium">Open the formula sheet</Link>
      </aside>
    </BookReaderClient>
  );
}
