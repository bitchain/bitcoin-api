import { NextFunction, Request, Response } from 'express';

export async function notFoundHandler(
  request: Request,
  response: Response,
  _: NextFunction,
): Promise<Response> {
  return response
    .status(404)
    .json({ message: 'Sorry, we can’t find the page you were looking for.' });
}
