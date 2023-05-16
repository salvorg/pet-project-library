import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { Button } from '@mui/material';
import { wrapper } from '@/app/store';
import { fetchAllBooks } from '@/features/books/booksThunks';
import { selectBooks } from '@/features/books/booksSlice';

export default function Home(props: any) {
  const books = useAppSelector(selectBooks);

  console.log(books);
  return (
    <>
      <div>Hello World</div>
      <Button onClick={() => console.log(props.user)}>Show user</Button>
    </>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//   await store.dispatch(fetchAllBooks());
//   const user = useAppSelector(selectUser);
//   return { props: { user } };
// });
