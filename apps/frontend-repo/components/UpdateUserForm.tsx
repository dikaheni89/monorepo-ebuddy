'use client';

import { useState } from 'react';
import { updateUser } from '@/apis/user';
import { Button, TextField, Typography } from '@mui/material';
import {User} from "../../../packages/shared/user";

export default function UpdateUserForm() {
  const [formData, setFormData] = useState<User>({
    id: '',
    name: '',
    email: '',
    totalAverageWeightRatings: 0,
    numberOfRents: 0,
    recentlyActive: 0,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateUser(formData);
      setMessage('User updated successfully.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="id"
        label="User ID"
        value={formData.id}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="totalAverageWeightRatings"
        label="Average Ratings"
        type="number"
        value={formData.totalAverageWeightRatings}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="numberOfRents"
        label="Number of Rents"
        type="number"
        value={formData.numberOfRents}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="recentlyActive"
        label="Recently Active"
        type="number"
        value={formData.recentlyActive}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Updating...' : 'Update User'}
      </Button>

      {message && (
        <Typography color={message.includes('successfully') ? 'primary' : 'error'} mt={2}>
          {message}
        </Typography>
      )}
    </form>
  );
}
