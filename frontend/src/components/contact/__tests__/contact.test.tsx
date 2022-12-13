import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { Contact } from "../index";
import { faker } from "@faker-js/faker";
import { server } from "../../../__mocks__/server";
import { rest } from "msw";

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

jest.mock("axios");

describe("Contact", () => {
  let submitElement: HTMLElement;
  let inputElements: HTMLElement[];

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Contact />
      </QueryClientProvider>
    );
    submitElement = screen.getByRole("button", { name: /Submit/i });
    inputElements = screen.getAllByRole("textbox");
  });

  it("should contain heading", () => {
    const heading = screen.getByRole("heading", { name: /Contact/i });
    expect(heading).toBeVisible();
  });

  it("submit should be visible", () => {
    expect(submitElement).toBeVisible();
  });

  it("errors should not be visible on initial load", () => {
    const errors = screen.queryAllByRole("alert");
    expect(errors.length).toBe(0);
  });

  it("inputs should be empty on initial load", async () => {
    for (const inputElement of inputElements) {
      expect(inputElement).toHaveValue("");
    }
  });

  it("errors should be shown when inputs are empty after submit", async () => {
    const user = userEvent.setup();

    await user.click(submitElement);
    const errors = await screen.findAllByRole("alert");
    expect(errors.length).toBe(inputElements.length);
  });

  it("one error should be hidden after passing valid input value", async () => {
    const user = userEvent.setup();

    await user.type(inputElements[0], faker.name.firstName());
    await user.click(submitElement);

    const errors = await screen.findAllByRole("alert");
    expect(errors.length).toBe(inputElements.length - 1);
  });

  it("should reset form after OK response ", async () => {
    const user = userEvent.setup();
    const inputsData = generateFakeFormData();

    for await (const [index, value] of inputsData.entries()) {
      const input = inputElements[index];
      await user.type(input, value);
      expect(input).toHaveValue(value);
    }

    await user.click(submitElement);

    for (const input of inputElements) {
      expect(input).toHaveValue("");
    }
  });

  it.skip("should display error message", async () => {
    // TODO FIX mocking api
    cleanup();
    server.use(
      rest.post("/contact", (_req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Contact />
      </QueryClientProvider>
    );

    const user = userEvent.setup();
    const inputsData = generateFakeFormData();

    const submitElement = screen.getByRole("button", { name: /Submit/i });
    const inputElements = screen.getAllByRole("textbox");

    for await (const [index, value] of inputsData.entries()) {
      const input = inputElements[index];
      await user.type(input, value);
    }
    await user.click(submitElement);

    const infoElement = await screen.findByRole("alert", {
      name: /Unknown error/i,
    });
    expect(infoElement).toBeInTheDocument();
  });
});
