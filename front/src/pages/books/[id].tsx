import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchOneBook } from '@/features/books/booksThunks';
import { selectOneBook } from '@/features/books/booksSlice';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import BookInfo from '@/components/BookInfo/BookInfo';

const BookInfoPage = () => {
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectOneBook);
  const id = useRouter().query.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchOneBook(id as string));
    }
  }, [dispatch, id]);

  return (
    <Grid container>
      {book ? (
        <BookInfo
          id={book.id}
          authors={book.authors}
          genres={book.genres}
          title={book.title}
          description={book.description}
          availableCopies={book.availableCopies}
          publisher={book.publisher}
          image={book.image}
        />
      ) : null}
    </Grid>
  );
};

export default BookInfoPage;
