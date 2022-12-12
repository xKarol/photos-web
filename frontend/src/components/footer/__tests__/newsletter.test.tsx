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

jest.mock("axios");

describe("Newsletter", () => {
  let inputElement: HTMLElement;
  let buttonElement: HTMLElement;
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Newsletter />
      </QueryClientProvider>
    );
    inputElement = screen.getByRole("textbox");
    buttonElement = screen.getByRole("button", {
      name: /Submit/i,
    });
  });

  it("button should be disabled when input is empty", () => {
    expect(inputElement).toHaveValue("");
    expect(buttonElement).toBeDisabled();
  });

  it("input should be email type and be required", () => {
    expect(inputElement).toHaveAttribute("type", "email");
    expect(inputElement).toHaveAttribute("required");
  });

  it("button should not be disabled when text is passed", () => {
    fireEvent.change(inputElement, { target: { value: "email" } });
    expect(inputElement).toHaveValue("email");

    expect(buttonElement).not.toBeDisabled();
  });

  it("should display success message", async () => {
    fireEvent.change(inputElement, { target: { value: "email@gmail.com" } });
    expect(inputElement).toHaveValue("email@gmail.com");

    expect(buttonElement).not.toBeDisabled();
    fireEvent.click(buttonElement);

    const infoElement = await screen.findByText(
      /Thanks for subscribe to our newsletter!/i
    );
    expect(infoElement).toBeVisible();
  });

  it.skip("should display error message", async () => {
    //TODO fix this test
    server.use(
      rest.post("/newsletter/subscribe", (_req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    fireEvent.change(inputElement, { target: { value: "email@gmail.com" } });
    expect(inputElement).toHaveValue("email@gmail.com");

    expect(buttonElement).not.toBeDisabled();
    fireEvent.click(buttonElement);

    const infoElement = await screen.findByText(
      /Thanks for subscribe to our newsletter!/i
    );
    expect(infoElement).not.toBeVisible();
  });
});
