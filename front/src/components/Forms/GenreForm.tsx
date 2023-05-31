import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import FormCreatingButton from '@/components/UI/Buttons/FormCreatingButton';
import { useAppSelector } from '@/app/hooks';
import { selectGenreCreating } from '@/features/genres/genresSlice';

interface Props {
  onSubmit: (genre: string) => void;
}

const GenreForm: React.FC<Props> = ({ onSubmit }) => {
  const creating = useAppSelector(selectGenreCreating);
  const [state, setState] = useState<string>('');

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState(value);
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            fullWidth
            id="name"
            label="Name"
            value={state}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>
        <Grid item xs>
          <FormCreatingButton creating={creating} />
        </Grid>
      </Grid>
    </form>
  );
};

export default GenreForm;
