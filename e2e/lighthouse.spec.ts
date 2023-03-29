import { Page, test as base, expect } from "@playwright/test";
import lighthouse from "lighthouse";

type LighthouseCategories = Partial<{
  performance: number;
  accessibility: number;
  "best-practices": number;
  seo: number;
  pwa: number;
}>;

const defaultThresholds: LighthouseCategories = {
  performance: 0.9,
  accessibility: 0.9,
  "best-practices": 0.9,
  seo: 0.9,
  pwa: 0.9,
};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R, T> {
      toMatchThresholds(received: LighthouseCategories): R;
    }
  }
}

expect.extend({
  toMatchThresholds(
    received: LighthouseCategories,
    expected: LighthouseCategories
  ) {
    const pass = Object.entries(expected).every(([category, threshold]) => {
      const receivedScore = received[category as keyof LighthouseCategories];
      return (receivedScore || 0) >= threshold;
    });

    if (pass) {
      return {
        message: () =>
          `Expected: ${this.utils.printExpected(
            expected
          )}\nReceived: ${this.utils.printReceived(received)}`,
        pass: true,
      };
    }
    return {
      message: () =>
        `Expected: ${this.utils.printExpected(
          expected
        )}\nReceived: ${this.utils.printReceived(
          received
        )}\n\n${this.utils.diff(expected, received)}`,
      pass: false,
    };
  },
});

export const test = base.extend<{
  lighthouse: (
    page: Page,
    options?: {
      thresholds?: LighthouseCategories;
    }
  ) => Promise<void>;
}>({
  lighthouse: async ({}, use) => {
    async function loadLighthouse(
      page: Page,
      options?: {
        thresholds?: LighthouseCategories;
      }
    ) {
      const thresholds: LighthouseCategories =
        options?.thresholds || defaultThresholds;
      const categories = Object.keys(thresholds);
      const runnerResult = await lighthouse(page.url(), {
        port: 9222,
        logLevel: "info",
        onlyCategories: categories,
      });

      if (!runnerResult) throw new Error("Lighthouse failed to run");

      const categoriesScores: LighthouseCategories = Object.entries(
        runnerResult.lhr.categories
      ).reduce((acc, curr) => {
        if (!thresholds[curr[0]]) return acc;
        const category = curr[0];
        acc[category] = curr[1].score;
        return acc;
      }, {} as LighthouseCategories);

      expect(categoriesScores).toMatchThresholds(thresholds);
    }

    await use(loadLighthouse);
  },
});

test.describe("Lighthouse", () => {
  test("check load page performance", async ({
    baseURL,
    browserName,
    playwright,
    lighthouse,
  }) => {
    test.skip(browserName !== "chromium", "Run only on chromium");

    const browser = await playwright["chromium"].launch({
      args: ["--remote-debugging-port=9222"],
    });

    try {
      const page = await browser.newPage();
      await page.goto(baseURL!);

      await lighthouse(page, {
        thresholds: {
          performance: 0.9,
          "best-practices": 0.9,
          seo: 0.9,
        },
      });

      await page.close();
    } finally {
      await browser.close();
    }
  });
});
