/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { test, expect } from "@playwright/test";

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

  // TODO fix
  test.fixme(
    "infinite scrolling loads more images as the user scrolls down the page",
    async ({ page }) => {
      const getImages = () =>
        page
          .getByLabel(/images gallery/i)
          .getByRole("link")
          .all();
      const mainImages = await getImages();
      const initialImagesAmount = mainImages.length;
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      // eslint-disable-next-line unicorn/no-await-expression-member
      expect((await getImages()).length).toBeGreaterThan(initialImagesAmount);
    }
  );

  test.fixme(
    "infinite scrolling spinner is displayed while images are being loaded",
    async ({ page }) => {
      const buttonElement = page.getByRole("button", { name: /load more/i });
      await expect(buttonElement).toBeVisible();
      await expect(buttonElement).not.toBeInViewport();
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.getByLabel(/loading spinner/i)).toBeVisible();
    }
  );

  test.skip("empty state is displayed when server return empty data", async ({
    page,
  }) => {});

  test.skip("empty state is displayed when error occurred", async ({
    page,
  }) => {});

  test.fixme(
    "lightbox should be displayed when page is loaded with 'selected' query param",
    async ({ page }) => {
      const selected = 2;
      await page.goto(`/?selected=${selected}`);
      const selectedAltText = await page
        .getByLabel(/images gallery/i)
        .getByRole("img")
        .nth(selected)
        .getAttribute("alt");

      await expect(page.getByRole("dialog")).toBeInViewport();

      expect(
        await page
          .getByRole("dialog")
          .getByRole("img")
          .nth(selected)
          .getAttribute("alt")
      ).toBe(selectedAltText);
    }
  );

  test.fixme(
    "clicking on an image links change url query and displaying lightbox",
    async ({ page }) => {
      await expect(page.getByRole("dialog")).toBeHidden();

      const clickImage = (index: number) =>
        page
          .getByLabel(/images gallery/i)
          .getByRole("link")
          .nth(index)
          .click();

      await clickImage(5);

      expect(page.getByRole("dialog")).toBeInViewport();

      await expect(
        page.getByRole("dialog").getByRole("img").nth(5)
      ).toHaveClass("active");

      await page.getByLabel(/close/i).click();

      await clickImage(3);

      await expect(
        page.getByRole("dialog").getByRole("img").nth(3)
      ).toHaveClass("active");
    }
  );

  test.skip("images are correctly displayed in lightbox", async ({
    page,
  }) => {});

  test.skip("scroll position is preserved when closing lightbox", async ({
    page,
  }) => {});
});
