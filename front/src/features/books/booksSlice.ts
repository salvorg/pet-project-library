import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, AppStore } from '@/app/store';
import { fetchAllBooks, fetchOneBook, searchBooks, updateBook } from '@/features/books/booksThunks';
import { HYDRATE } from 'next-redux-wrapper';
import { BookApi, BookApiWithLabel } from '../../../types';

interface BooksState {
  items: BookApi[];
  found: BookApiWithLabel[];
  item: BookApi | null;
  fetchLoading: boolean;
  fetchingOne: boolean;
  updating: boolean;
  searching: boolean;
}

const initialState: BooksState = {
  items: [],
  found: [],
  item: null,
  fetchLoading: false,
  fetchingOne: false,
  updating: false,
  searching: false,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // return action.payload.books;
      const { payload } = action as PayloadAction<AppState>;
      return {
        ...state,
        ...payload.books,
      };
    });

    builder.addCase(fetchAllBooks.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAllBooks.fulfilled, (state, { payload: books }) => {
      state.fetchLoading = false;
      state.items = books;
    });
    builder.addCase(fetchAllBooks.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneBook.pending, (state) => {
      state.fetchingOne = true;
    });
    builder.addCase(fetchOneBook.fulfilled, (state, { payload: book }) => {
      state.fetchingOne = false;
      state.item = book;
    });
    builder.addCase(fetchOneBook.rejected, (state) => {
      state.fetchingOne = false;
    });

    builder.addCase(searchBooks.pending, (state) => {
      state.searching = true;
    });
    builder.addCase(searchBooks.fulfilled, (state, { payload: book }) => {
      state.searching = false;
      state.found = book;
    });
    builder.addCase(searchBooks.rejected, (state) => {
      state.searching = false;
    });

    builder.addCase(updateBook.pending, (state) => {
      state.updating = true;
    });
    builder.addCase(updateBook.fulfilled, (state, { payload: book }) => {
      state.updating = false;
    });
    builder.addCase(updateBook.rejected, (state) => {
      state.updating = false;
    });
  },
});

export const booksReducer = booksSlice.reducer;

export const selectBooks = (state: AppStore) => state.books.items;
export const selectFoundBooks = (state: AppStore) => state.books.found;
export const selectOneBook = (state: AppStore) => state.books.item;
export const selectBookUpdating = (state: AppStore) => state.books.updating;
