/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, test } from "@playwright/test";

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("footer contains valid socials links", async ({ page }) => {});
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
