import { readFileSync } from 'fs';
import { join } from 'path';

export function readInput(filePath: string): string {
  return readFileSync(join(__dirname, filePath), 'utf8');
}