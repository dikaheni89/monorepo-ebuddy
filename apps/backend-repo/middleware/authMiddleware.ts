import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { ApiError } from '@/utils/ApiError';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Unauthorized'));
  }

  const idToken = authHeader.split(' ')[1];
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    return next(new ApiError(403, 'Invalid or expired token'));
  }
};
