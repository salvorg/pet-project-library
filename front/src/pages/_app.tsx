import type { AppProps } from 'next/app';
import { wrapper } from '@/app/store';
import { addInterceptors } from '../../axiosApi';
import { GOOGLE_CLIENT_ID } from '../../constants';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '@/components/Layout/Layout';
import { CssBaseline, Fab } from '@mui/material';
import ScrollTop from '@/components/UI/ScrollTop/ScrollTop';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  addInterceptors(store);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID as string}>
      <Provider store={store}>
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <Layout>
            <div id="back-to-top-anchor"></div>
            <CssBaseline />
            <Component {...props.pageProps} />
            <ScrollTop {...props.pageProps}>
              <Fab size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
          </Layout>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}
