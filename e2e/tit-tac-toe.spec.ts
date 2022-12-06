import { expect, test } from "@playwright/test";

test("show tic tac toe page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Tic Tac Toe");
});
