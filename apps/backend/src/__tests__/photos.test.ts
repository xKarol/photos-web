import supertest from "supertest";
import app from "../app";
import { prisma } from "../lib/prisma";
import "../mocks/cloudinary";
import "../mocks/auth";
import { createPhoto } from "../services/photos";
// eslint-disable-next-line import/order
import { faker } from "@faker-js/faker";
import { errorSchema } from "../schemas/error";

jest.mock("../middlewares/require-auth");

const request = supertest(app);

describe("Photos", () => {
  afterAll(async () => {
    await prisma.photos.deleteMany({});
  });

  describe("POST /photos", () => {
    it("should upload new photo", async () => {
      const { body } = await request
        .post("/photos")
        .attach("image", Buffer.from("test", "base64"), "test.jpg")
        .field("alt", "test")
        .expect(200);

      expect(body).not.toBeEmptyObject();
    });

    it("should return error when alt and file was not provided", async () => {
      const { body } = await request.post("/photos").expect(400);
      expect(parseError(body)).toBe(true);
    });

    it("should return error when file was not provided", async () => {
      const { body } = await request
        .post("/photos")
        .field("alt", "test")
        .expect(400);
      expect(parseError(body)).toBe(true);
    });

    it("should return error when alt was not provided", async () => {
      const { body } = await request
        .post("/photos")
        .attach("image", Buffer.from("test", "base64"), "test.jpg")
        .expect(400);

      expect(parseError(body)).toBe(true);
    });
  });

  describe("GET /photos/:photoId", () => {
    it("should return valid photo data", async () => {
      const id = await createPhotoRecord();
      const { body } = await request.get(`/photos/${id}`).expect(200);
      expect(body).not.toBeEmptyObject();
    });

    it("should throw error when photo not exist", async () => {
      const { body } = await request.get("/photos/invalidPhotoId").expect(404);
      expect(parseError(body)).toBe(true);
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
      const id = await createPhotoRecord();
      const { body } = await request.delete(`/photos/${id}`).expect(200);
      expect(body).toBeEmptyObject();

      const isExist = !!(await prisma.photos.count({ where: { imageId: id } }));
      expect(isExist).toBe(false);
    });

    it("should throw error when photo not exist", async () => {
      const { body } = await request
        .delete("/photos/invalidPhotoId")
        .expect(404);
      expect(parseError(body)).toBe(true);
    });
  });
});

async function createPhotoRecord() {
  const id = faker.database.mongodbObjectId();
  await createPhoto({
    id: id,
    src: faker.internet.url(),
    alt: faker.lorem.word(),
    height: 100,
    width: 100,
    mimeType: "image/webp",
  });
  return id;
}

function parseError(body: unknown) {
  return errorSchema.safeParse(body).success;
}
