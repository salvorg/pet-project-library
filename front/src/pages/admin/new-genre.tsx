import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import GenreForm from '@/components/Forms/GenreForm';
import { useAppDispatch } from '@/app/hooks';
import { useRouter } from 'next/router';
import { createGenre } from '@/features/genres/genresThunks';

const NewGenre = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onFormSubmit = async (genre: string) => {
    try {
      await dispatch(createGenre(genre));
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
            Add new genre:
          </Typography>
          <GenreForm onSubmit={onFormSubmit} />
        </Grid>
      </Box>
    </Container>
  );
};

export default NewGenre;
