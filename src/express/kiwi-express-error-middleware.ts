import { NextFunction, Request, Response } from "express";
import { KiwiStandardResponsesExpress } from "./kiwi-standard-responses-express";
import KiwiStandardResponseError from "../errors/kiwi-standard-response-error";

export function setupFallback(
  logger: (msg: string, stack?: string) => void | undefined = undefined,
) {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "KiwiNotLoggedInError") {
      return KiwiStandardResponsesExpress.standardUnauthorizedResponse(
        res,
        err.message,
      );
    }

    if (logger) {
      logger(
        `Error while processing path ${req.method} ${req.originalUrl}: ${err.message}`,
        err.stack?.toString(),
      );
    }

    if (res.headersSent) {
      next(err);
    } else {
      if (err.name === "KiwiStandardResponseError") {
        KiwiStandardResponsesExpress.standardErrorResponse(
          res,
          (err as KiwiStandardResponseError).statusCode,
          err.message,
        );
      } else {
        KiwiStandardResponsesExpress.standardErrorResponse(
          res,
          500,
          err.message,
        );
      }
    }
  };
}
