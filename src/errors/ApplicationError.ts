import { HttpError } from './HttpError';

class ApplicationError extends HttpError {
  constructor(message: string, statusCode = 400) {
    super(message, statusCode);
  }
}

export { ApplicationError };
