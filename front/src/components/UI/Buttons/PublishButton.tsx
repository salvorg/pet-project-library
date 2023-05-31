import React from 'react';
import { LoadingButton } from '@mui/lab';

interface Props {
  onClick: () => void;
  isPublished: boolean;
  publishChanging: boolean;
}

const PublishButton: React.FC<Props> = ({ onClick, isPublished, publishChanging }) => {
  return (
    <>
      <LoadingButton onClick={onClick} loading={publishChanging} sx={{ margin: 'auto' }}>
        {isPublished ? 'Unpublish' : 'Publish'}
      </LoadingButton>
    </>
  );
};

export default PublishButton;
