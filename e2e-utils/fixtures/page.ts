import {
  Page,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  TestFixture,
} from "@playwright/test";

export const page: TestFixture<
  Page,
  PlaywrightTestArgs & PlaywrightTestOptions
> = async ({ baseURL, page }, use) => {
  baseURL && (await page.goto(baseURL));
  await use(page);
};
