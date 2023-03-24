import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rest } from "msw";
import { API } from "types";
// eslint-disable-next-line jest/no-mocks-import
import { server } from "../../../__mocks__/server";
import Portfolios from "../portfolios";
import { getFakePortfolioData, getMany } from "../../../utils/test";

const setup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Portfolios />
    </QueryClientProvider>
  );

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Portfolios", () => {
  it("should render empty state component", () => {
    server.use(
      rest.get("/portfolios", (_req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ status: 400, message: "Test Error Message" })
        );
      })
    );
    setup();
    expect(screen.getByLabelText(/animation/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /no portfolios found/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it.failing("empty state should not be visible when data is available", () => {
    setup();
    expect(screen.queryByLabelText(/animation/i)).not.toBeInTheDocument();
  });

  // TODO fix this test
  it.skip("list links should have valid href", () => {
    const data = mockPortfolios();
    setup();
    const linksElements = screen.getAllByRole("link");
    console.log(
      linksElements.map((el) => el.getAttribute("href")).length,
      data.map((el) => `/${el.slug}`).length
    );
    for (const [index, portfolio] of Object.entries(data)) {
      expect(linksElements[+index]).toHaveAttribute(
        "href",
        `/${portfolio.slug}`
      );
    }
  });

  it.skip("should render valid images", () => {
    const data = mockPortfolios();
    setup();
    const imageElements = screen.getAllByRole("img");
    for (const [index, portfolio] of Object.entries(data)) {
      for (const portfolioImage of portfolio.images) {
        expect(imageElements[+index].getAttribute("src")).toMatch(
          encodeURIComponent(portfolioImage.src)
        );
        expect(imageElements[+index]).toHaveAttribute(
          "alt",
          portfolioImage.alt
        );
      }
    }
  });
});

function mockPortfolios() {
  const data = getMany(getFakePortfolioData, { min: 5, max: 5 });
  server.use(
    rest.get("/portfolios", (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json<API["Portfolios"]["Get"]>({
          nextPage: undefined,
          limit: 5,
          data: data,
        })
      );
    })
  );
  return data;
}
