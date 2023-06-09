import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { FoundItem } from '../../../types';

export const createGenre = createAsyncThunk<void, string>('genres/create', async (genre) => {
  await axiosApi.post('/genres', { name: genre });
});

export const searchGenres = createAsyncThunk<FoundItem[], string>('genres/search', async (searchTerm) => {
  const response = await axiosApi.get(`/genres?search=${searchTerm}`);
  return response.data;
});
