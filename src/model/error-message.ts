/**
 * An error message that Kiwi uses to standardize HTTP error responses.
 * <p>
 * Each instance contains the HTTP status (error) code; the error message; an optional identifier to identify the
 * specific item causing the error (e.g. a primary key); and an optional field/property name for cases when a specific
 * field causes the error.
 */
export class ErrorMessage {
  private readonly fieldName: string;
  private readonly itemId: string;
  private readonly code: number;
  private readonly message: string;

  constructor(
    code: number,
    message: string,
    fieldName: string = "",
    itemId: string = "",
  ) {
    this.itemId = itemId;
    this.code = code;
    this.message = message;
    this.fieldName = fieldName;
  }

  toMap() {
    return {
      message: this.message,
      code: this.code,
      fieldName: this.fieldName,
      itemId: this.itemId,
    };
  }
}
