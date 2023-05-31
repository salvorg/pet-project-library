import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { BookApi, BookMutation, ValidationError } from '../../../types';
import { isAxiosError } from 'axios';

export const fetchAllBooks = createAsyncThunk<BookApi[]>('books/fetchAll', async () => {
  const response = await axiosApi.get('/books');
  return response.data;
});

export const fetchOneBook = createAsyncThunk<BookApi, string>('books/fetchOneBook', async (id) => {
  console.log();
  const response = await axiosApi.get(`/books/${Number(id)}`);
  return response.data;
});

export const createBook = createAsyncThunk<void, BookMutation, { rejectValue: ValidationError }>(
  'books/create',
  async (book, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(book) as (keyof BookMutation)[];

      keys.forEach((key) => {
        const value = book[key];

        if (value !== null) {
          formData.append(key, JSON.stringify(value));
        }
      });

      await axiosApi.post('/books', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);
