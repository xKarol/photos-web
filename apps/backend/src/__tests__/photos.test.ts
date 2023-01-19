import supertest from "supertest";
import app from "../app";
import * as upload from "../services/cloudinary";
import crypto from "node:crypto";
import { prisma } from "../db";

const request = supertest(app);

// TODO mock this test
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

describe("Photos", () => {
  jest.spyOn(upload, "uploadPhoto").mockImplementation(mockReturnValue);
  let id: string;

  beforeAll(async () => {
    await prisma.photos.deleteMany({});
  });

  describe("POST /photos", () => {
    it("should upload new photo", async () => {
      const { body } = await request
        .post("/photos")
        .attach("image", Buffer.from("test", "base64"), "test.jpg")
        .field("alt", "test")
        .expect(200);

      // TODO zod parse
      id = body.id;
      expect(body).not.toBeEmptyObject();
    });
    // TODO testing when file or alt was not provided
  });
  describe("GET /photos/:photoId", () => {
    it("should return valid photo data", async () => {
      const { body } = await request.get(`/photos/${id}`).expect(200);

      // TODO zod parse
      expect(body).not.toBeEmptyObject();
    });
    it("should throw error when photo not exist", async () => {
      const { body } = await request.get("/photos/invalidPhotoId").expect(404);
      expect(body).toMatchObject({ message: /photo not found/i });
    });
  });
  describe("GET /photos", () => {
    it("should return valid photos data", async () => {
      const { body } = await request.get(`/photos`).expect(200);

      expect(body).toMatchObject({
        limit: expect.any(Number),
      });
      expect(body.nextPage).toBeOneOf([body.nextPage, undefined]);
      expect(body.data).toBeArray();
    });
    // TODO add more pagination tests
  });
  describe("DELETE /photos/:photoId", () => {
    it("should delete photo", async () => {
      const { body } = await request.delete(`/photos/${id}`).expect(200);
      expect(body).toBeEmptyObject();

      const isExist = !!(await prisma.photos.count({ where: { imageId: id } }));
      expect(isExist).toBe(false);
    });
    it("should throw error when photo not exist", async () => {
      const { body } = await request
        .delete("/photos/invalidPhotoId")
        .expect(404);
      expect(body).toMatchObject({ message: /photo not found/i });
    });
  });
});
