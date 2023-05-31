import React from 'react';
import { LoadingButton } from '@mui/lab';

interface Props {
  creating: boolean;
}

const FormCreatingButton: React.FC<Props> = ({ creating }) => {
  return (
    <LoadingButton fullWidth loading={creating} type="submit" variant="contained" sx={{ backgroundColor: '#133136' }}>
      Create
    </LoadingButton>
  );
};

export default FormCreatingButton;
