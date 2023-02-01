import { expect, test as base } from "@playwright/test";
import { movePlayer, MovePlayerFixture } from "./fixtures/movePlayer.ts";
import { page } from "./fixtures/page.ts";
import {
  playerXWinMoves,
  PlayerXWinMovesFixture,
} from "./fixtures/playerXWinMoves.ts";
import { runXWinGame, RunXWinGameFixture } from "./fixtures/runXWinGame.ts";

type TestFixtures = PlayerXWinMovesFixture &
  RunXWinGameFixture &
  MovePlayerFixture;

const test = base.extend<TestFixtures>({
  playerXWinMoves,
  page,
  runXWinGame,
  movePlayer,
});

export { test, expect };
