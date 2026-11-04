import { SHEET } from '@/content/cheatsheet';

export { SHEET };
export type { Formula, Table, SheetSubject } from '@/content/cheatsheet';

/** Notes-index subject tag -> formula sheet section id. */
const TAG_TO_SHEET: Record<string, string> = {
  'Probability & Statistics': 'probability-statistics',
  'Matrices & Linear Algebra': 'linear-algebra',
  'Vector Spaces': 'linear-algebra',
  'Calculus & Optimization': 'calculus-optimization',
  'Python Programming': 'programming-dsa',
  'Data Structures & Algorithms': 'programming-dsa',
  'Database Management Systems': 'database-warehousing',
  'Data Warehousing & OLAP': 'database-warehousing',
  'Machine Learning: Supervised': 'machine-learning',
  'Machine Learning: Unsupervised': 'machine-learning',
  'Artificial Intelligence': 'artificial-intelligence',
  'General Aptitude': 'general-aptitude',
};

export const sheetHrefForTag = (tag: string) => `/cheatsheet#${TAG_TO_SHEET[tag] ?? ''}`;
export const sheetNameForTag = (tag: string) => SHEET.find((s) => s.id === TAG_TO_SHEET[tag])?.name ?? tag;
