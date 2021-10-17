import { NextFunction, Request, Response } from 'express';

export function robotsHandler(
  request: Request,
  response: Response,
  _: NextFunction,
): void {
  response.type('text/plain');
  response.send('User-agent: *\nDisallow: /');
}
