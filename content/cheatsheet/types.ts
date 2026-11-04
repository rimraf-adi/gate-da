export type Formula = { label: string; tex: string };
export type Table = { title: string; head: string[]; rows: string[][] };
export type SheetSubject = {
  id: string;
  name: string;
  marks: string; // average marks per paper, 2024-26
  notes: string | null; // tag used by the notes index, or null when there are no notes yet
  points: string[];
  formulas: { title: string; items: Formula[] }[];
  tables?: Table[];
  traps: string[];
};
