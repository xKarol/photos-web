import { render, screen } from "@testing-library/react";

import LoadingButton from "./loading-button";

describe("Loading Button", () => {
  it("spinner should not be visible when isLoading = false", () => {
    render(<LoadingButton isLoading={false} />);
    expect(screen.queryByRole(/loading spinner/i)).not.toBeInTheDocument();
  });

  it("spinner should be visible when isLoading = true", () => {
    render(<LoadingButton isLoading={true} />);
    expect(screen.getByLabelText(/loading spinner/i)).toBeInTheDocument();
  });

  it("button should not be disabled when spinner is not visible", () => {
    render(<LoadingButton isLoading={false} />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("button should be disabled when spinner is visible", () => {
    render(<LoadingButton isLoading={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("custom spinner component should be visible", () => {
    render(
      <LoadingButton
        LoadingComponent={<div data-testid="custom-spinner">Loading...</div>}
        isLoading={true}
      />
    );
    expect(screen.getByTestId("custom-spinner")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("custom spinner component should not be visible when spinner is not visible", () => {
    render(
      <LoadingButton
        LoadingComponent={<div data-testid="custom-spinner">Loading...</div>}
        isLoading={false}
      />
    );
    expect(screen.queryByTestId("custom-spinner")).not.toBeInTheDocument();
  });

  it("custom spinner should contain valid default props", () => {
    render(
      <LoadingButton
        LoadingComponent={<div data-testid="custom-spinner">Loading...</div>}
        isLoading={true}
      />
    );
    expect(screen.getByTestId("custom-spinner")).toHaveAttribute("aria-live");
    expect(screen.getByTestId("custom-spinner").classList.length).not.toBe(0);
  });
});
