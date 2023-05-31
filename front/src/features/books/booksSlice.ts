import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, AppStore } from '@/app/store';
import { fetchAllBooks, fetchOneBook } from '@/features/books/booksThunks';
import { HYDRATE } from 'next-redux-wrapper';
import { BookApi } from '../../../types';

interface BooksState {
  items: BookApi[];
  item: BookApi | null;
  fetchLoading: boolean;
  fetchingOne: boolean;
}

const initialState: BooksState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchingOne: false,
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
  },
});

export const booksReducer = booksSlice.reducer;

export const selectBooks = (state: AppStore) => state.books.items;
export const selectOneBook = (state: AppStore) => state.books.item;
