import React from 'react';
import { useAppDispatch } from '@/app/hooks';
import { useRouter } from 'next/router';
import { Author } from '../../../types';
import AuthorForm from '@/components/Forms/AuthorForm';
import { Box, Container, Grid, Typography } from '@mui/material';
import { createAuthor } from '@/features/authors/authorsThunks';

const NewAuthor = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onFormSubmit = async (author: Author) => {
    try {
      await dispatch(createAuthor(author));
      await router.push('/');
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
            Add new author:
          </Typography>
          <AuthorForm onSubmit={onFormSubmit} />
        </Grid>
      </Box>
    </Container>
  );
};

export default NewAuthor;
