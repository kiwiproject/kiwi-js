export default class KiwiStandardResponseError extends Error {
  public statusCode: number;
  public nestedError?: Error;

  constructor(message: string, statusCode: number, nestedError?: Error) {
    super(message);
    this.name = "KiwiStandardResponseError";
    this.statusCode = statusCode;
    this.nestedError = nestedError;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, KiwiStandardResponseError);
    }

    // If a nested error is provided, append its stack
    if (nestedError && nestedError.stack) {
      this.stack += `\nCaused by: ${nestedError.stack}`;
    }
  }
}
