import { test, expect, Locator } from "@playwright/test";
import { navbarItems } from "../src/features/header/constants/navbar-items";

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("desktop", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({
        width: 1080,
        height: 800,
      });
    });

    test("header is displayed with logo icon", async ({ page }) => {
      const header = page.getByRole("banner");
      const logo = header.getByRole("link", { name: "logo" });
      await expect(logo).toHaveAttribute("href", "/");
      await expect(logo.getByRole("img")).toBeVisible();
    });

    test("header is displayed with navigation links", async ({ page }) => {
      const header = page.getByRole("banner");
      const navbar = header.getByRole("navigation");
      await checkNavbarLinks(navbar);
    });
    test("hamburger is not visible", async ({ page }) => {
      await expect(page.getByLabel(/hamburger/i)).toBeHidden();
    });
  });
  test.describe("mobile", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({
        width: 320,
        height: 480,
      });
    });

    test("hamburger is visible", async ({ page }) => {
      await expect(page.getByLabel(/hamburger/i)).toBeVisible();
    });

    test("hamburger menu should open after click the hamburger", async ({
      page,
    }) => {
      await page.getByLabel(/hamburger/i).click();
      await expect(
        page.getByRole("banner").getByTestId(/desktop nav/i)
      ).toBeHidden();
      const hamburgeMenu = page.getByRole("banner").getByTestId(/mobile nav/i);
      await expect(hamburgeMenu).toBeInViewport();
      await checkNavbarLinks(hamburgeMenu);
    });
  });
});

async function checkNavbarLinks(navbarElement: Locator) {
  const navbarLinks = await navbarElement.getByRole("link").all();
  expect(navbarLinks).toHaveLength(navbarItems.length);
  // @ts-expect-error
  for (const [index, value] of navbarLinks.entries()) {
    await expect(value).toHaveAttribute("href", navbarItems[index].href);
  }
}
