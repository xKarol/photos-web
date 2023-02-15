import dotenv from "dotenv";
import { server } from "./src/mocks/server";
import "./src/mocks/logger";

dotenv.config({ path: "./.env.test" });

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
