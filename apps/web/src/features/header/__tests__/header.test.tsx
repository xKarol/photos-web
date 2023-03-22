import mediaQuery from "css-mediaquery";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "../index";
import { navbarItems } from "../constants/navbar-items";

jest.mock("next/router", () => require("next-router-mock"));

const setup = () => {
  render(<Header />);
};

describe("Header", () => {
  it("logo should be visible", () => {
    setup();

    const logo = screen.getByRole("figure");
    expect(logo).toBeInTheDocument();
  });

  describe("Desktop view", () => {
    beforeAll(() => {
      mockMatchMedia(1024);
    });

    it("navbar should be visible", () => {
      setup();
      const nav = screen.getByTestId("desktop navbar");
      expect(nav).toBeInTheDocument();
    });

    it("navbar should contain valid content", () => {
      setup();

      const nav = screen.getByRole("navigation");
      const links = within(nav).getAllByRole("link");

      checkNavbarContent(links);
      expect(nav).not.toBeEmptyDOMElement();
    });

    it("hamburger should not be visible", () => {
      setup();
      const hamburger = screen.getByTestId("hamburger-button");
      expect(hamburger.className).toMatch("hidden");
      expect(hamburger.className).not.toMatch("block");
    });
  });

  describe("Mobile view", () => {
    beforeAll(() => {
      mockMatchMedia(360);
    });

    it("hamburger should be visible", () => {
      setup();

      const hamburger = screen.getByTestId("hamburger-button");
      expect(hamburger).toBeVisible();
    });

    it("desktop navbar should not be visible", () => {
      setup();
      const nav = screen.getByTestId("desktop navbar");
      expect(nav.className).toMatch("hidden");
    });

    it("hamburger menu should not initially be in the document", () => {
      setup();
      const nav = screen.queryByTestId("mobile navbar");
      expect(nav).not.toBeInTheDocument();
    });

    it("should open hamburger menu after click", async () => {
      setup();
      const hamburger = screen.getByLabelText(/hamburger/i);
      const { click } = userEvent.setup();

      await click(hamburger);

      const nav = screen.getByTestId("mobile navbar");
      expect(nav).toBeInTheDocument();
    });

    it("hamburger button should be still visible when menu is opened", async () => {
      setup();
      const hamburger = screen.getByLabelText(/hamburger/i);
      const { click } = userEvent.setup();

      await click(hamburger);

      const nav = screen.getByTestId("mobile navbar");
      expect(nav).toBeInTheDocument();
      expect(hamburger).toBeVisible();
    });

    it("desktop navbar should not be visible when mobile menu is active", async () => {
      setup();
      const hamburger = screen.getByLabelText(/hamburger/i);
      const { click } = userEvent.setup();
      await click(hamburger);

      const nav = screen.getByTestId("desktop navbar");
      expect(nav.className).toMatch("hidden");
    });

    it("hamburger menu should contain valid elements", async () => {
      setup();

      const hamburger = screen.getByLabelText(/hamburger/i);
      const { click } = userEvent.setup();
      await click(hamburger);

      const nav = screen.getByTestId("mobile navbar");
      const links = within(nav).getAllByRole("link");
      expect(nav).not.toBeEmptyDOMElement();
      checkNavbarContent(links);
    });

    it("mobile menu should not be visible after click hamburger button", async () => {
      setup();
      const hamburger = screen.getByLabelText(/hamburger/i);
      const { click } = userEvent.setup();

      await click(hamburger);
      const nav = screen.getByTestId("mobile navbar");
      expect(nav).toBeInTheDocument();

      await click(hamburger);
      expect(nav).not.toBeInTheDocument();
    });

    it("body scroll should be locked when menu is active", async () => {
      setup();
      const hamburger = screen.getByLabelText(/hamburger/i);
      const { click } = userEvent.setup();
      await click(hamburger);

      expect(document.body).toHaveStyle("overflow: hidden");
    });

    it("body scroll should not be locked when menu is not active", async () => {
      setup();
      const hamburger = screen.getByLabelText(/hamburger/i);
      const { click } = userEvent.setup();
      await click(hamburger);
      await click(hamburger);

      expect(document.body).not.toHaveStyle("overflow: hidden");
    });
  });
});

function checkNavbarContent(links: HTMLElement[]) {
  for (const [index, link] of Object.entries(links)) {
    expect(link).toHaveAttribute("href", navbarItems[+index].href);
    expect(link).toHaveTextContent(navbarItems[+index].text);
  }
}

function mockMatchMedia(width: number) {
  // @ts-expect-error
  return (window.matchMedia = (query: string) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  }));
}
