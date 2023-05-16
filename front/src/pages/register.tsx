import React, { useEffect, useState } from 'react';
import { Avatar, Box, Container, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectRegisterError, selectRegisterLoading } from '@/features/users/usersSlice';
import { register } from '@/features/users/usersThunks';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { RegisterMutation } from '../../types';
import Link from 'next/link';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(true);
  const [state, setState] = useState<RegisterMutation>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      await router.push('/');
    } catch (e) {
      throw new Error();
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  useEffect(() => {
    if (state.firstName.length && state.lastName.length && state.password.length) {
      setBtnLoading(false);
    }
  }, [state]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                autoComplete="new-email"
                value={state.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="FirstName"
                name="firstName"
                autoComplete="new-firstName"
                value={state.firstName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('firstName'))}
                helperText={getFieldError('firstName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last name"
                name="lastName"
                autoComplete="new-lastName"
                value={state.lastName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('lastName'))}
                helperText={getFieldError('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
          </Grid>
          <LoadingButton
            disabled={btnLoading}
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/authorization">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
