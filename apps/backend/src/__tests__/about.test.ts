import supertest from "supertest";
import app from "../app";
import type { API } from "types";
import * as upload from "../services/cloudinary";
import { prisma } from "../db";
import crypto from "node:crypto";

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

jest.mock("../services/cloudinary");

const mockReturnValue = () => {
  const uniqueId = crypto.randomUUID();
  return Promise.resolve({
    id: uniqueId,
    src: `test/${uniqueId}`,
    width: 500,
    height: 500,
    placeholder: "test",
    mimeType: "image/webp",
  });
};

describe("about", () => {
  jest.spyOn(upload, "uploadPhoto").mockImplementation(mockReturnValue);

  describe("GET /about/image (get about image data)", () => {
    beforeAll(async () => {
      await prisma.image.create({
        data: { ...(await mockReturnValue()), alt: "test" },
      });
    });

    it("should return valid data", async () => {
      const { body } = await request.get("/about/image").expect(200);
      // TODO parse with zod
      console.log(body);
      expect(body).toMatchObject<API["About"]["Get"]>(checkAboutResponse());
    });
  });
  describe("PUT /about/image (upload about image)", () => {
    let imageId: string;
    it("should upload new about image", async () => {
      const { body } = await request
        .put("/about/image")
        .attach("image", Buffer.from("test", "base64"), "test.jpg")
        .field("alt", "test")
        .expect(200);

      imageId = body.id;
      expect(body).toMatchObject<API["About"]["Get"]>(checkAboutResponse());
    });
    it("uploaded image should exist", async () => {
      const count = await prisma.image.count({
        where: { type: "ABOUT", id: imageId },
      });
      expect(count).toBe(1);
    });
    // it("only one about image should exist", async () => {
    //   jest.spyOn(upload, "uploadPhoto").mockImplementationOnce(mockReturnValue);

    //   await prisma.image.create({
    //     data: { ...(await mockReturnValue()), alt: "test" },
    //   });
    //   await prisma.image.create({
    //     data: { ...(await mockReturnValue()), alt: "test" },
    //   });
    //   const count = await prisma.image.count({
    //     where: { type: "ABOUT" },
    //   });
    //   expect(count).toBe(1);
    // });
  });
});
