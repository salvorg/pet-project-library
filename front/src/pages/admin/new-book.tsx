import React from 'react';
import { BookMutation } from '../../../types';
import { useAppDispatch } from '@/app/hooks';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Typography } from '@mui/material';
import { createBook } from '@/features/books/booksThunks';
import BookForm from '@/components/Forms/BookForm';

const NewBook = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onFormSubmit = async (book: BookMutation) => {
    try {
      if (book) {
        await dispatch(createBook(book));
        await router.push('/');
      }
    } catch {
      throw new Error();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid item xs={6}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Add new book:
          </Typography>
          <BookForm onSubmit={onFormSubmit} />
        </Grid>
      </Box>
    </Container>
  );
};

export default NewBook;
