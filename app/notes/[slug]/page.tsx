import { notFound } from 'next/navigation';
import { INDEX } from '@/lib/books';
import { getChapter } from '@/lib/books.server';
import BlockList from '@/components/book/BlockRenderer';
import MathText from '@/components/book/MathText';
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

  return (
    <BookReaderClient
      book={BOOK}
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
    </BookReaderClient>
  );
}
