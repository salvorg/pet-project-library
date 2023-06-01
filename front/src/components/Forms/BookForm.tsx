import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import FileInput from '@/components/UI/FileInput/FileInput';
import FormCreatingButton from '@/components/UI/Buttons/FormCreatingButton';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectAuthorCreating, selectFoundAuthors } from '@/features/authors/authorsSlice';
import { AuthorMutation, Book, GenresApi } from '../../../types';
import { searchAuthors } from '@/features/authors/authorsThunks';
import MultiCompliter from '@/components/MultiCompliter/MultiCompliter';
import { searchGenres } from '@/features/genres/genresThunks';
import { selectFoundGenres } from '@/features/genres/genresSlice';

interface Props {
  onSubmit: (book: Book) => void;
}

const BookForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const foundAuthors: AuthorMutation[] = useAppSelector(selectFoundAuthors);
  const foundGenres: GenresApi[] = useAppSelector(selectFoundGenres);
  const creating = useAppSelector(selectAuthorCreating);

  const [match, setMatch] = useState<string>('');
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [state, setState] = useState<Book>({
    authors: [],
    genres: [],
    title: '',
    description: '',
    availableCopies: 0,
    publisher: '',
    image: null,
  });

  useEffect(() => {
    if (match.length) {
      dispatch(searchAuthors(match));
      dispatch(searchGenres(match));
    }
  }, [dispatch, match]);

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
    const finalState = {
      ...state,
      authors: selectedAuthors,
      genres: selectedGenres,
    };
    onSubmit(finalState);
  };

  const handleAutocompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMatch(value);
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
          <MultiCompliter
            label="Choose authors"
            options={foundAuthors}
            selectedState={selectedAuthors}
            setSelectedState={setSelectedAuthors}
            handleAutocompleteChange={handleAutocompleteChange}
          />
        </Grid>
        <Grid item xs>
          <MultiCompliter
            label="Choose genres"
            options={foundGenres}
            selectedState={selectedGenres}
            setSelectedState={setSelectedGenres}
            handleAutocompleteChange={handleAutocompleteChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            id="title"
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
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
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            id="availableCopies"
            label="Available copies"
            value={state.availableCopies}
            onChange={inputChangeHandler}
            name="availableCopies"
            type="number"
            inputProps={{ min: 0 }}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            id="publisher"
            label="Publisher"
            value={state.publisher}
            onChange={inputChangeHandler}
            name="publisher"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput label="Image" onChange={fileInputChangeHandler} name="image" />
        </Grid>
        <Button type="button" onClick={() => console.log(state)}>
          State
        </Button>
        <Grid item xs>
          <FormCreatingButton creating={creating} />
        </Grid>
      </Grid>
    </form>
  );
};

export default BookForm;
