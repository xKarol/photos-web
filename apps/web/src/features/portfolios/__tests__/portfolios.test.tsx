import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rest } from "msw";
// eslint-disable-next-line jest/no-mocks-import
import { server } from "../../../__mocks__/server";
import Portfolios from "../portfolios";

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
      rest.post("/portfolios", (_req, res, ctx) => {
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
  it("should render portfolios list", () => {
    // TODO create more tests...
  });
});
