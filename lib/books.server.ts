import fs from 'fs';
import path from 'path';
import type { BookChapter } from './books';

export function getChapter(slug: string): BookChapter | null {
  try {
    const file = path.join(process.cwd(), 'data', 'chapters', `${slug}.json`);
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf-8')) as BookChapter;
  } catch {
    return null;
  }
}
