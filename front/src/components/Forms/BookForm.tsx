import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import FileInput from '@/components/UI/FileInput/FileInput';
import FormCreatingButton from '@/components/UI/Buttons/FormCreatingButton';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectAuthorCreating, selectFoundAuthors } from '@/features/authors/authorsSlice';
import { AuthorMutation, BookMutation } from '../../../types';
import { searchAuthors } from '@/features/authors/authorsThunks';

interface Props {
  onSubmit: (book: BookMutation) => void;
}

const BookForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const foundAuthors: AuthorMutation[] = useAppSelector(selectFoundAuthors);
  const creating = useAppSelector(selectAuthorCreating);
  const [authors, setAuthors] = useState<AuthorMutation[]>([]);
  const [authorsMatch, setAuthorsMatch] = useState<string>('');
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorMutation | null>(null);
  const [genres, setGenres] = useState<number[] | null>(null);
  const [state, setState] = useState<BookMutation>({
    authors: [],
    genres: [],
    title: '',
    description: '',
    availableCopies: 0,
    publisher: '',
  });

  useEffect(() => {
    if (authorsMatch.length) {
      dispatch(searchAuthors(authorsMatch));
    }
  }, [dispatch, authorsMatch]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const handleAutocompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setAuthorsMatch(value);

    // dispatch(searchAuthors(value))
    //   .then((authors: AuthorMutation) => {
    //     setAuthors((prevState) => [...prevState, authors]);
    //   })
    //   .catch((error: Error) => {
    //     console.error('Ошибка при выполнении запроса на поиск авторов:', error);
    //   });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Autocomplete
            freeSolo
            options={foundAuthors}
            value={selectedAuthor}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Authors" onChange={handleAutocompleteChange} />}
          />
        </Grid>

        <Grid item xs>
          <TextField
            fullWidth
            id="name"
            label="Name"
            value={state?.title}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            multiline
            rows={5}
            id="description"
            label="Description"
            value={state?.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            id="availableCopies"
            label="Available copies"
            value={state?.availableCopies}
            onChange={inputChangeHandler}
            name="availableCopies"
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            id="publisher"
            label="Publisher"
            value={state?.publisher}
            onChange={inputChangeHandler}
            name="publisher"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput label="Image" onChange={fileInputChangeHandler} name="image" />
        </Grid>

        <Grid item xs>
          <FormCreatingButton creating={creating} />
        </Grid>
      </Grid>
    </form>
  );
};

export default BookForm;
