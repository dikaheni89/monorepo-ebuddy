import { db } from '@/config/firebaseConfig';
import admin from 'firebase-admin';
import { ApiError } from '@/utils/ApiError';
import {User} from "../../../packages/shared/user";

const USERS_COLLECTION = 'USERS';

const calculatePotentialScore = (user: User): number => {
  return (
    (user.totalAverageWeightRatings ?? 0) * 1_000_000 +
    (user.numberOfRents ?? 0) * 1_000 +
    (user.recentlyActive ?? 0) / 1_000_000
  );
};

export const updateUser = async (user: User): Promise<void> => {
  try {
    const potentialScore = calculatePotentialScore(user);

    await db.collection(USERS_COLLECTION).doc(user.id).set(
      {
        ...user,
        potentialScore,
      },
      { merge: true }
    );
  } catch (err) {
    console.error('[Firestore updateUser error]', err);
    throw new ApiError(500, 'Failed to update Firestore');
  }
};

export const fetchUser = async (id: string): Promise<User | null> => {
  try {
    const doc = await db.collection(USERS_COLLECTION).doc(id).get();
    return doc.exists ? (doc.data() as User) : null;
  } catch (err) {
    console.error('[Firestore fetchUser error]', err);
    throw new ApiError(500, 'Failed to fetch from Firestore');
  }
};

export const getTopPotentialUsers = async (
  limit: number,
  lastScore?: number
): Promise<{ users: User[]; lastScore: number | null }> => {
  try {
    let queryRef: admin.firestore.Query = db
      .collection(USERS_COLLECTION)
      .orderBy('potentialScore', 'desc')
      .limit(limit);

    if (lastScore !== undefined) {
      queryRef = queryRef.startAfter(lastScore);
    }

    const snapshot = await queryRef.get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    const newLastScore =
      users.length > 0 ? users[users.length - 1].potentialScore ?? null : null;

    return { users, lastScore: newLastScore };
  } catch (err) {
    console.error('[Firestore getTopPotentialUsers error]', err);
    throw new ApiError(500, 'Failed to fetch ranked users from Firestore');
  }
};
