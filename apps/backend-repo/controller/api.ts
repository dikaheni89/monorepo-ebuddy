import { Request, Response, NextFunction } from 'express';
import { updateUser, fetchUser, getTopPotentialUsers } from '@/repository/userCollection';
import { ApiError } from '@/utils/ApiError';
import { User } from '../../../packages/shared/user';

const calculatePotentialScore = (user: User): number => {
  return (
    (user.totalAverageWeightRatings ?? 0) * 1_000_000 +
    (user.numberOfRents ?? 0) * 1_000 +
    (user.recentlyActive ?? 0) / 1_000_000
  );
};

export const updateUserData = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body;

  if (!user.id || !user.name || !user.email) {
    return next(new ApiError(400, 'Missing required user fields'));
  }

  try {
    const updatedUser: User = {
      ...user,
      potentialScore: calculatePotentialScore(user),
    };

    await updateUser(updatedUser);
    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    next(err);
  }
};

export const fetchUserData = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await fetchUser(id);
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const fetchTopUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lastScore } = req.query;
    const users = await getTopPotentialUsers(10, lastScore ? Number(lastScore) : undefined);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
