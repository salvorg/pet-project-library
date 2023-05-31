import React from 'react';
import { LoadingButton } from '@mui/lab';

interface Props {
  onClick: () => void;
  deleting: boolean;
}

const DeleteButton: React.FC<Props> = ({ onClick, deleting }) => {
  return (
    <>
      <LoadingButton onClick={onClick} loading={deleting} sx={{ margin: 'auto', color: 'red' }}>
        Delete
      </LoadingButton>
    </>
  );
};

export default DeleteButton;
