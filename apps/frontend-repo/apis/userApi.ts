'use client';

import { User } from '../../../packages/shared/user';
import { auth } from '@/app/config/firebase';

const BASE_URL = 'http://localhost:3000/api';

// Ambil token Firebase dari user yang sedang login
const getAuthToken = async (): Promise<string> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated');

  return await currentUser.getIdToken(); // Dapatkan token ID yang valid
};

export const fetchUser = async (id: string): Promise<User> => {
  const token = await getAuthToken();

  const res = await fetch(`${BASE_URL}/fetch-user-data/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Failed to fetch user');
  }

  return res.json();
};

export const updateUser = async (user: User): Promise<void> => {
  const token = await getAuthToken();

  const res = await fetch(`${BASE_URL}/update-user-data`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Failed to update user');
  }
};
