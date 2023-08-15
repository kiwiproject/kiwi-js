import { describe, it, expect, beforeAll } from "@jest/globals";
import { setupExpressMocks, res } from "../__utils__/expressMocks";
import { KiwiStandardResponsesExpress } from "../../src";

describe("KiwiStandardResponses", () => {
  beforeAll(setupExpressMocks);

  describe("standardGetResponseWithIdentifier", () => {
    it("should set response to 200 with given entity", () => {
      const entity = { name: "Bob", id: 1 };
      KiwiStandardResponsesExpress.standardGetResponseWithIdentifier(
        "nameField",
        "Bob",
        entity,
        res,
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(entity);
    });

    it("should setup a standard 404 response when the entity is missing", () => {
      KiwiStandardResponsesExpress.standardGetResponseWithIdentifier(
        "nameField",
        "Bob",
        undefined,
        res,
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        code: 404,
        message: "Object with nameField Bob not found",
        fieldName: "",
        itemId: "",
      });
    });
  });

  describe("standardGetResponseWithMessage", () => {
    it("should set response to 200 with given entity", () => {
      const entity = { name: "Bob", id: 1 };
      KiwiStandardResponsesExpress.standardGetResponseWithMessage(
        entity,
        "Entity not found",
        res,
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(entity);
    });

    it("should setup a standard 404 response when the entity is missing", () => {
      KiwiStandardResponsesExpress.standardGetResponseWithMessage(
        undefined,
        "Entity not found",
        res,
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        code: 404,
        message: "Entity not found",
        fieldName: "",
        itemId: "",
      });
    });
  });

  describe("standardNotFoundResponse", () => {
    it("should setup a standard 404 response", () => {
      KiwiStandardResponsesExpress.standardNotFoundResponse(
        "Entity not found",
        res,
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        code: 404,
        message: "Entity not found",
        fieldName: "",
        itemId: "",
      });
    });
  });

  describe("standardPostResponse", () => {
    it("should setup a standard 201 response", () => {
      KiwiStandardResponsesExpress.standardPostResponse(
        "http://localhost/entity/1",
        { name: "Bob", id: 1 },
        res,
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
      KiwiStandardResponsesExpress.standardPutResponse(
        { name: "Bob", id: 1 },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: "Bob", id: 1 });
    });
  });

  describe("standardDeleteResponse", () => {
    it("should setup a standard 204 response", () => {
      KiwiStandardResponsesExpress.standardDeleteResponse(res);

      expect(res.status).toHaveBeenCalledWith(204);
    });
  });

  describe("standardDeleteResponseWithEntity", () => {
    it("should setup a standard 204 response with given entity", () => {
      KiwiStandardResponsesExpress.standardDeleteResponseWithEntity(
        { name: "Bob", id: 1 },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({ name: "Bob", id: 1 });
    });
  });

  describe("standardBadRequestResponse", () => {
    it("should setup a standard 400 response", () => {
      KiwiStandardResponsesExpress.standardBadRequestResponse(
        "Entity corrupt",
        res,
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        code: 400,
        message: "Entity corrupt",
        fieldName: "",
        itemId: "",
      });
    });
  });

  describe("standardUnauthorizedResponse", () => {
    it("should setup a standard 401 response", () => {
      KiwiStandardResponsesExpress.standardUnauthorizedResponse("Denied", res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        code: 401,
        message: "Denied",
        fieldName: "",
        itemId: "",
      });
    });
  });

  describe("standardErrorResponse", () => {
    it("should setup a standard error response with given status", () => {
      KiwiStandardResponsesExpress.standardErrorResponse(500, "Whoops", res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        code: 500,
        message: "Whoops",
        fieldName: "",
        itemId: "",
      });
    });
  });

  describe("standardAcceptedResponse", () => {
    it("should setup a standard 202 response", () => {
      KiwiStandardResponsesExpress.standardAcceptedResponse(
        { name: "Bob", id: 1 },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(202);
      expect(res.json).toHaveBeenCalledWith({ name: "Bob", id: 1 });
    });
  });
});
