import { expect, test } from "@playwright/test";

test.describe("Portfolios page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/portfolio");
  });

  test("should contain heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Portfolios" })
    ).toBeVisible();
  });

  test("section should contain few portfolios images", async ({ page }) => {
    const elements = await page.getByLabel(/portfolio gallery/i).all();
    expect(elements.length).not.toBeLessThan(1);
  });

  test("should redirect to portfolio page, after click the portfolio image", async ({
    page,
  }) => {
    const linkElement = page
      .getByLabel(/portfolio gallery/i)
      .getByRole("link")
      .first();
    await linkElement.click();
    await page.waitForURL(`**${await linkElement.getAttribute("href")}`);
  });
});
