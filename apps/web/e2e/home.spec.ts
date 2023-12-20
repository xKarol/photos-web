/* eslint-disable playwright/no-skipped-test */

/* eslint-disable @typescript-eslint/no-empty-function */
import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("main content displays a list of images with clickable links", async ({
    page,
  }) => {
    const mainImages = await page
      .getByLabel(/images gallery/i)
      .getByRole("link")
      .all();
    for (const imageLink of mainImages) {
      expect(imageLink.getAttribute("href")).not.toBeNull();
    }
  });

  test("fetch more is not called after load the page ", async ({ page }) => {
    const buttonElement = page.getByText(/load more/i);
    const imagesLinks = await page
      .getByLabel(/images gallery/i)
      .getByRole("link")
      .all();
    expect(imagesLinks.length).toBeGreaterThan(0);
    await expect(buttonElement).toBeVisible();

    await expect(page.getByLabel(/loading spinner/i)).toBeHidden();
  });

  // test.skip("empty state is displayed when server return empty data", async ({
  //   page,
  // }) => {});

  // test.skip("empty state is displayed when error occurred", async ({
  //   page,
  // }) => {});
});
