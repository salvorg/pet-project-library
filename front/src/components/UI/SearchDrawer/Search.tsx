import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRouteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRoute(event.target.value);
  };

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    console.log('Selected route:', selectedRoute);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ border: 1, borderColor: '#d5d3d7', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)', p: 2 }}
    >
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup value={selectedRoute} onChange={handleRouteChange} sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormControlLabel value="books" control={<Radio />} label="search from all books" />
            <FormControlLabel value="byAuthor" control={<Radio />} label="search by author" />
            <FormControlLabel value="byGenre" control={<Radio />} label="search by genre" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Search" variant="outlined" value={searchQuery} onChange={handleSearchQueryChange} fullWidth />
        <Button variant="contained" onClick={handleSearch} sx={{}}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;
