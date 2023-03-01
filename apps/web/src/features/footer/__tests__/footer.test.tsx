import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Footer } from "../index";

const setup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Footer />
    </QueryClientProvider>
  );

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

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
