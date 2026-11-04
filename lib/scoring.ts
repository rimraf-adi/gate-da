// GATE DA marking: MCQ wrong answers cost 1/3 of the marks; MSQ and NAT have no negative marking and MSQ has no partial credit.
export type Q = { id: string; no: number; subject: string; year: number; type: string; marks: number; area: string; topic: string; key: string };
export type Answer = string[] | string | undefined; // MCQ/MSQ: option letters; NAT: typed text

export type Verdict = 'correct' | 'wrong' | 'skipped' | 'awarded';

export function attempted(q: Q, a: Answer): boolean {
  if (q.type === 'NAT') return typeof a === 'string' && a.trim() !== '';
  return Array.isArray(a) && a.length > 0;
}

export function score(q: Q, a: Answer): { verdict: Verdict; points: number } {
  if (q.key === 'MTA') return { verdict: 'awarded', points: q.marks }; // marks to all
  if (!attempted(q, a)) return { verdict: 'skipped', points: 0 };
  if (q.type === 'NAT') {
    const m = q.key.match(/^(-?[\d.]+) to (-?[\d.]+)$/);
    const v = parseFloat((a as string).trim());
    if (!m || Number.isNaN(v)) return { verdict: 'wrong', points: 0 };
    const [lo, hi] = [parseFloat(m[1]), parseFloat(m[2])];
    return v >= lo - 1e-9 && v <= hi + 1e-9 ? { verdict: 'correct', points: q.marks } : { verdict: 'wrong', points: 0 };
  }
  const given = [...(a as string[])].sort().join(';');
  const want = q.key.split(';').sort().join(';');
  if (given === want) return { verdict: 'correct', points: q.marks };
  return { verdict: 'wrong', points: q.type === 'MCQ' ? -q.marks / 3 : 0 };
}

export const keyText = (q: Q) => (q.key === 'MTA' ? 'Marks to all' : q.type === 'NAT' ? q.key.replace(' to ', ' – ') : q.key.split(';').join(', '));
