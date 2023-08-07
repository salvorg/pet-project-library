import { FoundItem, GenresApi, ValidationError } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { createGenre, searchGenres } from '@/features/genres/genresThunks';

interface GenresSlice {
  genres: GenresApi[];
  found: FoundItem[];
  fetching: boolean;
  searching: boolean;
  fetchingOne: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  validationError: ValidationError | null;
}

const initialState: GenresSlice = {
  genres: [],
  found: [],
  fetching: false,
  searching: false,
  fetchingOne: false,
  creating: false,
  updating: false,
  deleting: false,
  validationError: null,
};

export const genresSlice = createSlice({
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

    builder.addCase(searchGenres.pending, (state) => {
      state.searching = true;
    });
    builder.addCase(searchGenres.fulfilled, (state, { payload: genres }) => {
      state.searching = false;
      state.found = genres;
    });
    builder.addCase(searchGenres.rejected, (state) => {
      state.searching = false;
    });
  },
});

export const genresReducer = genresSlice.reducer;

export const selectGenres = (state: RootState) => state.authors.genres;
export const selectFoundGenres = (state: RootState) => state.genres.found;

export const selectGenreCreating = (state: RootState) => state.genres.creating;
