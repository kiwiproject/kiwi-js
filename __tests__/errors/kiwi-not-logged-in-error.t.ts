import { describe, expect, it } from "@jest/globals";
import KiwiNotLoggedInError from "../../src/errors/kiwi-not-logged-in-error";

describe("KiwiNotLoggedInError", () => {
  it("should default message and code", () => {
    const error = new KiwiNotLoggedInError();

    expect(error.statusCode).toEqual(401);
    expect(error.message).toEqual("User is not logged in");
    expect(error.name).toEqual("KiwiNotLoggedInError");
  });

  it("should accept a message", () => {
    const error = new KiwiNotLoggedInError("Yo log in first");

    expect(error.statusCode).toEqual(401);
    expect(error.message).toEqual("Yo log in first");
    expect(error.name).toEqual("KiwiNotLoggedInError");
  });

  it("should accept a message and an optional error", () => {
    const originalError = new Error("Whoa");
    const error = new KiwiNotLoggedInError("No soup for you", originalError);

    expect(error.statusCode).toEqual(401);
    expect(error.message).toEqual("No soup for you");
    expect(error.name).toEqual("KiwiNotLoggedInError");
    expect(error.stack.toString()).toContain("Whoa");
  });
});
