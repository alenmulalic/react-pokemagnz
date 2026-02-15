import { PAGE_SIZE } from "../data/dto/pokeConstants";

export interface Indexes {
  start: number;
  stop: number;
}

export function CalculateIndexes(page: number): Indexes {
  const start = (page - 1) * PAGE_SIZE + 1;
  const stop = page * PAGE_SIZE;

  return { start, stop };
}
