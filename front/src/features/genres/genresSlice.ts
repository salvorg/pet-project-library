import { GenresApi, ValidationError } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '@/app/store';
import { createGenre } from '@/features/genres/genresThunks';

interface GenresSlice {
  genres: GenresApi[];
  fetching: boolean;
  fetchingOne: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  validationError: ValidationError | null;
}

const initialState: GenresSlice = {
  genres: [],
  fetching: false,
  fetchingOne: false,
  creating: false,
  updating: false,
  deleting: false,
  validationError: null,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createGenre.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createGenre.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createGenre.rejected, (state) => {
      state.creating = false;
    });
  },
});

export const genresReducer = genresSlice.reducer;

export const selectGenreCreating = (state: AppState) => state.genres.creating;
