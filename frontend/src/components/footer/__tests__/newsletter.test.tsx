import { fireEvent, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { QueryClient, QueryClientProvider } from "react-query";
import { server } from "../../../__mocks__/server";
import Newsletter from "../newsletter";

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
const getButtonElement = () =>
  screen.getByRole("button", {
    name: /Submit/i,
  });

jest.mock("axios");

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

  it("button should not be disabled when text is passed", () => {
    setup();

    const inputElement = getInputElement();

    fireEvent.change(inputElement, { target: { value: "email" } });
    expect(inputElement).toHaveValue("email");

    const buttonElement = getButtonElement();
    expect(buttonElement).not.toBeDisabled();
  });

  it("should display success message", async () => {
    setup();

    const inputElement = getInputElement();

    const inputValue = "email@gmail.com";
    fireEvent.change(inputElement, { target: { value: inputValue } });
    expect(inputElement).toHaveValue(inputValue);

    const buttonElement = getButtonElement();
    expect(buttonElement).not.toBeDisabled();
    fireEvent.click(buttonElement);

    const infoElement = await screen.findByText(
      /Thanks for subscribe to our newsletter!/i
    );
    expect(infoElement).toBeVisible();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("should display error message", async () => {
    setup();

    //TODO fix this test
    server.use(
      rest.post("/newsletter/subscribe", (_req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    const inputElement = getInputElement();

    fireEvent.change(inputElement, { target: { value: "email@gmail.com" } });
    expect(inputElement).toHaveValue("email@gmail.com");

    const buttonElement = getButtonElement();
    expect(buttonElement).not.toBeDisabled();
    fireEvent.click(buttonElement);

    const infoElement = await screen.findByText(
      /Thanks for subscribe to our newsletter!/i
    );
    expect(infoElement).not.toBeVisible();
  });
});
