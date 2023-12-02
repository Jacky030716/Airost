import React, { useEffect, useRef } from 'react';
import { Grid, Box, Typography, Chip, Hidden } from '@mui/material';
import Navbar from '../componentss/Navigation';
import BookingItem from '../componentss/BookingItem';
import { court } from '../assets';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import slideInFromRight from '../style/animation.css';
import fadeIn from '../style/animation.css';

const Booking = () => {
  const bookingItemRef = useRef(null);
  const typographyGridRef = useRef(null);

  useEffect(() => {
    bookingItemRef.current.style.animation = 'slideInFromRight 1s forwards';
    typographyGridRef.current.style.animation = 'fadeIn 2s forwards';
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        style={{ minHeight: '100vh'}}
        
      >
        <Grid item position="sticky" sx={{top: 0, zIndex: 1000}}>
          <Navbar />
        </Grid>
        <Grid item>
          <Box
            sx={{
              backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 10%, rgba(0,0,0,0.8)), url(${court})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              minHeight: '100vh', // Adjusted height for better visibility on smaller screens
            }}
          >
            <Grid
              container
              direction="row" // Adjusted direction to "row"
              justifyContent="space-around" // Adjusted to create space around items
              alignItems="center"
              style={{ height: '100%' }}
            >
              <Grid
                item
                xs={12}
                md={6}
                ref={typographyGridRef}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box style={{ marginLeft: '15px', marginRight: '15px' }}>
                  <Hidden xsDown>
                      <Chip
                        icon={<SportsHandballIcon style={{ color: 'white' }} />}
                        label="Sport Time"
                        sx={{
                          fontSize: '16px',
                          color: 'white',
                          padding: '5px 10px',
                          backgroundColor: '#4394e0',
                          marginBottom: '10px',
                        }}
                      />
                    </Hidden>
                  <Typography
                    style={{ color: 'white', fontWeight: '600', textAlign: {xs: "center", md: "left"} }}
                    sx={{ fontSize: { xs: '30px', md: '40px' } }}
                  >
                    Let's Play A Game!
                  </Typography>
                  <Typography
                    style={{ color: 'white', width: '100%', textAlign: {xs: "center", md: "left"} }}
                    sx={{ fontSize: { xs: '18px', md: '24px' }, lineHeight: { xs: '1.5', md: '1.2' }}}
                  >
                    Grab your racquet, bring your friends to have fun here.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} ref={bookingItemRef} style={{ width: '100%' }}>
                <BookingItem />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Booking;
