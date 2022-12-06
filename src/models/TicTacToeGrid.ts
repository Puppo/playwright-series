import { Nullable } from "../utils/Nullable";
import { TicTacToeValue } from "./TicTacToeValue";

export type TicTacToeGrid = [
  Nullable<TicTacToeValue>,
  Nullable<TicTacToeValue>,
  Nullable<TicTacToeValue>,
  Nullable<TicTacToeValue>,
  Nullable<TicTacToeValue>,
  Nullable<TicTacToeValue>,
  Nullable<TicTacToeValue>,
  Nullable<TicTacToeValue>,
  Nullable<TicTacToeValue>
];

export type TicTacToeGridIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
