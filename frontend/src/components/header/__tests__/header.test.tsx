import { render, screen, within } from "@testing-library/react";
import { Header } from "../index";

const setup = () => render(<Header />);

describe("Header", () => {
  it("should contain logo", () => {
    setup();

    const logo = screen.getByRole("figure");
    expect(logo).toBeInTheDocument();
  });

  it("should contain navbar links", () => {
    setup();

    const nav = screen.getByRole("navigation");
    expect(nav).not.toBeEmptyDOMElement();
    const links = within(nav).getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);

    for (const link of links) {
      expect(link).toHaveAttribute("href");
      expect(link).not.toBeEmptyDOMElement();
    }
  });
});
