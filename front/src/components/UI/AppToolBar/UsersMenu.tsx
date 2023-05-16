import React, { useState } from 'react';
import { User } from '../../../../types';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { logout } from '@/features/users/usersThunks';
import { useAppDispatch } from '@/app/hooks';
import { apiURL } from '../../../../constants';
import { useRouter } from 'next/router';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await router.push('/');
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        {user.firstName}
        <Avatar src={user.googleId ? user.avatar : apiURL + '/' + user.avatar} alt={user.avatar} sx={{ ml: 1 }} />
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => router.push('/')}>Add new artist</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
