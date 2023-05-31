import React from 'react';
import { LoadingButton } from '@mui/lab';

interface Props {
  creating: boolean;
}

const FormCreatingButton: React.FC<Props> = ({ creating }) => {
  return (
    <LoadingButton loading={creating} type="submit" variant="contained" sx={{ backgroundColor: '#94704e' }}>
      Create
    </LoadingButton>
  );
};

export default FormCreatingButton;
