/* eslint-disable playwright/no-skipped-test */
/* eslint-disable @typescript-eslint/no-empty-function */
import { test, expect, type Page } from "@playwright/test";

test.describe("Lightbox", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("lightbox should be displayed when page is loaded with 'selected' query param", async ({
    page,
  }) => {
    const selected = 2;
    await page.goto(`/?selected=${selected}`);
    const selectedAltText = await page
      .getByLabel(/images gallery/i)
      .getByRole("img")
      .nth(selected)
      .getAttribute("alt");

    await expect(page.getByLabel(/lightbox overlay/i)).toBeInViewport();

    expect(
      await page
        .getByRole("dialog")
        .getByRole("img")
        .nth(selected)
        .getAttribute("alt")
    ).toBe(selectedAltText);
  });

  test("clicking on an image links change url query and displaying lightbox", async ({
    page,
  }) => {
    await expect(page).not.toHaveURL(/.*?selected=/);
    await expect(page.getByRole("dialog")).toBeHidden();

    let selectedIndex = 5;

    await clickImage(page, selectedIndex);
    await expect(page).toHaveURL(
      new RegExp(`[\\?&]selected=${selectedIndex + 1}+`)
    );

    expect(page.getByLabel(/lightbox overlay/i)).toBeInViewport();

    expect(
      await page
        .getByRole("dialog")
        .getByRole("listitem")
        .nth(selectedIndex)
        .getAttribute("class")
    ).toMatch(/selected/);

    await page.getByLabel(/close/i).click();

    selectedIndex = 3;
    await clickImage(page, selectedIndex);

    expect(
      await page
        .getByRole("dialog")
        .getByRole("listitem")
        .nth(selectedIndex)
        .getAttribute("class")
    ).toMatch(/selected/);

    await expect(page).toHaveURL(
      new RegExp(`[\\?&]selected=${selectedIndex + 1}+`)
    );
  });

  test.fixme(
    "images are correctly displayed in the lightbox",
    async ({ page }) => {
      const images = await page
        .getByLabel(/images gallery/i)
        .getByRole("img")
        .all();
      await clickImage(page, 3);
      expect(
        // eslint-disable-next-line unicorn/no-await-expression-member
        (await page.getByRole("dialog").getByRole("listitem").all()).length
      ).toBe(images.length);
    }
  );

  test("scroll position is preserved when closing lightbox", async ({
    page,
  }) => {
    const testScrollPosition = async (imageIndex: number) => {
      const initialScroll = await scrollToImage(page, imageIndex);
      await clickImage(page, imageIndex);
      await page.getByLabel(/close the lightbox/i).click();
      expect(await page.evaluate(() => window.scrollY)).toBe(initialScroll);
    };
    await testScrollPosition(0);
    await testScrollPosition(4);
    await testScrollPosition(2);
  });

  test.skip("arrows are not rendered on mobile", () => {});
  test.skip("user can swipe images", () => {});
});

async function clickImage(page: Page, index: number) {
  await page
    .getByLabel(/images gallery/i)
    .getByRole("link")
    .nth(index)
    .click();
}

async function scrollToImage(page: Page, selectedIndex: number) {
  const linksElements = await page
    .getByLabel(/images gallery/i)
    .getByRole("link")
    .all();

  if (!linksElements[selectedIndex])
    throw new Error(`Image with index: ${selectedIndex} not exist.`);
  await linksElements[selectedIndex].scrollIntoViewIfNeeded();
  return await page.evaluate(() => window.scrollY);
}
