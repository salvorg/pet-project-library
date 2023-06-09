import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import { FoundItem } from '../../../types';

interface Props {
  label: string;
  options: FoundItem[];
  selectedState: string[];
  setSelectedState: (value: string[]) => void;
  handleAutocompleteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MultiCompliter: React.FC<Props> = ({
  label,
  options,
  selectedState,
  setSelectedState,
  handleAutocompleteChange,
}) => {
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={options && options.map((option) => option.label)}
      freeSolo
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip {...getTagProps({ index })} variant="outlined" key={option} label={option} />
        ))
      }
      value={selectedState}
      filterSelectedOptions
      renderOption={(props, option) => {
        return (
          <li {...props} key={option}>
            {option}
          </li>
        );
      }}
      onChange={(e, value) => {
        setSelectedState(value);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder="Favorites" onChange={handleAutocompleteChange} />
      )}
    />
  );
};

export default MultiCompliter;
