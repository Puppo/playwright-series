import { PlaywrightTestArgs, TestFixture } from "@playwright/test";

export type PlayerXWinMovesFixture = {
  playerXWinMoves: [number, number, number, number, number, number, number];
};

export const playerXWinMoves: TestFixture<
  PlayerXWinMovesFixture["playerXWinMoves"],
  PlaywrightTestArgs
> = async ({}, use) => {
  await use([1, 5, 6, 7, 3, 9, 2]);
};
