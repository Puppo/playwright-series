import { expect, test } from "@playwright/test";

test.describe("On View", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("show tic tac toe page", async ({ page }) => {
    await expect(page).toHaveTitle("Tic Tac Toe");
  });

  test('the first player must be the "X" player', async ({ page }) => {
    const playerParagraph = await page.getByRole("paragraph");

    await expect(playerParagraph).toContainText("X");
  });
});

test.describe("Users behaviours", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

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

  test('should win the player "X"', async ({ page }) => {
    await page.goto("/");
    await page.locator("button:nth-child(1)").click();
    await page.locator("button:nth-child(5)").click();
    await page.locator("button:nth-child(6)").click();
    await page.locator("button:nth-child(7)").click();
    await page.locator("button:nth-child(3)").click();
    await page.locator("button:nth-child(9)").click();
    await page.locator("button:nth-child(2)").click();

    const winnerParagraph = await page.getByText(/winner/i);
    await expect(winnerParagraph).toContainText("X");
  });
});
