import supertest from "supertest";
import app from "../app";
import type { API } from "types";

const request = supertest(app);

describe("about", () => {
  describe("GET /about/image (get about image data)", () => {
    it("should return valid data", async () => {
      const { body } = await request.get("/about/image").expect(200);
      // TODO parse with zod
      expect(body).toMatchObject<API["About"]["Get"]>({
        id: expect.any(String),
        alt: expect.any(String),
        height: expect.any(Number),
        width: expect.any(Number),
        mimeType: expect.any(String),
        type: expect.any(String),
        src: expect.any(String),
        createdAt: expect.any(String),
        placeholder: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
  //   describe("PUT /about/image (upload about image)", () => {});
});
