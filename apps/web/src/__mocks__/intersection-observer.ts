import { setupIntersectionMocking } from "react-intersection-observer/test-utils";

setupIntersectionMocking(jest.fn);

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
