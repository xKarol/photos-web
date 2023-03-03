/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("main content displays a list of images with clickable links", async ({
    page,
  }) => {
    const mainImages = await page.getByRole("main").getByRole("link").all();
    for (const imageLink of mainImages) {
      expect(imageLink.getAttribute("href")).not.toBeNull();
    }
  });
  test("infinite scrolling loads more images as the user scrolls down the page", async ({
    page,
  }) => {
    const mainElement = page.getByRole("main");
    const mainImages = await mainElement.getByRole("link").all();
    const initialImagesAmount = mainImages.length;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // eslint-disable-next-line unicorn/no-await-expression-member
    expect((await mainElement.getByRole("link").all()).length).toBeGreaterThan(
      initialImagesAmount
    );
  });
  test("infinite scrolling spinner is displayed while images are being loaded", async ({
    page,
  }) => {});
  test("empty state is displayed when server return empty data", async ({
    page,
  }) => {});
  test("empty state is displayed when error occurred", async ({ page }) => {});
  test("clicking on an image links change url query and displaying lightbox", async ({
    page,
  }) => {});
  test("images are correctly displayed in lightbox", async ({ page }) => {});
  test("scroll position is preserved when closing lightbox", async ({
    page,
  }) => {});
});
