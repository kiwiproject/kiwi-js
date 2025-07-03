import { describe, expect, it } from "@jest/globals";
import KiwiStandardResponseError from "../../src/errors/kiwi-standard-response-error";

describe("KiwiStandardResponseError", () => {
  it("should accept a status code and message", () => {
    const error = new KiwiStandardResponseError("Bad Request", 400);

    expect(error.statusCode).toEqual(400);
    expect(error.message).toEqual("Bad Request");
    expect(error.name).toEqual("KiwiStandardResponseError");
    expect(error.stack).toBeDefined();
  });

  it("should accept a status code and message and an optional error", () => {
    const originalError = new Error("Whoa");
    const error = new KiwiStandardResponseError(
      "Bad Request",
      400,
      originalError,
    );

    expect(error.statusCode).toEqual(400);
    expect(error.message).toEqual("Bad Request");
    expect(error.name).toEqual("KiwiStandardResponseError");
    expect(error.stack.toString()).toContain("Whoa");
  });
});
