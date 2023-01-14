import { getImageUrl } from "../misc";

process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:5555"; //TODO fix loading env variables from .env.local file in tests

describe("misc", () => {
  describe("getImageUrl function", () => {
    const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    it("should return valid url", () => {
      const id = "testid";
      expect(getImageUrl(id)).toBe(
        `${SERVER_URL}/images/${encodeURIComponent(id)}`
      );
    });
    it("should not contain undefined in url", () => {
      expect(getImageUrl("id")).not.toMatch("undefined");
    });
  });
});
