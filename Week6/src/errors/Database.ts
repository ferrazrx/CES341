import { BaseError } from './baseError';
import { httpCodes, httpStatusCode } from './httpStatusCodes';

export class DatabaseError extends BaseError {
  constructor(
    message = 'Database Error.',
    name = 'DatabaseError',
    statusCode: httpStatusCode = httpCodes.INTERNAL_SERVER,
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, message);
  }
}
