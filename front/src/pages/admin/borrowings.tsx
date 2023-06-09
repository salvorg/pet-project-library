import React, { useEffect, useState } from 'react';
import { Button, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { BookApiWithLabel, BorrowingsApi, FoundItem } from '../../../types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectFoundUsers } from '@/features/users/usersSlice';
import { searchUsers } from '@/features/users/usersThunks';
import AutoCompleter from '@/components/AutoCompleter/AutoCompleter';
import { createBorrowing, returnBorrowing, searchBorrowings } from '@/features/borrowings/borrowingsThunks';
import { selectBorrowingCreating, selectFoundBorrowings } from '@/features/borrowings/borrowingsSlice';
import { searchBooks } from '@/features/books/booksThunks';
import { selectFoundBooks } from '@/features/books/booksSlice';
import BookCard from '@/components/Cards/BookCard';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';

const Borrowings = () => {
  const dispatch = useAppDispatch();
  const foundUsers: FoundItem[] = useAppSelector(selectFoundUsers);
  const foundBooks: BookApiWithLabel[] = useAppSelector(selectFoundBooks);
  const foundBorrowings: BorrowingsApi[] = useAppSelector(selectFoundBorrowings);
  const creatingBorrowing = useAppSelector(selectBorrowingCreating);
  const [selectedUser, setSelectedUser] = useState<FoundItem | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookApiWithLabel | null>(null);
  const [matchUser, setMatchUser] = useState<string>('');
  const [matchBook, setMatchBook] = useState<string>('');

  useEffect(() => {
    if (matchUser.length) {
      dispatch(searchUsers(matchUser));
    }
    if (matchBook.length) {
      dispatch(searchBooks(matchBook));
    }
  }, [dispatch, matchUser, matchBook]);

  useEffect(() => {
    if (selectedUser && selectedUser.id) {
      dispatch(searchBorrowings(selectedUser.id));
    }
  }, [dispatch, selectedUser, selectedBook]);

  const handleAutocompleteUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMatchUser(value);
  };

  const handleAutocompleteBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMatchBook(value);
  };

  const handleBorrowing = async () => {
    if (selectedUser && selectedBook) {
      const newBorrowing = {
        user: selectedUser.id,
        book: selectedBook.id,
      };

      await dispatch(createBorrowing(newBorrowing));
      setSelectedBook(null);
    }
  };

  const handleRemove = async (id: number) => {
    if (selectedUser) {
      await dispatch(returnBorrowing(id));
    }
  };

  const message =
    selectedBook && selectedUser
      ? `Do you want to add this book to ${selectedUser.label}'s borrowings?`
      : selectedBook && !selectedUser
      ? 'Choose user first'
      : !selectedBook && selectedUser
      ? 'Choose book first'
      : 'Choose user and book first';

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sx={{ border: '1px solid #82877e', p: 2 }}>
        <Typography sx={{ mb: 2 }}>Search borrowings:</Typography>
        <AutoCompleter
          label="Search by name"
          options={foundUsers}
          selectedState={selectedUser ? selectedUser : null}
          setSelectedState={setSelectedUser}
          handleAutocompleteChange={handleAutocompleteUserChange}
        />
        <Typography sx={{ mb: 2, mt: 2 }}>Create borrowing:</Typography>
        <AutoCompleter
          label="Search available book's copy"
          options={foundBooks}
          selectedState={selectedBook ? selectedBook : null}
          setSelectedState={setSelectedBook}
          handleAutocompleteChange={handleAutocompleteBookChange}
        />
        {selectedBook ? <BookCard book={selectedBook} /> : null}
        <Typography sx={{ mt: 4, mb: 2 }}>{message}</Typography>
        <LoadingButton
          loading={creatingBorrowing}
          type="button"
          variant="contained"
          sx={{ backgroundColor: '#133136' }}
          onClick={handleBorrowing}
        >
          Create
        </LoadingButton>
      </Grid>
      <Grid item xs={6} sx={{ border: '1px solid #82877e', p: 2 }}>
        {selectedUser && (
          <List>
            {foundBorrowings.map((borrowing) =>
              borrowing.returnDate ? null : (
                <ListItem key={borrowing.id} sx={{ border: '1px solid #82877e', mb: 1, display: 'flex' }}>
                  <ListItemText
                    sx={{ flexGrow: 1 }}
                    primaryTypographyProps={{ variant: 'subtitle1', mr: 2 }}
                    primary={borrowing.bookTitle}
                    secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondary={`Borrowed: ${dayjs(borrowing.borrowDate).format('DD-MM-YYYY')}`}
                  />
                  <ListItemText
                    sx={{ flexGrow: 0 }}
                    primaryTypographyProps={{ variant: 'body2', color: 'red' }}
                    primary={`Expires:`}
                    secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondary={dayjs(borrowing.expiredDate).format('DD-MM-YYYY')}
                  />
                  <Button
                    sx={{ backgroundColor: '#133136', color: 'white', ml: 3 }}
                    onClick={() => handleRemove(borrowing.id)}
                  >
                    Make return
                  </Button>
                </ListItem>
              ),
            )}
          </List>
        )}
      </Grid>
    </Grid>
  );
};

export default Borrowings;
