import { faker } from "@faker-js/faker";
import { test, expect, type Locator } from "@playwright/test";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("user is able to submit when form is filled", async ({ page }) => {
    const form = page.getByRole("form", { name: /contact us/i });
    await fillForm(form);
    await form.getByRole("button").click();
    const inputs = await form.getByRole("textbox").all();
    for await (const input of inputs) {
      await expect(input).toHaveValue("");
    }
    const errors = await form.getByRole("alert").all();
    expect(errors.length).toBe(1);

    const submitInfo = form.getByText(/message has been sent/i);
    await expect(submitInfo).toBeVisible();
  });

  test("user is unable to submit when form is not filled", async ({ page }) => {
    const form = page.getByRole("form", { name: /contact us/i });
    await form.getByRole("button").click();
    const inputs = await form.getByRole("textbox").all();
    const errors = await form.getByRole("alert").all();

    expect(errors.length - 1).toBe(inputs.length);
  });
});

async function fillForm(formElement: Locator) {
  const inputs = await formElement.getByRole("textbox").all();
  const inputValues = [
    faker.name.firstName(),
    faker.name.lastName(),
    faker.internet.email(),
    faker.lorem.words(10),
    faker.lorem.words(30),
  ];

  for await (const [index, value] of inputValues.entries()) {
    await inputs[index].type(value);
  }
}
