import React, { useState } from 'react';
import { User } from '../../../../types';
import { Button, Menu, MenuItem } from '@mui/material';
import { logout } from '@/features/users/usersThunks';
import { useAppDispatch } from '@/app/hooks';
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
        {/*<Avatar src={user.googleId ? user.avatar : apiURL + '/' + user.avatar} alt={user.avatar} sx={{ ml: 1 }} />*/}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {user.role === 'admin' && <MenuItem onClick={() => router.push('/admin')}>Admin panel</MenuItem>}
        {user.role === 'admin' && <MenuItem onClick={() => router.push('/admin/new-author')}>Add new author</MenuItem>}
        {user.role === 'admin' && <MenuItem onClick={() => router.push('/admin/new-genre')}>Add new genre</MenuItem>}
        {user.role === 'admin' && <MenuItem onClick={() => router.push('/admin/new-book')}>Add new book</MenuItem>}
        <MenuItem onClick={() => router.push('/my-profile')}>My profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
