import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { QueryClient, QueryClientProvider } from "react-query";
// eslint-disable-next-line jest/no-mocks-import
import { server } from "../../../__mocks__/server";
import Newsletter from "../components/newsletter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const setup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Newsletter />
    </QueryClientProvider>
  );

const getInputElement = () => screen.getByRole("textbox");
const getButtonElement = () => screen.getByRole("button");

describe("Newsletter", () => {
  it("button should be disabled when input is empty", () => {
    setup();
    const inputElement = getInputElement();
    expect(inputElement).toHaveValue("");
    const buttonElement = getButtonElement();
    expect(buttonElement).toBeDisabled();
  });

  it("input should be email type and be required", () => {
    setup();
    const inputElement = getInputElement();
    expect(inputElement).toHaveAttribute("type", "email");
    expect(inputElement).toHaveAttribute("required");
  });

  it("button should not be disabled when text is passed", async () => {
    setup();
    const inputElement = getInputElement();
    const { type } = userEvent.setup();
    await type(inputElement, "email");
    expect(inputElement).toHaveValue("email");
    const buttonElement = getButtonElement();
    expect(buttonElement).not.toBeDisabled();
  });

  it("should display success message", async () => {
    setup();

    const inputElement = getInputElement();
    const inputValue = "email@gmail.com";
    const { type, click } = userEvent.setup();
    await type(inputElement, inputValue);
    expect(inputElement).toHaveValue(inputValue);

    const buttonElement = getButtonElement();
    expect(buttonElement).not.toBeDisabled();
    await click(buttonElement);

    const infoElement = await screen.findByText(
      /Thanks for subscribe to our newsletter!/i
    );
    expect(infoElement).toBeVisible();
  });

  it("should display error message", async () => {
    server.use(
      rest.post(`/newsletter/subscribe`, (_req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    setup();

    const inputElement = getInputElement();
    const { type, click } = userEvent.setup();
    await type(inputElement, "email@gmail.com");
    expect(inputElement).toHaveValue("email@gmail.com");

    const buttonElement = getButtonElement();
    expect(buttonElement).not.toBeDisabled();
    await click(buttonElement);

    const infoElement = await screen.findByText(/Unknown error/i);
    expect(infoElement).toBeInTheDocument();
  });

  it("loading component should be visible after submit", async () => {
    setup();
    const inputElement = getInputElement();
    const { type, click } = userEvent.setup();

    await type(inputElement, "email@gmail.com");
    const spinnerElement = screen.queryByRole("alert");
    expect(spinnerElement).not.toBeInTheDocument();

    const buttonElement = getButtonElement();
    await click(buttonElement);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    await waitFor(() => expect(spinnerElement).not.toBeInTheDocument());
  });

  it("button should be disabled when loading state is active", async () => {
    setup();
    const inputElement = getInputElement();
    const { type, click } = userEvent.setup();

    await type(inputElement, "email@gmail.com");
    const buttonElement = getButtonElement();
    expect(buttonElement).not.toBeDisabled();
    await click(buttonElement);
    await waitFor(() => expect(buttonElement).toBeDisabled());
  });
});
