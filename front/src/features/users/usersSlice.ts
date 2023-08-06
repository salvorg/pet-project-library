import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoundItem, LoginError, User, ValidationError } from '../../../types';
import { editUserProfile, googleLogin, login, register, searchUsers } from './usersThunks';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState, RootStore } from '@/app/store';

export interface UserState {
  user: User | null;
  found: FoundItem[];
  searching: boolean;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: LoginError | null;
  editLoading: boolean;
}

const initialState: UserState = {
  user: null,
  found: [],
  searching: false,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  editLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      const { payload } = action as PayloadAction<RootStore>;
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

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.registerError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(editUserProfile.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(editUserProfile.fulfilled, (state, { payload: user }) => {
      state.editLoading = false;
      state.user = user;
    });
    builder.addCase(editUserProfile.rejected, (state) => {
      state.editLoading = false;
    });

    builder.addCase(searchUsers.pending, (state) => {
      state.searching = true;
    });
    builder.addCase(searchUsers.fulfilled, (state, { payload: users }) => {
      state.searching = false;
      state.found = users;
    });
    builder.addCase(searchUsers.rejected, (state) => {
      state.searching = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;

export const { unsetUser } = usersSlice.actions;

export const selectUser = (state: RootStore) => state.users.user;
export const selectFoundUsers = (state: RootState) => state.users.found;

export const selectRegisterLoading = (state: RootStore) => state.users.registerLoading;
export const selectRegisterError = (state: RootStore) => state.users.registerError;
export const selectLoginLoading = (state: RootStore) => state.users.loginLoading;
export const selectLoginError = (state: RootStore) => state.users.loginError;
export const selectEditLoading = (state: RootStore) => state.users.editLoading;
