import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "./input-field";

describe("InputField", () => {
  it("should render 'input' element", () => {
    render(<InputField />);
    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl.nodeName).toBe("INPUT");
  });

  it("'textarea' element should render when textarea was provided", () => {
    render(<InputField textarea />);
    const textareaEl = screen.getByRole("textbox");
    expect(textareaEl).toBeInTheDocument();
    expect(textareaEl.nodeName).toBe("TEXTAREA");
  });

  it("should render label text", () => {
    render(<InputField label="test" />);
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it("base component should render without required * character", () => {
    render(<InputField />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("* should be visible when required prop is set", () => {
    render(<InputField required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("error message should not be visible in base component", () => {
    render(<InputField />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("error message should be visible when provided", () => {
    render(<InputField error="custom error" />);
    expect(
      screen.getByRole("alert", { name: /custom error/i })
    ).toBeInTheDocument();
  });

  it("the classes of both elements should match", () => {
    render(<InputField />);
    const initialClasses = screen.getByRole("textbox").className;
    cleanup();
    render(<InputField textarea />);
    expect(screen.getByRole("textbox").className).toMatch(initialClasses);
  });

  it("label and required character should be displayed", () => {
    render(<InputField label="test label" required />);
    expect(screen.getByText(/test label/i).textContent).toBe("test label *");
  });

  it("the user can type in the text box", async () => {
    render(<InputField />);
    const inputElement = screen.getByRole("textbox");
    const value = "custom value";
    const { type } = userEvent.setup();
    await type(inputElement, value);
    expect(inputElement).toHaveValue(value);
  });

  it("'text' should be default input type", () => {
    render(<InputField />);
    expect(screen.getByRole("textbox").getAttribute("type")).toBe("text");
  });

  it("input should render with custom input type", () => {
    render(<InputField type="email" />);
    expect(screen.getByRole("textbox").getAttribute("type")).toBe("email");
  });

  it("input should not have min-h class", () => {
    render(<InputField textarea={false} />);
    expect(screen.getByRole("textbox").className).not.toMatch("min-h");
  });

  it("textarea should have min-h class", () => {
    render(<InputField textarea />);
    expect(screen.getByRole("textbox").className).toMatch("min-h");
  });
});
