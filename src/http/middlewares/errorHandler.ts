import { NextFunction, Request, Response } from 'express';
import { isCelebrateError } from 'celebrate';

import * as Sentry from '@sentry/node';

import { ApplicationError } from '@errors/ApplicationError';
import { ValidationError } from '@errors/ValidationError';

export async function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Promise<Response> {
  if (isCelebrateError(error)) {
    return response.status(400).json({
      error: error.details.get('body')?.message,
    });
  }

  if (error instanceof ApplicationError || error instanceof ValidationError) {
    return response.status(error.statusCode).json({
      error: error.message,
    });
  }

  console.log(error);
  // Sentry.captureException(error);

  return response.status(500).json({
    error: 'Internal Server error!',
  });
}
