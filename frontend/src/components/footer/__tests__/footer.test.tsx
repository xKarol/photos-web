import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Footer } from "../index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Footer", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Footer />
      </QueryClientProvider>
    );
  });

  it("should contain newsletter", () => {
    const newsletterText = screen.getByRole("heading", {
      name: /Newsletter/i,
    });
    expect(newsletterText).toBeInTheDocument();

    const newsletterForm = screen.getByRole("form");
    expect(newsletterForm).toBeInTheDocument();
  });

  it("should contain socials links", () => {
    const socials = screen.getAllByRole("link");
    expect(socials.length).toBeGreaterThan(0);

    socials.forEach((social) => {
      expect(social).toHaveAttribute("href");
      expect(social).not.toBeEmptyDOMElement();
    });
  });
});
