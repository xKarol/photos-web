/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(55_555);
    await page.goto("/");
  });

  test("header is displayed with logo icon", async ({ page }) => {
    const header = page.getByRole("banner");
    const logo = header.getByRole("link");
    expect(logo).toHaveAttribute("href", "/");
    expect(logo.getByRole("img").getAttribute("href")).not.toBeNull();
  });

  test("header is displayed with navigation links", async ({ page }) => {
    const header = page.getByRole("banner");
    const navbar = header.getByRole("navigation");
    expect(navbar).not.toBeEmpty();
    const navbarLinks = await navbar.getByRole("listitem").all();

    for (const link of navbarLinks) {
      expect(link).not.toBeEmpty();
    }
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
  test("footer is displayed with newsletter form", async ({ page }) => {});
  test("footer is displayed with socials icons", async ({ page }) => {});
  test("entering a valid email address in the newsletter signup form and submitting displays a confirmation message", async ({
    page,
  }) => {});
  test("entering an invalid email address in the newsletter signup form and submitting displays an error message", async ({
    page,
  }) => {});
  test("leaving the email field blank in the newsletter signup form and submitting displays an error messages", async ({
    page,
  }) => {});
  test("loading spinner is displayed while the newsletter form is submitting", async ({
    page,
  }) => {});
  test("success message is displayed after the newsletter form is submitted successfully", async ({
    page,
  }) => {});
  test("error message is displayed if the is a problem submitting the newsletter form", async ({
    page,
  }) => {});
});
