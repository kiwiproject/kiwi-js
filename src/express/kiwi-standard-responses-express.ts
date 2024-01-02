import { Response } from "express";
import { ErrorMessage } from "../model/error-message";

/**
 * Returns a 200 OK response if the entity contains a value. Otherwise, returns a 404 Not Found response with
 * a message stating that the entity was not found using the given identifier field and value.
 *
 * @param identifierField the field which identifies the entity being looked up, e.g. "id"
 * @param identifier      the value of the identifier field, e.g. 42
 * @param entity          the entity or undefined
 * @param res             the Express Response
 */
const standardGetResponseWithIdentifier = (
  identifierField: string,
  identifier: unknown,
  entity: unknown,
  res: Response,
) => {
  if (entity !== undefined) {
    res.status(200).json(entity);
    return;
  }

  standardNotFoundResponse(
    `Object with ${identifierField} ${identifier} not found`,
    res,
  );
};

/**
 * Returns a 200 OK response if the entity is non-null. Otherwise, returns a 404 Not Found response with
 * the given detail message.
 *
 * @param entity          the entity or undefined
 * @param notFoundMessage the specific message to use in the 404 response (if entity is undefined)
 * @param res             the Express Response
 */
const standardGetResponseWithMessage = (
  entity: unknown,
  notFoundMessage: string,
  res: Response,
) => {
  if (entity !== undefined) {
    res.status(200).json(entity);
    return;
  }

  standardNotFoundResponse(notFoundMessage, res);
};

/**
 * Returns a 404 Not Found response containing an {@link ErrorMessage} entity which uses {@code errorDetails}
 * as the detailed error message.
 *
 * @param errorDetails the error message to use
 * @param res          the Express Response
 */
const standardNotFoundResponse = (errorDetails: string, res: Response) => {
  res.status(404).json(new ErrorMessage(404, errorDetails).toMap());
};

/**
 * Returns a 201 Created response having the specified Location header and response entity.
 *
 * @param location the value for the location header
 * @param entity   the new entity
 * @param res      the Express Response
 */
const standardPostResponse = (
  location: string,
  entity: unknown,
  res: Response,
) => {
  res.status(201).set("Location", location).json(entity);
};

/**
 * Returns a 200 OK response having the specified response entity.
 *
 * @param entity the updated entity
 * @param res    the Express Response
 */
const standardPutResponse = (entity: unknown, res: Response) => {
  res.status(200).json(entity);
};

/**
 * Returns a 204 No Content response for DELETE requests that do not return an entity.
 *
 * @param res the Express Response
 */
const standardDeleteResponse = (res: Response) => {
  res.sendStatus(204);
};

/**
 * Returns a 204 No Content response for DELETE requests and return an entity.
 *
 * @param deletedEntity the entity that was deleted
 * @param res           the Express Response
 */
const standardDeleteResponseWithEntity = (
  deletedEntity: unknown,
  res: Response,
) => {
  res.status(204).json(deletedEntity);
};

/**
 * Returns a 400 Bad Request response containing an {@link ErrorMessage} entity which uses {@code errorDetails}
 * as the detailed error message.
 *
 * @param errorDetails the error message to use
 * @param res          the Express Response
 */
const standardBadRequestResponse = (errorDetails: string, res: Response) => {
  res.status(400).json(new ErrorMessage(400, errorDetails).toMap());
};

/**
 * Returns a 401 Unauthorized response containing an {@link ErrorMessage} entity which uses {@code errorDetails}
 * as the detailed error message.
 *
 * @param errorDetails the error message to use
 * @param res          the Express Response
 */
const standardUnauthorizedResponse = (errorDetails: string, res: Response) => {
  res.status(401).json(new ErrorMessage(401, errorDetails).toMap());
};

/**
 * Returns a response having the given status and an {@link ErrorMessage} entity which uses {@code errorDetails}
 * as the detailed error message.
 * <p>
 * Does not verify that the given status is actually an error status.
 *
 * @param status       the status code
 * @param errorDetails the error message to use
 * @param res          the Express Response
 */
const standardErrorResponse = (
  status: number,
  errorDetails: string,
  res: Response,
) => {
  res.status(status).json(new ErrorMessage(status, errorDetails).toMap());
};

/**
 * Returns a 202 Accepted response having the specified response entity.
 * <p>
 * This generally applies to POST, PUT, and PATCH requests that might take a while and are processed asynchronously.
 *
 * @param entity the accepted entity
 * @param res    the Express Response
 */
const standardAcceptedResponse = (entity: unknown, res: Response) => {
  res.status(202).json(entity);
};

export const KiwiStandardResponsesExpress = {
  standardGetResponseWithIdentifier,
  standardGetResponseWithMessage,
  standardPostResponse,
  standardPutResponse,
  standardDeleteResponse,
  standardDeleteResponseWithEntity,
  standardAcceptedResponse,
  standardErrorResponse,
  standardUnauthorizedResponse,
  standardNotFoundResponse,
  standardBadRequestResponse,
};
