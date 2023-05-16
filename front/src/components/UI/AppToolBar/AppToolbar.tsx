import React from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import UsersMenu from '@/components/UI/AppToolBar/UsersMenu';
import AnonymousMenu from '@/components/UI/AppToolBar/AnonymousMenu';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link href="/">Library</Link>
          </Typography>
          <Grid item>{user ? <UsersMenu user={user} /> : <AnonymousMenu />}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
