import React from 'react';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '@/app/hooks';

interface Props {
  onClick: () => void;
}

const PlayButton: React.FC<Props> = ({ onClick }) => {
  const loading = useAppSelector(selectAdding);
  return (
    <>
      <LoadingButton onClick={onClick} loading={loading}>
        Play
      </LoadingButton>
    </>
  );
};

export default PlayButton;
