// Short original chapters point to the longer chapters that cover the same topic in more depth (and back).
const DEEPER: Record<number, number[]> = {
  5: [68], 6: [77], 8: [67],
  12: [75, 87], 13: [75], 14: [76], 15: [76, 87], 17: [76], 18: [75],
  22: [74], 23: [74], 25: [73],
  42: [79], 48: [79],
  56: [78], 57: [78], 60: [82], 58: [86], 59: [86], 30: [85], 29: [85], 54: [84], 4: [83], 7: [83],
  66: [80, 81], 61: [], 62: [],
};

const forward = new Map<number, number[]>(Object.entries(DEEPER).map(([k, v]) => [Number(k), v]));
const back = new Map<number, number[]>();
for (const [short, deeper] of forward) for (const d of deeper) back.set(d, [...(back.get(d) ?? []), short]);

/** Chapters to suggest from chapter `num`: deeper treatments if it is a short chapter, otherwise the chapters it builds on. */
export function relatedChapters(num: number): { num: number; kind: 'deeper' | 'basics' }[] {
  return [
    ...(forward.get(num) ?? []).map((n) => ({ num: n, kind: 'deeper' as const })),
    ...(back.get(num) ?? []).map((n) => ({ num: n, kind: 'basics' as const })),
  ];
}
