/**
 * An error message that Kiwi uses to hold information about a single error.
 * <p>
 * Each instance contains the error message; and an optional fieldName that relates to the error.
 */
export class ErrorMessage {
  readonly fieldName: string;
  readonly message: string;

  constructor(message: string, fieldName: string) {
    this.message = message;
    this.fieldName = fieldName;
  }
}
