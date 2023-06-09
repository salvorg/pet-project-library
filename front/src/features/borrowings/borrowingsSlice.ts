import { BorrowingsApi, ValidationError } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '@/app/store';
import { createBorrowing, returnBorrowing, searchBorrowings } from '@/features/borrowings/borrowingsThunks';

interface BorrowingsSlice {
  borrowings: BorrowingsApi[];
  found: BorrowingsApi[];
  fetching: boolean;
  searching: boolean;
  fetchingOne: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  validationError: ValidationError | null;
}

const initialState: BorrowingsSlice = {
  borrowings: [],
  found: [],
  fetching: false,
  searching: false,
  fetchingOne: false,
  creating: false,
  updating: false,
  deleting: false,
  validationError: null,
};

const borrowingsSlice = createSlice({
  name: 'borrowings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBorrowing.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createBorrowing.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createBorrowing.rejected, (state) => {
      state.creating = false;
    });

    builder.addCase(searchBorrowings.pending, (state) => {
      state.searching = true;
    });
    builder.addCase(searchBorrowings.fulfilled, (state, { payload: borrowings }) => {
      state.searching = false;
      state.found = borrowings;
    });
    builder.addCase(searchBorrowings.rejected, (state) => {
      state.searching = false;
    });

    builder.addCase(returnBorrowing.pending, (state) => {
      state.updating = true;
    });
    builder.addCase(returnBorrowing.fulfilled, (state) => {
      state.updating = false;
    });
    builder.addCase(returnBorrowing.rejected, (state) => {
      state.updating = false;
    });
  },
});

export const borrowingsReducer = borrowingsSlice.reducer;

export const selectBorrowings = (state: AppState) => state.borrowings.borrowings;
export const selectFoundBorrowings = (state: AppState) => state.borrowings.found;

export const selectBorrowingCreating = (state: AppState) => state.borrowings.creating;
