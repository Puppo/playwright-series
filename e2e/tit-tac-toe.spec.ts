import { expect, test } from "../e2e-utils/test-base.ts";

test.describe("On View", () => {
  test("show tic tac toe page", async ({ page }) => {
    await expect(page).toHaveTitle("Tic Tac Toe");
  });

  test('the first player must be the "X" player', async ({ page }) => {
    const playerParagraph = await page.getByRole("paragraph");

    await expect(playerParagraph).toContainText("X");
  });
});

test.describe("Users behaviours", () => {
  test('the first player select the top-left square and then the next player is the "O"', async ({
    page,
  }) => {
    const squares = await page.getByRole("button");

    const topLeftSquare = squares.first();
    await topLeftSquare.click();
    const topLeftSquareImg = await topLeftSquare.getByRole("img");

    await expect(topLeftSquareImg).toHaveAttribute("title", "X");
    await expect(topLeftSquareImg).toHaveAttribute("src", /x.png/i);

    const playerParagraph = await page.getByRole("paragraph");

    await expect(playerParagraph).toContainText("O");
  });

  test('should win the player "X"', async ({ page, playerXWinMoves }) => {
    for (const move of playerXWinMoves) {
      await page.locator(`button:nth-child(${move})`).click();
    }

    const winnerParagraph = await page.getByText(/winner/i);
    await expect(winnerParagraph).toContainText("X");
  });

  test('should win the player "X" with the "runXWinGame" fixture', async ({
    page,
    runXWinGame,
  }) => {
    await runXWinGame();

    const winnerParagraph = await page.getByText(/winner/i);
    await expect(winnerParagraph).toContainText("X");
  });

  test('should win the player "X" using "playerXWinMoves" and "move" fixture', async ({
    page,
    playerXWinMoves,
    movePlayer,
  }) => {
    for (const move of playerXWinMoves) {
      await movePlayer(move);
    }

    const winnerParagraph = await page.getByText(/winner/i);
    await expect(winnerParagraph).toContainText("X");
  });
});
