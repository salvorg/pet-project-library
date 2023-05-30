import { AuthorApi, ValidationError } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createAuthor } from '@/features/authors/authorsThunks';
import { AppState } from '@/app/store';

interface AuthorsSlice {
  authors: AuthorApi[];
  fetching: boolean;
  fetchingOne: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  validationError: ValidationError | null;
}

const initialState: AuthorsSlice = {
  authors: [],
  fetching: false,
  fetchingOne: false,
  creating: false,
  updating: false,
  deleting: false,
  validationError: null,
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAuthor.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createAuthor.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createAuthor.rejected, (state) => {
      state.creating = false;
    });
  },
});

export const authorsReducer = authorsSlice.reducer;

export const selectAuthorCreating = (state: AppState) => state.authors.creating;
