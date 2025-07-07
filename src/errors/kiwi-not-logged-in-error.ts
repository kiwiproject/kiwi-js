import KiwiStandardResponseError from "./kiwi-standard-response-error";

export default class KiwiNotLoggedInError extends KiwiStandardResponseError {
  constructor(message = "User is not logged in", nestedError?: Error) {
    super(message, 401, nestedError);
    this.name = "KiwiNotLoggedInError";
  }
}
