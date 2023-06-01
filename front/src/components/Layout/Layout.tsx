import React, { PropsWithChildren } from 'react';
import AppToolbar from '@/components/UI/AppToolBar/AppToolbar';
import Footer from '@/components/UI/Footer/Footer';
import { Grid } from '@mui/material';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container direction="column" minHeight="100vh">
      <Grid item>
        <AppToolbar />
      </Grid>
      <Grid item sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Layout;
