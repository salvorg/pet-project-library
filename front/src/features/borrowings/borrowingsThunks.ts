import { createAsyncThunk } from '@reduxjs/toolkit';
import { BorrowingsApi, NewBorrowing } from '../../../types';
import axiosApi from '../../../axiosApi';

export const searchBorrowings = createAsyncThunk<BorrowingsApi[], number>('borrowings/fetchAll', async (userId) => {
  const response = await axiosApi.get(`/borrowings?search=${userId}`);
  return response.data;
});

export const createBorrowing = createAsyncThunk<void, NewBorrowing>('borrowings/create', async (data) => {
  try {
    await axiosApi.post('/borrowings', data);
  } catch (e) {
    throw new Error('something wrong on creating borrowing');
  }
});

export const returnBorrowing = createAsyncThunk<void, number>('borrowings/update', async (id) => {
  try {
    await axiosApi.patch('/borrowings', id);
  } catch (e) {
    throw new Error('something wrong on patching borrowing');
  }
});
