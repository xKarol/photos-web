import prisma from "@app/prisma";

import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "../app";
import "../mocks/auth";
import type * as Schema from "../schemas/contact";
import { createContact } from "../services/contact";
import { parseError } from "./utils";

jest.mock("../middlewares/require-auth");

const request = supertest(app);

describe("Contact", () => {
  afterAll(async () => {
    prisma.contact.deleteMany({});
  });

  describe("POST /contact", () => {
    it("should create new contact form", async () => {
      const { body } = await request
        .post("/contact")
        .send(createFakeContactData())
        .expect(200);
      expect(body).not.toBeEmptyObject();
    });

    it("should throw error when provided input is invalid", async () => {
      const { body } = await request.post("/contact").expect(400);
      expect(parseError(body)).toBe(true);
    });

    it("should throw error when additional field was invalid", async () => {
      const { body } = await request
        .post("/contact")
        .send({ ...createFakeContactData(), invalid: "field" })
        .expect(400);
      expect(parseError(body)).toBe(true);
    });

    it("should throw error when only one field was provided", async () => {
      const { body } = await request
        .post("/contact")
        .send({ email: "test@gmail.com" })
        .expect(400);
      expect(parseError(body)).toBe(true);
    });

    it("should throw error when invalid field was provided", async () => {
      const { body } = await request
        .post("/contact")
        .send({ invalid: "field" })
        .expect(400);
      expect(parseError(body)).toBe(true);
    });
  });

  describe("DELETE /contact", () => {
    it("should delete contact", async () => {
      const { id } = await createContactRecord();
      const { body } = await request.delete(`/contact/${id}`).expect(200);
      expect(body).toBeEmptyObject();
    });

    it("should throw 404 status when contact not exist", async () => {
      const { body } = await request
        .delete("/contact/invalidContactId")
        .expect(404);
      expect(parseError(body)).toBe(true);
    });
  });
});

function createFakeContactData() {
  const input: Schema.CreateContact["body"] = {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.firstName(),
    message: faker.lorem.words(50),
    subject: faker.lorem.words(7),
  };
  return input;
}

async function createContactRecord() {
  return await createContact(createFakeContactData());
}
