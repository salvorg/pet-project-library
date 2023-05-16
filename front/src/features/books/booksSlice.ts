import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { fetchAllBooks } from '@/features/books/booksThunks';

interface BooksState {
  items: [];
  fetchLoading: boolean;
}

const initialState: BooksState = {
  items: [],
  fetchLoading: false,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export const booksReducer = booksSlice.reducer;

export const selectBooks = (state: RootState) => state.books.items;
