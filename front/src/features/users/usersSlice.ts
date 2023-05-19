import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginError, User, ValidationRegister } from '../../../types';
import { editUserProfile, googleLogin, login, register } from './usersThunks';
import { HYDRATE } from 'next-redux-wrapper';
import { AppStore } from '@/app/store';

interface UserState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationRegister | null;
  loginLoading: boolean;
  loginError: LoginError | null;
  editLoading: boolean;
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  editLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      const { payload } = action as PayloadAction<AppStore>;
      return {
        ...state,
        ...payload.users,
      };
    });

    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: user }) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.registerError = null;
      })
      .addCase(login.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(googleLogin.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(googleLogin.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(editUserProfile.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editUserProfile.fulfilled, (state, { payload: user }) => {
        state.editLoading = false;
        state.user = user;
      })
      .addCase(editUserProfile.rejected, (state) => {
        state.editLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;

export const { unsetUser } = usersSlice.actions;

export const selectUser = (state: AppStore) => state.users.user;
export const selectRegisterLoading = (state: AppStore) => state.users.registerLoading;
export const selectRegisterError = (state: AppStore) => state.users.registerError;
export const selectLoginLoading = (state: AppStore) => state.users.loginLoading;
export const selectLoginError = (state: AppStore) => state.users.loginError;
export const selectEditLoading = (state: AppStore) => state.users.editLoading;
