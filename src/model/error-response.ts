import { ErrorMessage } from "./error-message";

/**
 * An error response that Kiwi uses to standardize HTTP error responses.
 * <p>
 * Each instance contains the error message; an optional identifier to identify the
 * specific item causing the error (e.g. a primary key); an optional field/property name for cases when a specific
 * field causes the error; and an optional list of ErrorMessages for additional details (e.g. validation errors).
 */
export class ErrorResponse {
  private readonly fieldName: string;
  private readonly itemId: unknown;
  private readonly message: string;
  private readonly errors: Array<ErrorMessage>;

  constructor(
    message: string,
    fieldName: string = "",
    itemId: unknown = "",
    errors: Array<ErrorMessage> = [],
  ) {
    this.itemId = itemId;
    this.message = message;
    this.fieldName = fieldName;
    this.errors = errors;
  }

  toMap() {
    return {
      message: this.message,
      fieldName: this.fieldName,
      itemId: this.itemId,
      errors: this.errors.map((error: ErrorMessage) => {
        return { message: error.message, fieldName: error.fieldName };
      }),
    };
  }
}
