import { describe, it, expect } from "@jest/globals";
import {ErrorMessage, ErrorResponse} from "../../src";

describe("ErrorResponse", () => {
  describe("toMap", () => {
    it("should convert error response to a json map", () => {
      const errorResponse = new ErrorResponse( "Validation Error", "id", 42, [new ErrorMessage("is required", "name")]);
      const jsonMap = errorResponse.toMap();

      expect(jsonMap).toEqual({
        message: "Validation Error",
        fieldName: "id",
        itemId: 42,
        errors: [
          { message: "is required", fieldName: "name" }
        ]
      });
    });
  });
});
