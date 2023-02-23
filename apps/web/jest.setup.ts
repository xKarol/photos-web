/* eslint-disable no-console */
import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";

import { QueryCache, setLogger } from "react-query";
import { server } from "./src/__mocks__/server";

const queryCache = new QueryCache();

setLogger({
  log: console.log,
  warn: console.warn,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
afterAll(() => server.close());
