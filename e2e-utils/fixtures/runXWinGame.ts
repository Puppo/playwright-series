import { TestFixture } from "@playwright/test";
import { MovePlayerFixture } from "./movePlayer";
import { PlayerXWinMovesFixture } from "./playerXWinMoves";

export type RunXWinGameFixture = {
  runXWinGame: () => Promise<void>;
};

export const runXWinGame: TestFixture<
  RunXWinGameFixture["runXWinGame"],
  PlayerXWinMovesFixture & MovePlayerFixture
> = async ({ playerXWinMoves, movePlayer }, use) => {
  await use(async () => {
    for (const move of playerXWinMoves) {
      await movePlayer(move);
    }
  });
};
