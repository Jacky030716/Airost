//introduction.jsx
import React from 'react';
import '../style/Introduction.css'; // Import your custom CSS file
import { Typography } from '@mui/material';

const SportBookingDescription = () => {
  return (
    <>
        <div className="custom-introduction">
        <Typography color="white" variant='h4' fontFamily="Pirata+One" fontWeight="400" mb={1}>Welcome to </Typography>
        <Typography color="#F9F871" fontFamily="Pirata+One" style={{ fontSize: "60px", lineHeight: "0.95", fontWeight: "600"}}> UTM Sport Hall Booking System</Typography>
        <Typography width="86%" color="white" variant='body1' fontWeight="300" mt={2} textAlign="justify" fontFamily="Poppins">
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
