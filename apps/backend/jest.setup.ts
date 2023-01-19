import { server } from "./src/mocks/server";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
