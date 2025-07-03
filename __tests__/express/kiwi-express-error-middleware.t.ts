import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Request, Response } from "express";
import { setupFallback } from "../../src/express/kiwi-express-error-middleware";
import KiwiNotLoggedInError from "../../src/errors/kiwi-not-logged-in-error";
import KiwiStandardResponseError from "../../src/errors/kiwi-standard-response-error";

describe("setupFallback", () => {
  const mockLogger = jest.fn();
  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnThis() as (code: number) => Response;
    res.json = jest.fn().mockReturnThis() as (json: string) => Response;
    res.send = jest.fn().mockReturnThis() as () => Response;
    res.end = jest.fn().mockReturnThis() as () => Response;
    return res;
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return a 401 if KiwiNotLoggedInError is thrown", () => {
    const middleware = setupFallback();

    const req = {} as Request;
    const next = jest.fn();
    const res = mockResponse();

    const error = new KiwiNotLoggedInError();

    middleware(error, req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      errors: [],
      fieldName: "",
      itemId: "",
      message: "User is not logged in",
    });
  });

  it("should continue if headers already sent", () => {
    const middleware = setupFallback();

    const req = {} as Request;
    const next = jest.fn();
    const res = mockResponse();
    res.headersSent = true;

    const error = new KiwiStandardResponseError("There is a problem", 500);

    middleware(error, req, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it("should send formatted error when KiwiStandardResponseError sent", () => {
    const middleware = setupFallback(mockLogger);

    const req = {
      method: "GET",
      originalUrl: "/entity/1",
    } as Request;
    const next = jest.fn();
    const res = mockResponse();

    const error = new KiwiStandardResponseError("There is a problem", 501);

    middleware(error, req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(501);
    expect(res.json).toHaveBeenCalledWith({
      errors: [],
      fieldName: "",
      itemId: "",
      message: "There is a problem",
    });
    expect(mockLogger).toHaveBeenCalledWith(
      "Error while processing path GET /entity/1: There is a problem",
      error.stack.toString(),
    );
  });

  it("should send regular error when KiwiStandardResponseError not given", () => {
    const middleware = setupFallback(mockLogger);

    const req = {
      method: "GET",
      originalUrl: "/entity/1",
    } as Request;
    const next = jest.fn();
    const res = mockResponse();

    const error = new Error("There is an unknown problem");

    middleware(error, req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: [],
      fieldName: "",
      itemId: "",
      message: "There is an unknown problem",
    });
    expect(mockLogger).toHaveBeenCalledWith(
      "Error while processing path GET /entity/1: There is an unknown problem",
      error.stack.toString(),
    );
  });
});
