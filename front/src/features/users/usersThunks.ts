import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FoundItem,
  LoginError,
  LoginMutation,
  ProfileMutation,
  RegisterMutation,
  User,
  ValidationError,
} from '../../../types';
import axiosApi from '../../../axiosApi';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';
import { RootState } from '@/app/store';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<User>('users/register', registerMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const googleLogin = createAsyncThunk<User, string, { rejectValue: LoginError }>(
  'users/googleLogin',
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/users/google-authentication', { accessToken });
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as LoginError);
      }
      throw e;
    }
  },
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: LoginError }>(
  'users/login',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<User>('users/login', loginInfo);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data as LoginError);
      }
      throw e;
    }
  },
);

export const logout = createAsyncThunk<void, void, { state: RootState }>('users/logout', async (_, { dispatch }) => {
  await axiosApi.delete('users/logout');
  dispatch(unsetUser());
});

export const editUserProfile = createAsyncThunk<User, ProfileMutation, { rejectValue: ValidationError }>(
  'users/edit',
  async (profileMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch<User>('users/edit-profile', profileMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const searchUsers = createAsyncThunk<FoundItem[], string>('users/search', async (searchTerm) => {
  const response = await axiosApi.get(`/users?search=${searchTerm}`);
  return response.data;
});
