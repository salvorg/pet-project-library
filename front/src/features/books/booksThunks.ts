import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { Book, BookApi, BookApiWithLabel, ValidationError } from '../../../types';
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

export const createBook = createAsyncThunk<void, Book, { rejectValue: ValidationError }>(
  'books/create',
  async (book, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(book) as (keyof Book)[];

      keys.forEach((key) => {
        const value = book[key];

        if (value !== null) {
          if (Array.isArray(value) || typeof value === 'number') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
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

export const updateBook = createAsyncThunk<void, Book, { rejectValue: ValidationError }>(
  'books/update',
  async (book, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(book) as (keyof Book)[];

      keys.forEach((key) => {
        const value = book[key];

        if (value !== null) {
          if (Array.isArray(value) || typeof value === 'number') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });

      await axiosApi.patch('/books', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const searchBooks = createAsyncThunk<BookApiWithLabel[], string>('books/search', async (searchTerm) => {
  const response = await axiosApi.get(`/books?search=${searchTerm}`);
  return response.data;
});
