import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandshakeIcon from '@mui/icons-material/Handshake';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { BookApiWithLabel } from '../../../types';
import { useRouter } from 'next/router';

interface Props {
  book: BookApiWithLabel;
}

const BookCard: React.FC<Props> = ({ book }) => {
  const router = useRouter();
  const URL = 'http://localhost:8000/';

  return (
    <>
      <Card sx={{ maxWidth: 250 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {book.label}
            </Typography>
          }
        />
        <CardMedia component="img" width="50" height="200" image={URL + book.image} alt={book.label} />
        <CardContent sx={{ flexGrow: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {book.authors
              ? book.authors.length === 1
                ? `author: ${book.authors[0]}`
                : `authors: ${book.authors.join(', ')}`
              : null}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container justifyContent="space-between">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share" sx={{ borderRadius: '10%' }}>
              <HandshakeIcon />
              borrow
            </IconButton>
            <IconButton onClick={() => router.push(`/books/${book.id}`)}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default BookCard;
