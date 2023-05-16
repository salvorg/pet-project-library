import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';

export const fetchAllBooks = createAsyncThunk('books/fetchAll', async () => {
  const response = await axiosApi.get('/books');
  return response.data;
});
