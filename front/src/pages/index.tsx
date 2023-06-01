import BooksCards from '@/components/Cards/BooksCards';
import { Grid } from '@mui/material';

export default function Home() {
  return (
    <Grid container>
      <BooksCards />
    </Grid>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//   await store.dispatch(fetchAllBooks());
//   return { props: {} };
// });

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   console.log('asdasdasdasdasdasd');
//   const books = await store.dispatch(fetchAllBooks());
//   return { props: { books } };
// });
