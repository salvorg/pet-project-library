import React, { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import FileInput from '@/components/UI/FileInput/FileInput';
import { Book } from '../../../types';
import FormCreatingButton from '@/components/UI/Buttons/FormCreatingButton';
import { selectBookUpdating } from '@/features/books/booksSlice';
import { updateBook } from '@/features/books/booksThunks';

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
  const user = useAppSelector(selectUser);
  const updating = useAppSelector(selectBookUpdating);
  const dispatch = useAppDispatch();

  const [state, setState] = useState<Book>({
    authors,
    genres,
    title,
    description,
    availableCopies,
    publisher,
    image,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  let isEditMode = null;

  if (user && user.role === 'admin') {
    isEditMode = true;
  }

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files && files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }

    setState((prevState) => ({
      ...prevState,
      [name]: file ? file : null,
    }));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    if (!isNaN(parseFloat(value)) && isFinite(Number(value))) {
      parsedValue = parseFloat(value);
    }

    setState((prevState) => {
      return { ...prevState, [name]: parsedValue };
    });
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(updateBook(state));
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        {isEditMode ? (
          <TextField
            fullWidth
            multiline
            label="Title"
            value={state.title}
            rows={2}
            name="title"
            onChange={inputChangeHandler}
            required
          />
        ) : (
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
        )}
      </Grid>
      {isEditMode ? (
        <Grid item xs>
          {previewImage ? (
            <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', marginLeft: '18%' }} />
          ) : (
            <img
              src={`http://localhost:8000/${image}`}
              alt="Book Cover"
              style={{ maxWidth: '100%', height: 'auto', marginLeft: '18%' }}
            />
          )}
          <FileInput label="Image" onChange={fileInputChangeHandler} name="image" />
        </Grid>
      ) : (
        <Grid item>
          <img src={`http://localhost:8000/${image}`} alt="Book Cover" style={{ maxWidth: '100%', height: 'auto' }} />
        </Grid>
      )}
      <Grid item>
        {isEditMode ? (
          <TextField
            fullWidth
            label="Publisher"
            value={state.publisher}
            name="publisher"
            onChange={inputChangeHandler}
            required
          />
        ) : (
          <Typography>
            <strong>Publisher:</strong> {publisher}
          </Typography>
        )}
      </Grid>
      <Grid item>
        {isEditMode ? (
          <TextField
            fullWidth
            label="Available copies"
            value={state.availableCopies}
            name="availableCopies"
            onChange={inputChangeHandler}
            required
          />
        ) : (
          <Typography>
            <strong>Available copies:</strong> {availableCopies}
          </Typography>
        )}
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
      <Grid item>
        {isEditMode ? (
          <TextField
            fullWidth
            multiline
            rows={7}
            label="Description"
            value={state.description}
            name="description"
            onChange={inputChangeHandler}
            required
          />
        ) : (
          <Typography sx={{ maxWidth: '600px' }}>
            <strong>Description:</strong> {description}
          </Typography>
        )}
      </Grid>
      <Grid item>{isEditMode && <FormCreatingButton creating={updating} onSubmit={submitFormHandler} />}</Grid>
    </Grid>
  );
};

export default BookInfo;
