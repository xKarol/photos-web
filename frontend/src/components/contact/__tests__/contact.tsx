import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Contact } from "../index";
import { faker } from "@faker-js/faker";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.mock("axios");

describe("Contact", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Contact />
      </QueryClientProvider>
    );
  });

  it("should contain heading", () => {
    const heading = screen.getByRole("heading", { name: /Contact/i });
    expect(heading).toBeVisible();
  });

  it("submit should be visible", () => {
    const button = screen.getByRole("button", { name: /Submit/i });
    expect(button).toBeVisible();
  });

  it("errors should not be visible on initial load", () => {
    const errors = screen.queryAllByRole("alert");
    expect(errors.length).toBe(0);
  });

  it("inputs should be empty on initial load", async () => {
    const inputs = await screen.findAllByRole("textbox");
    inputs.forEach((inputElement) => {
      expect(inputElement).toHaveValue("");
    });
  });

  it("errors should be shown when inputs are empty after submit", async () => {
    const button = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(button);
    const errors = await screen.findAllByRole("alert");
    const inputs = await screen.findAllByRole("textbox");
    expect(errors.length).toBe(inputs.length);
  });

  it("one error should be hidden after passing valid input value", async () => {
    const button = screen.getByRole("button", { name: /Submit/i });

    const inputs = await screen.findAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "testname" } });

    fireEvent.click(button);

    const errors = await screen.findAllByRole("alert");
    expect(errors.length).toBe(inputs.length - 1);
  });

  it.skip("should reset form after OK response ", async () => {
    // TODO FIX test
    const inputsData = [
      faker.name.firstName(),
      faker.name.lastName(),
      faker.internet.email(),
      faker.lorem.paragraph(),
      faker.lorem.text(),
    ];
    let inputs = screen.getAllByRole("textbox");
    inputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: inputsData[index] } });
      expect(input).toHaveValue(inputsData[index]);
    });
    const button = screen.getByRole("button", { name: /Submit/i });
    fireEvent.submit(button);

    screen.debug();
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Submit/i })
      ).toBeInTheDocument()
    );

    inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toHaveValue("");
    });
  });
});
