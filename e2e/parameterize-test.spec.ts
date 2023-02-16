import { expect, test as base } from "@playwright/test";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

const test = base.extend({
  page: async ({ baseURL, page }, use) => {
    baseURL && (await page.goto(baseURL));
    await use(page);
  },
});

test.describe("parameterize tests", () => {
  type TestCase = {
    winner: "X" | "O";
    moves: number[];
  };

  const testCases: TestCase[] = [
    {
      winner: "X",
      moves: [1, 5, 6, 7, 3, 9, 2],
    },
    {
      winner: "O",
      moves: [3, 1, 5, 7, 9, 4],
    },
  ];

  for (const { winner, moves } of testCases) {
    test(`should win the player "${winner}" with these ${moves}`, async ({
      page,
    }) => {
      for (const move of moves) {
        await page.locator(`button:nth-child(${move})`).click();
      }

      const winnerParagraph = await page.getByText(/winner/i);
      await expect(winnerParagraph).toContainText(winner);
    });
  }

  test.describe("from csv", () => {
    const cases = parse(
      fs.readFileSync(
        path.join(process.cwd(), "e2e", "csv", "winners_cases.csv")
      ),
      {
        columns: true,
        skip_empty_lines: true,
      }
    );

    for (const testCase of cases) {
      test(testCase.test_case, async ({ page }) => {
        const moves = testCase.moves.split(",");
        for (const move of moves) {
          await page.locator(`button:nth-child(${move})`).click();
        }

        const winnerParagraph = await page.getByText(/winner/i);
        await expect(winnerParagraph).toContainText(testCase.winner);
      });
    }
  });
});
