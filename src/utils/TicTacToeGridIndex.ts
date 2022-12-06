import { TicTacToeGridIndex } from "../models/TicTacToeGrid";

export function isTicTacToeGridIndex(
  value: number
): value is TicTacToeGridIndex {
  return value >= 0 && value <= 8;
}
