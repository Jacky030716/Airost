import React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import JoinCard from '../componentss/JoinCard'
import Banner from '../componentss/Banner';
import Activities from '../componentss/Activities';
import Introduction from '../componentss/Introduction';
import Footer from '../componentss/Footer'
import Navbar from '../componentss/Navigation';  // Import the Navigation component
import axios from 'axios';

const Home = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        axios.get('http://localhost:8081/avaliableJoin')
        .then(res => {
            setBookings(res.data);
            const formattedBookings = res.data.map(booking => ({
            ...booking,
            date: formatDate(booking.date) // Format the date before setting it in state
            }));
            setBookings(formattedBookings);
        })
        .catch(err => {
            console.error('Error fetching bookings:', err);
        });
    };

    const handleJoin = (bookingID) => {
        axios.post(`http://localhost:8081/joinBooking/${bookingID}`)
        .then(res => {
            console.log('Booking joined:', res.data);
            // Refresh the bookings after a successful join
            fetchBookings();
        })
        .catch(err => {
            console.error('Error joining booking:', err);
        });
    };

    // Function to format date to "dd-mm-yyyy"
    const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
    };

    return (
        <>
            <Grid
                container
                direction="column"
                alignItems="stretch"
                style={{ minHeight: '100vh' }}
            >
                <Grid item position="sticky" sx={{top: 0, zIndex: 1000}}>
                    <Navbar />
                </Grid>
                <Grid container width="100" display="flex" flexDirection="column" justifyContent="center">
                    {/* Introduction + Banner */}
                    <Grid item display="flex" alignItems="center" justifyContent="center" mt={10} id="introduction">
                        <Grid width="35%" p={2}>
                            <Introduction />
                        </Grid>
                        <Grid>
                            <Banner />
                        </Grid>
                    </Grid>

                    {/* Activities */}
                    <Grid item id="activities" mt={8} ml={12}>
                        <Activities />
                    </Grid>

                    {/* Join Activities */}
                    <Grid item id="join" mt={8} ml={12} width="88%">
                        <Typography variant='h4' mb={1} color="white">
                            Join Activities
                        </Typography>
                        <Grid container display="flex" style={{alignItems: {xs: "center", sm: "none"},justifyContent: {xs: "center",sm: "none"}}}>
                            {bookings.map(booking => (
                                <Grid key={booking.bookingID} item xs={12} sm={6} md={4} lg={3} mb={3}>
                                    <JoinCard booking={booking} handleJoin={handleJoin}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Footer */}
                    <Grid item id="footer">
                        <Footer />
                    </Grid>
                </Grid>
            </Grid>
        </>
  );
};

export default Home;
