import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { BookApi } from '../../../types';
import { useRouter } from 'next/router';

interface Props {
  book: BookApi;
}

const BookCard: React.FC<Props> = ({ book }) => {
  const router = useRouter();
  const URL = 'http://localhost:8000/';

  return (
    <Grid item>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={book.title}
          subheader={
            book.authors
              ? book.authors.length === 1
                ? `author: ${book.authors[0]}`
                : `authors: ${book.authors.join(', ')}`
              : null
          }
        />
        <CardMedia component="img" width="50" height="200" image={URL + book.image} alt={book.title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton onClick={() => router.push(`/books/${book.id}`)}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BookCard;
