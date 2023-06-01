import { AuthorApi, AuthorMutation, ValidationError } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createAuthor, searchAuthors } from '@/features/authors/authorsThunks';
import { AppState } from '@/app/store';

interface AuthorsSlice {
  authors: AuthorApi[];
  found: AuthorMutation[];
  fetching: boolean;
  searching: boolean;
  fetchingOne: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  validationError: ValidationError | null;
}

const initialState: AuthorsSlice = {
  authors: [],
  found: [],
  fetching: false,
  searching: false,
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

    builder.addCase(searchAuthors.pending, (state) => {
      state.searching = true;
    });
    builder.addCase(searchAuthors.fulfilled, (state, { payload: authors }) => {
      state.searching = false;
      state.found = authors;
    });
    builder.addCase(searchAuthors.rejected, (state) => {
      state.searching = false;
    });
  },
});

export const authorsReducer = authorsSlice.reducer;

export const selectAuthors = (state: AppState) => state.authors.authors.authors;
export const selectFoundAuthors = (state: AppState) => state.authors.found;

export const selectAuthorCreating = (state: AppState) => state.authors.creating;
