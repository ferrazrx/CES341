import { BaseError } from './baseError';
import { httpCodes, httpStatusCode } from './httpStatusCodes';

export class JWTError extends BaseError {
  constructor(
    message = 'JWT Error.',
    name = 'JWTError',
    statusCode: httpStatusCode = httpCodes.BAD_REQUEST,
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, message);
  }
}
