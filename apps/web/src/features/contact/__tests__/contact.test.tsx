import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { rest } from "msw";
import ContactForm from "../components/form";
// eslint-disable-next-line jest/no-mocks-import
import { server } from "../../../__mocks__/server";
import ReactQueryProvider from "../../../tests/react-query";

const setup = () =>
  render(
    <ReactQueryProvider>
      <ContactForm />
    </ReactQueryProvider>
  );

const getSubmitElement = () => screen.getByRole("button");
const getInputElements = () => screen.getAllByRole("textbox");

describe("Contact Form", () => {
  jest.setTimeout(10_000);

  it("should contain heading", () => {
    setup();
    const heading = screen.getByRole("heading", { name: /Contact/i });
    expect(heading).toBeVisible();
  });

  it("submit should be visible", () => {
    setup();
    expect(getSubmitElement()).toBeVisible();
  });

  it("errors should not be visible on initial load", () => {
    setup();
    const errors = screen.queryAllByRole("alert");
    expect(errors.length).toBe(0);
  });

  it("inputs should be empty on initial load", async () => {
    setup();
    const inputElements = getInputElements();
    for (const inputElement of inputElements) {
      expect(inputElement).toHaveValue("");
    }
  });

  it("errors should be shown when inputs are empty after submit", async () => {
    setup();

    const { click } = userEvent.setup();
    const submitElement = getSubmitElement();
    await click(submitElement);

    const inputElements = getInputElements();
    const errors = await screen.findAllByRole("alert");
    expect(errors.length).toBe(inputElements.length);
  });

  it("one error should be hidden after passing valid input value", async () => {
    setup();

    const { type, click } = userEvent.setup();

    await click(getSubmitElement());
    const inputElements = getInputElements();
    await type(inputElements[0], faker.name.firstName());

    const errors = await screen.findAllByRole("alert");
    expect(errors.length).toBe(inputElements.length - 1);
  });

  it("should reset form after OK response", async () => {
    setup();

    await fillForm();
    const { click } = userEvent.setup();
    await click(getSubmitElement());

    const inputElements = getInputElements();
    for (const input of inputElements) {
      expect(input).toHaveValue("");
    }
  });

  it("should display error message", async () => {
    server.use(
      rest.post("/contact", (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json({}));
      })
    );

    setup();
    await fillForm();
    const { click } = userEvent.setup();
    await click(getSubmitElement());

    const infoElement = await screen.findByRole("alert");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent(/Unknown error/i);
  });

  it("should display OK message", async () => {
    setup();
    await fillForm();
    const { click } = userEvent.setup();
    await click(getSubmitElement());

    const infoElement = await screen.findByRole("alert");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent(/Message has been sent/i);
  });
});

async function fillForm() {
  const formData = [
    faker.name.firstName(),
    faker.name.lastName(),
    faker.internet.email(),
    faker.lorem.words(10),
    faker.lorem.words(30),
  ];

  const inputElements = getInputElements();
  const { type } = userEvent.setup();

  for await (const [index, value] of formData.entries()) {
    const input = inputElements[index];
    await type(input, value);
    expect(input).toHaveValue(value);
  }
}
