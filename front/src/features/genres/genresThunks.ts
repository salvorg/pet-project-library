import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';

export const createGenre = createAsyncThunk<void, string>('genres/create', async (genre) => {
  await axiosApi.post('/genres', { name: genre });
});
