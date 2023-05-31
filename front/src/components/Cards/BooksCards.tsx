import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectBooks } from '@/features/books/booksSlice';
import { fetchAllBooks } from '@/features/books/booksThunks';
import BookCard from '@//components/Cards/BookCard';
import { BookApi } from '../../../types';
import { Grid } from '@mui/material';

const BooksCards = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <Grid container direction="row" spacing={2}>
      {books.map((book: BookApi) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Grid>
  );
};

export default BooksCards;
