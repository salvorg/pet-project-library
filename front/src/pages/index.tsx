import BooksCards from '@/components/Cards/BooksCards';

export default function Home() {
  return (
    <>
      <BooksCards />
    </>
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
