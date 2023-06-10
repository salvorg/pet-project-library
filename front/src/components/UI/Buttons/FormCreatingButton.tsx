import React from 'react';
import { LoadingButton } from '@mui/lab';

interface Props {
  creating: boolean;
  onSubmit?: (event: React.FormEvent) => void;
}

const FormCreatingButton: React.FC<Props> = ({ creating, onSubmit }) => {
  return (
    <LoadingButton
      fullWidth
      loading={creating}
      onClick={onSubmit}
      type="submit"
      variant="contained"
      sx={{ backgroundColor: '#133136' }}
    >
      {onSubmit ? 'Update' : 'Create'}
    </LoadingButton>
  );
};

export default FormCreatingButton;
