import { expect, test } from "@playwright/test";

const pages404 = ["/404", "/unknown", "/not-found"];

test.describe("404 pages", () => {
  for (const page404 of pages404) {
    test.beforeEach(async ({ page }) => {
      await page.goto(page404);
    });

    test(`page ${page404} should have valid title`, async ({ page }) => {
      expect(await page.title()).toContain("404");
    });

    test(`page ${page404} should display 404 page`, async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: /This page is not available./i })
      ).toBeVisible();

      await expect(page.getByLabel(/no data animation/i)).toBeVisible();

      const backButton = page.getByRole("link", { name: /go back/i });
      await expect(backButton).toBeVisible();
      await expect(backButton).toHaveAttribute("href", "/");
    });
  }
});
