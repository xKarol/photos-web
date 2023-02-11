import supertest from "supertest";
import { faker } from "@faker-js/faker";
import app from "../app";
import { prisma } from "../db";
import "../mocks/auth";

jest.mock("../middlewares/require-auth");

const request = supertest(app);

describe("Contact", () => {
  beforeAll(async () => {
    prisma.contact.deleteMany({});
  });
  let contactId: string;

  describe("POST /contact", () => {
    it("should send new contact form", async () => {
      const input = {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.firstName(),
        message: faker.lorem.words(50),
        subject: faker.lorem.words(7),
      };
      const { body } = await request.post("/contact").send(input).expect(200);
      contactId = body.id;
      expect(body).not.toBeEmptyObject();
    });
    it("should throw error when provided input is invalid", async () => {
      const { body } = await request.post("/contact").expect(400);
      expect(typeof body?.message).toBe("string");
    });
  });
  describe("DELETE /contact", () => {
    it("should delete contact", async () => {
      const { body } = await request
        .delete(`/contact/${contactId}`)
        .expect(200);
      expect(body).toBeEmptyObject();
    });
    it("should throw 404 status when contact not exist", async () => {
      const { body } = await request
        .delete("/contact/invalidContactId")
        .expect(404);
      expect(typeof body?.message).toBe("string");
    });
  });
});
