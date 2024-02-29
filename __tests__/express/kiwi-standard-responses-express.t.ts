import { describe, it, expect, beforeAll } from "@jest/globals";
import { setupExpressMocks, res } from "../__utils__/expressMocks";
import { ErrorMessage, KiwiStandardResponsesExpress } from "../../src";

describe("KiwiStandardResponses", () => {
  beforeAll(setupExpressMocks);

  describe("standardGetResponseWithIdentifier", () => {
    it("should set response to 200 with given entity", () => {
      const entity = { name: "Bob", id: 1 };
      KiwiStandardResponsesExpress.standardGetResponseWithIdentifier(
        res,
        "nameField",
        "Bob",
        entity,
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(entity);
    });

    it("should setup a standard 404 response when the entity is missing", () => {
      KiwiStandardResponsesExpress.standardGetResponseWithIdentifier(
        res,
        "nameField",
        "Bob",
        undefined,
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Object with nameField Bob not found",
        fieldName: "nameField",
        itemId: "Bob",
        errors: [],
      });
    });
  });

  describe("standardGetResponseWithMessage", () => {
    it("should set response to 200 with given entity", () => {
      const entity = { name: "Bob", id: 1 };
      KiwiStandardResponsesExpress.standardGetResponseWithMessage(
        res,
        entity,
        "Entity not found",
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(entity);
    });

    it("should setup a standard 404 response when the entity is missing", () => {
      KiwiStandardResponsesExpress.standardGetResponseWithMessage(
        res,
        undefined,
        "Entity not found",
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Entity not found",
        fieldName: "",
        itemId: "",
        errors: [],
      });
    });
  });

  describe("standardNotFoundResponse", () => {
    it("should setup a standard 404 response", () => {
      KiwiStandardResponsesExpress.standardNotFoundResponse(
        res,
        "Entity not found",
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Entity not found",
        fieldName: "",
        itemId: "",
        errors: [],
      });
    });
  });

  describe("standardPostResponse", () => {
    it("should setup a standard 201 response", () => {
      KiwiStandardResponsesExpress.standardPostResponse(
        res,
        "http://localhost/entity/1",
        { name: "Bob", id: 1 },
      );

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.set).toHaveBeenCalledWith(
        "Location",
        "http://localhost/entity/1",
      );
      expect(res.json).toHaveBeenCalledWith({ name: "Bob", id: 1 });
    });
  });

  describe("standardPutResponse", () => {
    it("should setup a standard 200 response", () => {
      KiwiStandardResponsesExpress.standardPutResponse(res, {
        name: "Bob",
        id: 1,
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: "Bob", id: 1 });
    });
  });

  describe("standardDeleteResponse", () => {
    it("should setup a standard 204 response", () => {
      KiwiStandardResponsesExpress.standardDeleteResponse(res);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });

  describe("standardDeleteResponseWithEntity", () => {
    it("should setup a standard 204 response with given entity", () => {
      KiwiStandardResponsesExpress.standardDeleteResponseWithEntity(res, {
        name: "Bob",
        id: 1,
      });

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({ name: "Bob", id: 1 });
    });
  });

  describe("standardBadRequestResponse", () => {
    it("should setup a standard 400 response", () => {
      KiwiStandardResponsesExpress.standardBadRequestResponse(
        res,
        "Entity corrupt",
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Entity corrupt",
        fieldName: "",
        itemId: "",
        errors: [],
      });
    });
  });

  describe("standardUnauthorizedResponse", () => {
    it("should setup a standard 401 response", () => {
      KiwiStandardResponsesExpress.standardUnauthorizedResponse(res, "Denied");

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Denied",
        fieldName: "",
        itemId: "",
        errors: [],
      });
    });
  });

  describe("standardForbiddenResponse", () => {
    it("should setup a standard 403 response", () => {
      KiwiStandardResponsesExpress.standardForbiddenResponse(res, "No soup for you");

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "No soup for you",
        fieldName: "",
        itemId: "",
        errors: [],
      });
    });
  });

  describe("standardErrorResponse", () => {
    it("should setup a standard error response with given status", () => {
      KiwiStandardResponsesExpress.standardErrorResponse(res, 500, "Whoops");

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Whoops",
        fieldName: "",
        itemId: "",
        errors: [],
      });
    });

    it("should setup a standard error response with given status and given error messages", () => {
      const errorMessage = new ErrorMessage("is required", "name");

      KiwiStandardResponsesExpress.standardErrorResponse(res, 500, "Whoops", [
        errorMessage,
      ]);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Whoops",
        fieldName: "",
        itemId: "",
        errors: [{ message: "is required", fieldName: "name" }],
      });
    });
  });

  describe("standardAcceptedResponse", () => {
    it("should setup a standard 202 response", () => {
      KiwiStandardResponsesExpress.standardAcceptedResponse(res, {
        name: "Bob",
        id: 1,
      });

      expect(res.status).toHaveBeenCalledWith(202);
      expect(res.json).toHaveBeenCalledWith({ name: "Bob", id: 1 });
    });
  });
});
