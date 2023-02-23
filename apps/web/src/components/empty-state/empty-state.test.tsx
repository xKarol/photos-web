import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmptyState from "./empty-state";

describe("Empty State", () => {
  it("default heading should contain text", () => {
    render(<EmptyState />);
    expect(screen.getByRole("heading")).not.toBeEmptyDOMElement();
    expect(typeof screen.getByRole("heading").textContent).toBe("string");
  });

  it("heading should contain custom text", () => {
    render(<EmptyState text="custom" />);
    expect(screen.getByRole("heading").textContent).toBe("custom");
  });

  it("empty state animation should render by default", () => {
    render(<EmptyState />);
    expect(
      screen.getByLabelText(/animation of empty state/i)
    ).toBeInTheDocument();
  });

  it("button should not be rendered initially", () => {
    render(<EmptyState text="custom" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("button should render when showButton prop = true", () => {
    render(<EmptyState showButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("button should render without spinner", () => {
    render(<EmptyState showButton />);
    const button = screen.getByRole("button");
    expect(within(button).queryByRole("alert")).not.toBeInTheDocument();
  });

  it("button should contain default text", () => {
    render(<EmptyState showButton />);
    expect(screen.getByRole("button")).toHaveTextContent(/refresh/i);
  });

  it("loading spinner should be visible when prop isLoading = true", () => {
    render(<EmptyState showButton isLoading={true} />);
    const button = screen.getByRole("button");
    expect(
      within(button).getByLabelText(/loading spinner/i)
    ).toBeInTheDocument();
  });

  it("handleRefresh function should be called once after click the button", async () => {
    const handleRefresh = jest.fn();
    render(<EmptyState showButton handleRefresh={handleRefresh} />);
    expect(handleRefresh).toHaveBeenCalledTimes(0);
    const button = screen.getByRole("button");
    const { click } = userEvent.setup();
    await click(button);
    expect(handleRefresh).toHaveBeenCalledTimes(1);
  });

  it("handleRefresh should not be called after click the button when spinner is visible", async () => {
    const handleRefresh = jest.fn();
    render(
      <EmptyState showButton isLoading={true} handleRefresh={handleRefresh} />
    );
    const button = screen.getByRole("button");
    const { click } = userEvent.setup();
    await click(button);
    expect(handleRefresh).toHaveBeenCalledTimes(0);
  });
});
