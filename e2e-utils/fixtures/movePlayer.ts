import { PlaywrightTestArgs, TestFixture } from "@playwright/test";

export type MovePlayerFixture = {
  movePlayer: (move: number) => Promise<void>;
};

export const movePlayer: TestFixture<
  MovePlayerFixture["movePlayer"],
  PlaywrightTestArgs
> = async ({ page }, use) => {
  await use(async move => {
    await page.locator(`button:nth-child(${move})`).click();
  });
};
