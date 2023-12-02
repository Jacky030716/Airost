//introduction.jsx
import React from 'react';
import '../style/Introduction.css'; // Import your custom CSS file
import { Typography } from '@mui/material';

const SportBookingDescription = () => {
  return (
    <>
        <div className="custom-introduction">
        <Typography color="white" variant='h4'>Welcome to UTM Sport Hall Booking System!</Typography>
        <Typography width="86%" color="white" variant='body1' fontWeight="300" mt={2} textAlign="justify">
          Discover the ease of managing your sports activities with our
          state-of-the-art booking system. Whether you're passionate about
          badminton, ping pong, volleyball, our platform
          empowers you to effortlessly reserve UTM sport hall facilities at your
          convenience. Explore a seamless booking experience, real-time
          availability updates, and a user-friendly interface tailored to enhance
          your sporting journey. Elevate your game – reserve, play, repeat!
        </Typography>
      </div>
    </>

  );
};

export default SportBookingDescription;
