import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { faker } from "@faker-js/faker";
import { rest } from "msw";
import { Contact } from "../index";
// eslint-disable-next-line jest/no-mocks-import
import { server } from "../../../__mocks__/server";

const setup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Contact />
    </QueryClientProvider>
  );

const getSubmitElement = () => screen.getByRole("button", { name: /Submit/i });
const getInputElements = () => screen.getAllByRole("textbox");

const generateFakeFormData = () => {
  return [
    faker.name.firstName(),
    faker.name.lastName(),
    faker.internet.email(),
    faker.lorem.words(10),
    faker.lorem.words(30),
  ];
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Contact", () => {
  it("should contain heading", () => {
    setup();
    const heading = screen.getByRole("heading", { name: /Contact/i });
    expect(heading).toBeVisible();
  });

  it("submit should be visible", () => {
    setup();
    const submitElement = getSubmitElement();
    expect(submitElement).toBeVisible();
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

    const inputElements = getInputElements();
    await type(inputElements[0], faker.name.firstName());

    const submitElement = getSubmitElement();
    await click(submitElement);

    const errors = await screen.findAllByRole("alert");
    expect(errors.length).toBe(inputElements.length - 1);
  });

  it("should reset form after OK response", async () => {
    setup();

    const { type, click } = userEvent.setup();
    const inputsData = generateFakeFormData();
    const inputElements = getInputElements();

    for await (const [index, value] of inputsData.entries()) {
      const input = inputElements[index];
      await type(input, value);
      expect(input).toHaveValue(value);
    }

    const submitElement = getSubmitElement();
    await click(submitElement);

    for (const input of inputElements) {
      expect(input).toHaveValue("");
    }
  });

  it("should display error message", async () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    server.use(
      rest.post(`${BACKEND_URL}/contact`, (_req, res, ctx) => {
        return res(ctx.status(400), ctx.json({}));
      })
    );

    setup();

    const { type, click } = userEvent.setup();
    const inputsData = generateFakeFormData();

    const submitElement = screen.getByRole("button", { name: /Submit/i });
    const inputElements = screen.getAllByRole("textbox");

    for await (const [index, value] of inputsData.entries()) {
      const input = inputElements[index];
      await type(input, value);
    }
    await click(submitElement);

    const infoElement = await screen.findByRole("alert");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent(/Unknown error/i);
  });

  it("should display OK message", async () => {
    setup();

    const { type, click } = userEvent.setup();
    const inputsData = generateFakeFormData();

    const submitElement = screen.getByRole("button", { name: /Submit/i });
    const inputElements = screen.getAllByRole("textbox");

    for await (const [index, value] of inputsData.entries()) {
      const input = inputElements[index];
      await type(input, value);
    }
    await click(submitElement);

    const infoElement = await screen.findByRole("alert");
    expect(infoElement).toBeInTheDocument();
    expect(infoElement).toHaveTextContent(/Message has been sent./i);
  });
});
