import { HttpError } from './HttpError';

class ValidationError extends HttpError {
  constructor(message: string, statusCode = 400) {
    super(message, statusCode);
  }
}

export { ValidationError };
