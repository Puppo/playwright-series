import { useCallback } from "react";
import { TicTacToeGrid, TicTacToeGridIndex } from "../../models/TicTacToeGrid";
import { isTicTacToeGridIndex } from "../../utils/TicTacToeGridIndex";
import Square from "../Square/Square";

import style from "./Board.module.scss";

interface BoardProps {
  board: TicTacToeGrid;
  move: (index: TicTacToeGridIndex) => void;
}

export default function Board({
  board,
  move,
}: BoardProps) {

  const onMove = useCallback(
    (index: number) => {
      if (isTicTacToeGridIndex(index)) {
        move(index);
      }
    },
    [move],
  )

  return <>
    <div className={style.Board}>
      {board.map((value, index) => (
        <Square key={index} value={value} onSelect={() => onMove(index)} />
      ))}
    </div>
  </>
}
