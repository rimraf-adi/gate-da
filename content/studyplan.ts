// 12-week plan. Chapter numbers refer to data/index.json; reading time and question counts are computed on the page.
export type Week = { week: number; title: string; focus: string; chapters: number[]; tip: string };

export const WEEKS: Week[] = [
  { week: 1, title: 'Probability foundations', focus: 'Probability and Statistics', chapters: [1, 2, 3, 4, 5, 68], tip: 'Do every counting and Bayes problem by hand; these feed straight into ML and AI later.' },
  { week: 2, title: 'Distributions and inference', focus: 'Probability and Statistics', chapters: [6, 7, 8, 67, 77], tip: 'This subject carries the most marks and the most NAT questions. Practise numerical answers to 2 decimals.' },
  { week: 3, title: 'Linear algebra core', focus: 'Linear Algebra', chapters: [9, 10, 11, 12, 13, 14, 15, 75, 76], tip: 'Learn eigenvalues, rank and projections until they are automatic; they reappear in PCA and SVD.' },
  { week: 4, title: 'Vector spaces and calculus', focus: 'Linear Algebra and Calculus', chapters: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 73, 74], tip: 'Calculus is the lightest subject. Spend time on optimisation and Taylor series, skip nothing in limits.' },
  { week: 5, title: 'Python', focus: 'Programming', chapters: [26, 27, 28, 29, 30, 31], tip: 'Trace code by hand. Mutable defaults, closures and list methods are favourite traps.' },
  { week: 6, title: 'Data structures I', focus: 'Programming, DSA', chapters: [32, 33, 34, 35, 36, 37], tip: 'Be able to draw a tree from its traversals and count comparisons in binary search.' },
  { week: 7, title: 'Graphs, sorting, DBMS start', focus: 'DSA and DBMS', chapters: [38, 39, 40, 41, 42, 43, 44], tip: 'Trace BFS, DFS and Dijkstra on paper. Then start relational design.' },
  { week: 8, title: 'Databases and warehousing', focus: 'DBMS', chapters: [45, 46, 47, 48, 79, 49, 50, 51], tip: 'DBMS is now a heavyweight subject. Practise SQL output, normal forms, B+ trees and OLAP operations.' },
  { week: 9, title: 'Supervised machine learning', focus: 'Machine Learning', chapters: [52, 53, 54, 55, 56, 57, 78], tip: 'Know each model well enough to do one numeric step by hand, including a backpropagation step.' },
  { week: 10, title: 'Unsupervised ML and AI search', focus: 'ML and AI', chapters: [58, 59, 60, 61, 62, 63], tip: 'Trace A* and alpha-beta on small graphs. Write the order of expansion every time.' },
  { week: 11, title: 'Logic, uncertainty, aptitude', focus: 'AI and General Aptitude', chapters: [64, 65, 66, 80, 81, 69, 70, 71, 72], tip: 'Aptitude is a fixed 15 marks. Spend a little time on it every day from now on.' },
  { week: 12, title: 'Full mocks and revision', focus: 'Everything', chapters: [], tip: 'Sit the three real papers under exam conditions, one every two days, and fix the weak topics each time.' },
];

export const DAILY = [
  'Read for about 45 minutes, then close the notes and write the key formulas from memory.',
  'Solve the previous-year questions linked to that chapter before moving on.',
  'End the day with 10 minutes on the formula sheet for that subject.',
  'Keep a list of mistakes and re-read it every Sunday.',
];
