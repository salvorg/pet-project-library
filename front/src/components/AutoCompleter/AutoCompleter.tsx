import React from 'react';
import { BookApiWithLabel, FoundItem } from '../../../types';
import Chip from '@mui/material/Chip';
import { Autocomplete, TextField } from '@mui/material';

interface Props {
  label: string;
  options: FoundItem[] | BookApiWithLabel[];
  selectedState: FoundItem | BookApiWithLabel | null;
  setSelectedState: (value: FoundItem | BookApiWithLabel) => void;
  handleAutocompleteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutoCompleter: React.FC<Props> = ({
  label,
  options,
  selectedState,
  setSelectedState,
  handleAutocompleteChange,
}) => {
  function isFoundItem(value: any): value is FoundItem {
    return value !== null && 'authors' in value && value.authors !== undefined;
  }

  function isBookApiWithLabel(value: any): value is BookApiWithLabel {
    return value !== null && 'label' in value && value.label !== undefined;
  }

  return (
    <Autocomplete
      id="user-search"
      freeSolo
      options={options}
      renderTags={(value: readonly FoundItem[] | BookApiWithLabel[], getTagProps) =>
        value.map((option: FoundItem | BookApiWithLabel, index: number) => (
          <Chip {...getTagProps({ index })} variant="outlined" key={option.id} label={option.label} />
        ))
      }
      value={selectedState}
      filterSelectedOptions
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        );
      }}
      getOptionLabel={(option: FoundItem | BookApiWithLabel | string) => {
        if (typeof option === 'string') {
          return option;
        }
        return option.label;
      }}
      onChange={(e, value: string | FoundItem | BookApiWithLabel | null) => {
        if (isFoundItem(value)) {
          setSelectedState(value);
        } else if (isBookApiWithLabel(value)) {
          setSelectedState(value);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} onChange={handleAutocompleteChange} sx={{ maxWidth: '340px', mb: 2 }} />
      )}
    />
  );
};

export default AutoCompleter;
