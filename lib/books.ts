import gateIndex from '@/data/index.json';

export type Block =
  | { t: 'p'; x: string }
  | { t: 'h'; level: number; x: string; id?: string }
  | { t: 'math'; x: string; tag?: string }
  | { t: 'box'; kind: string; name: string; num?: string; title?: string | null; blocks: Block[] }
  | { t: 'list'; ordered: boolean; style: string | null; desc: boolean; items: { label?: string; blocks: Block[] }[] }
  | { t: 'fig'; num: string | null; figs: number[]; srcs?: string[]; caption: string }
  | { t: 'table'; rows: string[][]; caption?: string }
  | { t: 'code'; x: string };

export interface BookSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface BookChapter {
  book: string;
  num: number;
  label: string;
  slug: string;
  title: string;
  tag: string;
  summary: string;
  wordCount: number;
  readingTimeMin: number;
  intro: Block[];
  sections: BookSection[];
}

export interface BookChapterMeta {
  book: string;
  num: number;
  label: string;
  slug: string;
  title: string;
  tag: string;
  summary: string;
  wordCount: number;
  readingTimeMin: number;
  sectionCount: number;
  sections: { id: string; title: string }[];
}

export interface BookIndex {
  id: string;
  title: string;
  subtitle: string;
  chapters: BookChapterMeta[];
  figureCount: number;
}

export const INDEX = gateIndex as BookIndex;

export const chapterBySlug = (slug: string) => INDEX.chapters.find((c) => c.slug === slug);

/** Chapters grouped by subject tag, in syllabus order. */
export function chaptersBySubject() {
  const groups = new Map<string, BookChapterMeta[]>();
  for (const c of INDEX.chapters) groups.set(c.tag, [...(groups.get(c.tag) ?? []), c]);
  return [...groups.entries()].map(([tag, chapters]) => ({ tag, chapters }));
}




const GREEK: Record<string, string> = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', theta: 'θ', lambda: 'λ', mu: 'μ',
  nu: 'ν', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', phi: 'φ', varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω',
  Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Pi: 'Π', Sigma: 'Σ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
  nabla: '∇', infty: '∞', partial: '∂', cdot: '·', times: '×', to: '→', le: '≤', ge: '≥',
};

/** Readable plain text for places that cannot render math (search results). */
export function texToPlain(s: string): string {
  return s
    .replace(/\\([a-zA-Z]+)/g, (_, n: string) => GREEK[n] ?? '')
    .replace(/[$\\{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
