import type { AppProps } from 'next/app';
import { wrapper, persistor } from '@/app/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptors } from '../../axiosApi';
import theme from '@/styles/theme';
import Layout from '@/components/Layout/Layout';
import { GOOGLE_CLIENT_ID } from '../../constants';
import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({ Component, pageProps, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  addInterceptors(store);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID as string}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider theme={theme}>
            <Layout>
              <CssBaseline />
              <Component {...props.pageProps} />
            </Layout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}
