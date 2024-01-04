import { Response } from "express";
import {ErrorResponse} from "../model/error-response";
import {ErrorMessage} from "../model/error-message";

/**
 * Returns a 200 OK response if the entity contains a value. Otherwise, returns a 404 Not Found response with
 * a message stating that the entity was not found using the given identifier field and value.
 *
 * @param res             the Express Response
 * @param identifierField the field which identifies the entity being looked up, e.g. "id"
 * @param identifier      the value of the identifier field, e.g. 42
 * @param entity          the entity or undefined
 */
const standardGetResponseWithIdentifier = (
  res: Response,
  identifierField: string,
  identifier: unknown,
  entity: unknown,
) => {
  if (entity !== undefined) {
    res.status(200).json(entity);
    return;
  }

  standardNotFoundResponse(res,
    `Object with ${identifierField} ${identifier} not found`,
    identifierField,
    identifier
  );
};

/**
 * Returns a 200 OK response if the entity is non-null. Otherwise, returns a 404 Not Found response with
 * the given detail message.
 *
 * @param res             the Express Response
 * @param entity          the entity or undefined
 * @param notFoundMessage the specific message to use in the 404 response (if entity is undefined)
 */
const standardGetResponseWithMessage = (
  res: Response,
  entity: unknown,
  notFoundMessage: string,
) => {
  if (entity !== undefined) {
    res.status(200).json(entity);
    return;
  }

  standardNotFoundResponse(res, notFoundMessage);
};

/**
 * Returns a 404 Not Found response containing an {@link ErrorResponse} entity which uses {@code notFoundMessage}
 * as the detailed error message.
 *
 * @param res          the Express Response
 * @param notFoundMessage the error message to use
 * @param identifierField the field which identifies the entity being looked up, e.g. "id"
 * @param identifier the value of the identifier field, e.g. 42
 */
const standardNotFoundResponse = (res: Response, notFoundMessage: string, identifierField: string = undefined, identifier: unknown = undefined) => {
  res.status(404).json(new ErrorResponse(notFoundMessage, identifierField, identifier).toMap());
};

/**
 * Returns a 201 Created response having the specified Location header and response entity.
 *
 * @param res      the Express Response
 * @param location the value for the location header
 * @param entity   the new entity
 */
const standardPostResponse = (
  res: Response,
  location: string,
  entity: unknown,
) => {
  res.status(201).set("Location", location).json(entity);
};

/**
 * Returns a 200 OK response having the specified response entity.
 *
 * @param res    the Express Response
 * @param entity the updated entity
 */
const standardPutResponse = (res: Response, entity: unknown) => {
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
 * @param res           the Express Response
 * @param deletedEntity the entity that was deleted
 */
const standardDeleteResponseWithEntity = (
  res: Response,
  deletedEntity: unknown,
) => {
  res.status(204).json(deletedEntity);
};

/**
 * Returns a 400 Bad Request response containing an {@link ErrorResponse} entity which uses {@code errorDetails}
 * as the detailed error message.
 *
 * @param res          the Express Response
 * @param errorMessage the error message to use
 * @param errors a list of errors (e.g. validation errors) to return
 * @param identifierField an optional identifier field for the object
 * @param identifier an optional identifier value for the object
 */
const standardBadRequestResponse = (res: Response, errorMessage: string, errors: Array<ErrorMessage> = [], identifierField: string = undefined, identifier: unknown = undefined) => {
  res.status(400).json(new ErrorResponse(errorMessage, identifierField, identifier, errors).toMap());
};

/**
 * Returns a 401 Unauthorized response containing an {@link ErrorResponse} entity which uses {@code errorMessage}
 * as the detailed error message.
 *
 * @param res          the Express Response
 * @param errorMessage the error message to use
 */
const standardUnauthorizedResponse = (res: Response, errorMessage: string) => {
  res.status(401).json(new ErrorResponse(errorMessage).toMap());
};

/**
 * Returns a response having the given status and an {@link ErrorResponse} entity which uses {@code errorMessage}
 * as the detailed error message.
 * <p>
 * Does not verify that the given status is actually an error status.
 *
 * @param status       the status code
 * @param errorMessage the error message to use
 * @param res          the Express Response
 * @param errors  an optional list of extra error details to return
 * @param identifierField an
 * @param identifier
 */
const standardErrorResponse = (
  res: Response,
  status: number,
  errorMessage: string,
  errors: Array<ErrorMessage> = [],
  identifierField: string = undefined,
  identifier: unknown = undefined
) => {
  res.status(status).json(new ErrorResponse(errorMessage, identifierField, identifier, errors).toMap());
};

/**
 * Returns a 202 Accepted response having the specified response entity.
 * <p>
 * This generally applies to POST, PUT, and PATCH requests that might take a while and are processed asynchronously.
 *
 * @param entity the accepted entity
 * @param res    the Express Response
 */
const standardAcceptedResponse = (res: Response, entity: unknown) => {
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
