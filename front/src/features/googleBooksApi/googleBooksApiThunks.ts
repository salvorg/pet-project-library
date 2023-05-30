import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';

export const fetchBooks = createAsyncThunk('googleBooksApi/fetchBooks', async () => {
  const response = await axiosApi.get('/books-api');
  return response.data;
});
