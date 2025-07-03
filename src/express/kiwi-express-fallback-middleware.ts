import express, { Express, NextFunction, Request, RequestHandler, Response } from "express";
import { KiwiStandardResponsesExpress } from "./kiwi-standard-responses-express";

export function setupFallback(app: Express, basePath: string = "/") {
    // catch 404 and forward to error handler
    app.use(basePath, (_req, res) => {
        KiwiStandardResponsesExpress.standardNotFoundResponse(res, "Page not found");
    });

    if (process.env.NODE_ENV === "production") {
        app.get(/(.*)/, (_req, res) => {
        res.sendFile(path.join(__dirname, "public/index.html"));
        });
    }

    // error handler
    // define as the last app.use callback
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err.name === NotLoggedInErrorName) {
        return KiwiStandardResponsesExpress.standardUnauthorizedResponse(res, "User not logged in");
        }
        getLogger().error(
        `Error while processing path ${req.method} ${req.originalUrl}: ${err.message}`,
        { details: err.stack?.toString() }
        );

        if (res.headersSent) {
        next(err);
        } else {
        KiwiStandardResponsesExpress.standardErrorResponse(res, 500, err.message);
        }
    });
}
