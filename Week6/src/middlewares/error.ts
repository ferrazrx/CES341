import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../errors/baseError';

export function logError(err: BaseError) {
  console.error(err);
}

export function logErrorMiddleware(err: BaseError, req: Request, res: Response, next: NextFunction) {
  if (err) {
    logError(err);
  }
  next();
}

export function returnError(err: BaseError, req: Request, res: Response, next: NextFunction) {
  if (err) {
    res.status(err.statusCode || 500).send({
      error: err.statusCode || 500,
      message: err.message,
    });
    return;
  }
  next();
}

export function isOperationalError(error: BaseError) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}
