import { render, screen, within } from "@testing-library/react";
import { Header } from "../index";
import { navbarItems } from "../navbar-items";

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
    expect(links.length).toBe(navbarItems.length);
  });

  it("should contain valid content", () => {
    setup();

    const nav = screen.getByRole("navigation");
    const links = within(nav).getAllByRole("link");

    for (const [index, link] of Object.entries(links)) {
      expect(link).toHaveAttribute("href", navbarItems[+index].href);
      expect(link).toHaveTextContent(navbarItems[+index].text);
    }
  });

  it("hamburger should be visible", () => {
    setup();

    const hamburger = screen.queryByLabelText(/navbar/i);
    expect(hamburger).not.toBeInTheDocument();
  });
});
