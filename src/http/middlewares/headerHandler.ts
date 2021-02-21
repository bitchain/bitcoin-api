import { NextFunction, Request, Response } from 'express';

import networkConfig from '@config/network';

export async function headerHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  response.append('Network', networkConfig.type);

  next();
}
