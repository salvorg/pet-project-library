import { createAsyncThunk } from '@reduxjs/toolkit';
import { Author, FoundItem } from '../../../types';
import axiosApi from '../../../axiosApi';

export const createAuthor = createAsyncThunk<void, Author>('authors/create', async (author) => {
  const formData = new FormData();
  const keys = Object.keys(author) as (keyof Author)[];

  keys.forEach((key) => {
    const value = author[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.post('/authors', formData);
});

export const searchAuthors = createAsyncThunk<FoundItem[], string>('authors/search', async (searchTerm) => {
  const response = await axiosApi.get(`/authors?search=${searchTerm}`);
  return response.data;
});
