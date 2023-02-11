import supertest from "supertest";
import type { API } from "types";
import app from "../app";
import { prisma } from "../db";
import "../mocks/cloudinary";
import "../mocks/auth";

jest.mock("../middlewares/require-auth");

const request = supertest(app);

const checkAboutResponse = () => ({
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

const uploadImage = async () => {
  const response = await request
    .put("/about/image")
    .attach("image", Buffer.from("test", "base64"), "test.jpg")
    .field("alt", "test")
    .expect(200);
  return response;
};

describe("about", () => {
  beforeAll(async () => {
    await prisma.image.deleteMany({ where: { type: "ABOUT" } });
  });

  describe("PUT /about/image (upload about image)", () => {
    let imageId: string;
    it("should upload new about image", async () => {
      const { body } = await uploadImage();
      imageId = body.id;
      expect(body).toMatchObject<API["About"]["Get"]>(checkAboutResponse());
    });
    it("uploaded image should exist", async () => {
      const count = await prisma.image.count({
        where: { type: "ABOUT", id: imageId },
      });
      expect(count).toBe(1);
    });
    it("only one about image should exist", async () => {
      await uploadImage();
      await uploadImage();

      const count = await prisma.image.count({
        where: { type: "ABOUT" },
      });
      expect(count).toBe(1);
    });
  });
  describe("GET /about/image (get about image data)", () => {
    it("should return valid data", async () => {
      const { body } = await request.get("/about/image").expect(200);
      // TODO parse with zod
      expect(body).toMatchObject<API["About"]["Get"]>(checkAboutResponse());
    });
  });
});
