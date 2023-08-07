import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { AppBar, Grid, Toolbar } from '@mui/material';
import UsersMenu from '@/components/UI/AppToolBar/UsersMenu';
import AnonymousMenu from '@/components/UI/AppToolBar/AnonymousMenu';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Search from '@/components/UI/SearchDrawer/Search';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const [showSearchState, setShowSearchState] = useState(false);
  const searchRef = useRef(null);
  const searchButtonRef = useRef(null);

  const handleToggleDiv = () => {
    setShowSearchState((prevState) => !prevState);
  };

  const handleClickOutside = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (
      searchRef.current instanceof Element &&
      !searchRef.current.contains(event.target) &&
      !searchButtonRef.current.contains(event.target)
    ) {
      setShowSearchState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#051a1d' }}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Link href={'/'}>
              <img
                src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png"
                alt="Library Logo"
                style={{ width: '50px', paddingTop: 5, alignSelf: 'center' }}
              />
            </Link>
            <Grid item sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
              <IconButton
                ref={searchButtonRef}
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
            </Grid>
            <Grid item>{user ? <UsersMenu user={user} /> : <AnonymousMenu />}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {showSearchState && (
        <Grid container ref={searchRef}>
          <Search />
        </Grid>
      )}
    </>
  );
};

export default AppToolbar;
