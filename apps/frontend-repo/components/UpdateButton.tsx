'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Stack, TextField, Divider } from '@mui/material';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '@/store/reducers';
import { RootState } from '@/store/store';
import { fetchUser } from '@/apis/userApi';
import {User} from "../../../packages/shared/user";

export default function UpdateButton() {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state: RootState) => state.user);
  const [userId, setUserId] = useState('user-a');

  const handleClick = async () => {
    if (!userId.trim()) return;

    dispatch(fetchUserStart());
    try {
      const data: User | null = await fetchUser(userId);
      if (data) {
        dispatch(fetchUserSuccess(data));
      } else {
        dispatch(fetchUserFailure('User not found.'));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      dispatch(fetchUserFailure(message));
    }
  };

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <TextField
        label="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        size="small"
        fullWidth
      />

      <Button variant="contained" onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch User Info'}
      </Button>

      {user && (
        <>
          <Divider />
          <Typography variant="h6">{user.name || 'No Name'}</Typography>
          <Typography>Email: {user.email || 'N/A'}</Typography>
          <Typography>
            Rating:{' '}
            {typeof user.totalAverageWeightRatings === 'number'
              ? user.totalAverageWeightRatings.toFixed(2)
              : 'N/A'}
          </Typography>
          <Typography>
            Rents:{' '}
            {typeof user.numberOfRents === 'number' ? user.numberOfRents : 'N/A'}
          </Typography>
          <Typography>
            Last Active:{' '}
            {user.recentlyActive
              ? new Date(user.recentlyActive * 1000).toLocaleString()
              : 'N/A'}
          </Typography>
          <Typography>
            Score:{' '}
            {typeof user.potentialScore === 'number'
              ? user.potentialScore.toFixed(2)
              : 'N/A'}
          </Typography>
        </>
      )}

      {error && <Typography color="error">{error}</Typography>}
    </Stack>
  );
}
