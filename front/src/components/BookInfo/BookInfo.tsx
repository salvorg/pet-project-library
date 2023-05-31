import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface Props {
  id: number;
  authors: string[] | null;
  genres: string[] | null;
  title: string;
  description: string;
  availableCopies: number;
  publisher: string;
  image: string | null;
}

const BookInfo: React.FC<Props> = ({ id, authors, description, availableCopies, genres, publisher, image, title }) => {
  const router = useRouter();

  const goToAuthorInfo = () => {};

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <img src={`http://localhost:8000/${image}`} alt="Book Cover" style={{ maxWidth: '100%', height: 'auto' }} />
      </Grid>
      <Grid item>
        <Typography>
          <strong>Description:</strong> {description}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          <strong>Publisher:</strong> {publisher}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          <strong>Available copies:</strong> {availableCopies}
        </Typography>
      </Grid>
      <Grid item>
        {authors && (
          <Typography>
            {authors.length === 1 ? (
              <span>
                <strong>Author:</strong> {authors[0]}
              </span>
            ) : (
              <span>
                <strong>Authors:</strong> {authors.join(', ')}
              </span>
            )}
          </Typography>
        )}
      </Grid>
      <Grid item>
        {genres && (
          <Typography>
            <strong>Genres:</strong> {genres.join(', ')}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default BookInfo;
