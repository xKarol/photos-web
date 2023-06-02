import { render, screen } from "@testing-library/react";
import React from "react";

import ReactQueryProvider from "../../../tests/react-query";
import { Footer } from "../index";

const setup = () =>
  render(
    <ReactQueryProvider>
      <Footer />
    </ReactQueryProvider>
  );

describe("Footer", () => {
  it("should contain newsletter", () => {
    setup();

    const newsletterText = screen.getByRole("heading", {
      name: /Newsletter/i,
    });
    expect(newsletterText).toBeInTheDocument();

    const newsletterForm = screen.getByRole("form");
    expect(newsletterForm).toBeInTheDocument();
  });

  it("should contain socials links", () => {
    setup();

    const socials = screen.getAllByRole("link");
    expect(socials.length).toBeGreaterThan(0);

    for (const social of socials) {
      expect(social).toHaveAttribute("href");
      expect(social).not.toBeEmptyDOMElement();
    }
  });
});
