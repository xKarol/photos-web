import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/portfolio", "/about", "/contact", "/404"];

test.describe("Accessibility", () => {
  for (const pagePath of pages) {
    test(`Page ${pagePath} should pass accessibility test`, async ({
      page,
    }, testInfo) => {
      await page.goto(pagePath);
      // @ts-ignore
      const results = await new AxeBuilder({ page }).analyze();
      await testInfo.attach("accessibility-violations", {
        body: JSON.stringify(results.violations, null, 2),
        contentType: "application/json",
      });
      await testInfo.attach("accessibility-scan-results", {
        body: JSON.stringify(results, null, 2),
        contentType: "application/json",
      });
      expect(results.violations.length).toBe(0);
    });
  }
});
