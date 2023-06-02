import dotenv from "dotenv";

import "./src/mocks/logger";
import { server } from "./src/mocks/server";

dotenv.config({ path: "./.env.test" });

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
