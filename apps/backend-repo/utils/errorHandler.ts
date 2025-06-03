import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err instanceof ApiError ? err.statusCode : 500;
  const message = err instanceof ApiError ? err.message : 'Internal Server Error';

  if (process.env.NODE_ENV !== 'production') {
    console.error('ERROR:', err);
  }

  res.status(status).json({
    error: message,
  });
};
