import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { BookApi } from '../../../types';

export const fetchAllBooks = createAsyncThunk<BookApi[]>('books/fetchAll', async () => {
  const response = await axiosApi.get('/books');
  return response.data;
});

export const fetchOneBook = createAsyncThunk<BookApi, string>('books/fetchOneBook', async (id) => {
  console.log();
  const response = await axiosApi.get(`/books/${Number(id)}`);
  return response.data;
});
