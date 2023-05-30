import React, { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { AppBar, Grid, Toolbar } from '@mui/material';
import UsersMenu from '@/components/UI/AppToolBar/UsersMenu';
import AnonymousMenu from '@/components/UI/AppToolBar/AnonymousMenu';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const [showSearchState, setShowSearchState] = useState(false);

  const handleToggleDiv = () => {
    setShowSearchState(!showSearchState);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#051a1d' }}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <IconButton
              onClick={handleToggleDiv}
              sx={{
                color: '#f9f9f9',
                fontSize: 18,
                transition: 'font-size 0.7s',
                '&:hover': { color: '#d0c4f4', fontSize: 21 },
              }}
            >
              <SearchIcon />
              Search
            </IconButton>
            <Link href={'/'}>
              <img
                src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png"
                alt="Library Logo"
                style={{ width: '50px', paddingTop: 5, alignSelf: 'center' }}
              />
            </Link>
            <Grid item>{user ? <UsersMenu user={user} /> : <AnonymousMenu />}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {showSearchState && (
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consectetur deleniti distinctio ea expedita
          impedit inventore ipsum magnam nulla officiis, quas quia quidem, quod recusandae suscipit? Architecto qui
          recusandae reprehenderit. A accusamus animi aperiam assumenda at dolore doloribus ducimus eaque enim, error
          esse est ex expedita molestias nam obcaecati officiis placeat porro quod rerum saepe sapiente vitae
          voluptates. Ab adipisci at commodi, delectus doloribus eius eligendi ex exercitationem facere magnam natus
          optio perferendis perspiciatis possimus quidem quod voluptate voluptatem! Ab alias aliquam animi architecto
          consequatur cupiditate delectus distinctio exercitationem explicabo fugit natus nihil nostrum officiis optio
          porro praesentium, tenetur ut.
        </div>
      )}
    </>
  );
};

export default AppToolbar;
