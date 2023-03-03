import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/", "/portfolio", "/about", "/contact", "/404"];

test.describe("Accessibility", () => {
  for (const pagePath of pages) {
    test(`Page ${pagePath} should pass accessibility test`, async ({
      page,
    }) => {
      await page.goto(pagePath);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.length).toBe(0);
    });
  }
});
