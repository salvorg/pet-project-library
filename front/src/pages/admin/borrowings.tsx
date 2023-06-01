import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { FoundUser } from '../../../types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectFoundUsers } from '@/features/users/usersSlice';
import { searchUsers } from '@/features/users/usersThunks';
import Chip from '@mui/material/Chip';

const Borrowings = () => {
  const dispatch = useAppDispatch();
  const foundUsers: FoundUser[] = useAppSelector(selectFoundUsers);
  const [selectedUser, setSelectedUser] = useState<FoundUser | null>(null);
  const [match, setMatch] = useState<string>('');

  useEffect(() => {
    if (match.length) {
      dispatch(searchUsers(match));
    }
  }, [dispatch, match]);

  const handleAutocompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMatch(value);
  };

  // const showBorrowings = () => {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Autocomplete
          id="user-search"
          freeSolo
          options={foundUsers}
          renderTags={(value: readonly FoundUser[], getTagProps) =>
            value.map((option: FoundUser, index: number) => (
              <Chip
                {...getTagProps({ index })}
                variant="outlined"
                key={option.id}
                label={option.firstName + ' ' + option.lastName}
              />
            ))
          }
          value={selectedUser}
          filterSelectedOptions
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.firstName + ' ' + option.lastName}
              </li>
            );
          }}
          getOptionLabel={(option: FoundUser | string) => {
            if (typeof option === 'string') {
              return option;
            }
            return option.firstName + ' ' + option.lastName;
          }}
          onChange={(e, value: string | FoundUser | null) => {
            setSelectedUser(value as FoundUser);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search by name" onChange={handleAutocompleteChange} sx={{ width: '240px' }} />
          )}
        />
        Список покупок выбранного пользователя
        <Button type="button" onClick={() => console.log(selectedUser)}>
          User
        </Button>
        {/*{selectedUser && (*/}
        {/*  <List>*/}
        {/*    {selectedUser.purchases.map((purchase) => (*/}
        {/*      <ListItem key={purchase.id}>*/}
        {/*        <ListItemText primary={purchase.name} />*/}
        {/*      </ListItem>*/}
        {/*    ))}*/}
        {/*  </List>*/}
        {/*)}*/}
      </Grid>
      <Grid item xs={6}>
        {/* Здесь разместите форму создания покупки */}
      </Grid>
    </Grid>
  );
};

export default Borrowings;
