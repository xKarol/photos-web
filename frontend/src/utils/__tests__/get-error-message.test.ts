import { getErrorMessage } from "../get-error-message";
import { z } from "zod";
import axios from "axios";
import { server } from "../../__mocks__/server";
import { rest } from "msw";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const catchError = (cb: () => void) => {
  let catched = false;
  try {
    cb();
  } catch (error) {
    catched = true;
    return error;
  }
  if (!catched) throw new Error("Error should be throwed.");
};

describe("getErrorMessage function", () => {
  it("should return unknown error message when undefined is passed", () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(getErrorMessage(undefined)).toBe("Unknown error");
  });
  it("should return unknown error message when empty string is passed", () => {
    expect(getErrorMessage("")).toBe("Unknown error");
  });
  it("should return unknown error message when number is passed", () => {
    expect(getErrorMessage(1)).toBe("Unknown error");
  });
  describe("ZodError", () => {
    it("should return zod error message", () => {
      const testSchema = z.object({
        email: z.string().email({ message: "invalid email" }),
      });
      const error = catchError(() =>
        testSchema.parse({ email: "invalidemail" })
      );
      expect(getErrorMessage(error)).toBe("invalid email");
    });

    it("should return string when have many errors", () => {
      const testSchema = z.object({
        text: z.string().min(5, { message: "min 1 length" }),
        email: z.string().email({ message: "invalid email" }),
      });
      const error = catchError(() =>
        testSchema.parse({ email: "invalidemail", text: "test" })
      );
      expect(typeof getErrorMessage(error)).toBe("string");
    });
  });
  describe("AxiosError", () => {
    it("should return unknown error message", async () => {
      server.use(
        rest.post(`${BACKEND_URL}/contact`, (_req, res, ctx) => {
          return res(ctx.status(400));
        })
      );
      let errorMsg: unknown;
      await axios
        .post(`${BACKEND_URL}/contact`)
        .catch((error) => (errorMsg = error));

      expect(getErrorMessage(errorMsg)).toBe("Unknown error");
    });
    it("should return custom error message", async () => {
      server.use(
        rest.post(`${BACKEND_URL}/contact`, (_req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({ error: "custom error message" })
          );
        })
      );
      let errorMsg: unknown;
      await axios
        .post(`${BACKEND_URL}/contact`)
        .catch((error) => (errorMsg = error));

      expect(getErrorMessage(errorMsg)).toBe("custom error message");
    });
  });
  describe("Error", () => {
    it("should return error message", () => {
      const error = catchError(() => {
        throw new Error("test error");
      });
      expect(getErrorMessage(error)).toBe("test error");
    });
    it("should return default error when undefined is throwed", () => {
      const error = catchError(() => {
        // eslint-disable-next-line unicorn/error-message
        throw new Error(undefined);
      });
      expect(getErrorMessage(error)).toBe("Unknown error");
    });
  });
  describe("Unknown", () => {
    it("should return default error when string is passed", () => {
      const error = catchError(() => {
        throw "test";
      });
      expect(getErrorMessage(error)).toBe("Unknown error");
    });
    it("should return default error when object is passed", () => {
      const error = catchError(() => {
        throw { test: "test" };
      });
      expect(getErrorMessage(error)).toBe("Unknown error");
    });
    it("should return default error when array is passed", () => {
      const error = catchError(() => {
        throw ["test"];
      });
      expect(getErrorMessage(error)).toBe("Unknown error");
    });
    it("should return default error when undefined is passed", () => {
      const error = catchError(() => {
        throw undefined;
      });
      expect(getErrorMessage(error)).toBe("Unknown error");
    });
  });
});
