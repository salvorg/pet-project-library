import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import FileInput from '@/components/UI/FileInput/FileInput';
import FormCreatingButton from '@/components/UI/Buttons/FormCreatingButton';
import { Author } from '../../../types';
import { useAppSelector } from '@/app/hooks';
import { selectAuthorCreating } from '@/features/authors/authorsSlice';

interface Props {
  onSubmit: (author: Author) => void;
}

const AuthorForm: React.FC<Props> = ({ onSubmit }) => {
  const creating = useAppSelector(selectAuthorCreating);
  const [state, setState] = useState<Author>({
    name: '',
    description: '',
    image: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
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
          <TextField
            fullWidth
            id="name"
            label="Name"
            value={state.name}
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
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
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

export default AuthorForm;
