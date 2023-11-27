import React from 'react';
import { Container, Grid } from '@mui/material';
import Banner from './Banner';
import Activities from './Activities';
import Introduction from './Introduction';

const Home = () => {
  return (
    <Container sx={{ mt: 30, mb: 0}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} sx={{ mr: 6 }}>
          <Introduction />
        </Grid>
        <Grid item xs={12} md={8}>
          <Banner />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 0, marginBottom: 0 }}>
          <Container sx={{ mt: 0, mb: 0 }}>
            <Activities />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;