import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

import * as Sentry from '@sentry/node';
import { HttpError } from '@shared/errors/HttpError';

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

  if (error instanceof HttpError) {
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
