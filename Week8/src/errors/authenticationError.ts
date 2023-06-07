import { BaseError } from './baseError';
import { httpCodes, httpStatusCode } from './httpStatusCodes';

export class AuthenticationError extends BaseError {
  constructor(
    message = 'Authentication Error.',
    name = 'AuthenticationError',
    statusCode: httpStatusCode = httpCodes.BAD_REQUEST,
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, message);
  }
}
