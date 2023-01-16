import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { TicTacToeGrid, TicTacToeGridIndex } from "../models/TicTacToeGrid";
import { TicTacToeValue } from "../models/TicTacToeValue";
import { Nullable } from "../utils/Nullable";

interface TicTacToeState {
  board: TicTacToeGrid;
  nextPlayer: TicTacToeValue;
  move: (position: TicTacToeGridIndex) => void;
  winner: Nullable<TicTacToeValue>;
  restart: () => void;
}

function calculateWinner(board: TicTacToeGrid): TicTacToeValue | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const element of lines) {
    const [a, b, c] = element;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export const useTicTacToeStore = create<TicTacToeState>()(
  subscribeWithSelector(set => ({
    board: [null, null, null, null, null, null, null, null, null],
    nextPlayer: "X",
    winner: null,
    move(position: TicTacToeGridIndex) {
      set(state => {
        if (state.winner) return state;
        if (state.board[position]) return state;

        const board = [...state.board] as TicTacToeGrid;
        board[position] = state.nextPlayer;
        const winner = calculateWinner(board);
        return {
          board,
          nextPlayer: state.nextPlayer === "X" ? "O" : "X",
          winner,
        };
      });
    },
    restart() {
      set({
        board: [null, null, null, null, null, null, null, null, null],
        nextPlayer: "X",
        winner: null,
      });
    },
  }))
);
