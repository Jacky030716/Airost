import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, Stack, Divider, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userNavLinks } from "../constants/constant";
import UserProfileBody from "./UserProfileBody"
import { cardComponents } from "../constants/constant";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UserActivities from "./UserActivities";
import axios from "axios";

const UserCard = () => {
    const icons = {
        AccountCircleIcon: <AccountCircleIcon sx={{ color: "blue" }} />,
        CalendarMonthIcon: <CalendarMonthIcon sx={{ color: "blue" }} />,
    };

    const [value, setValue] = useState(0);
    const [studentData, setStudentData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const Navigate = useNavigate();

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    useEffect(() => {
      // Fetch student details based on UTMID from the backend
      axios.get(`http://localhost:8081/student?utmId=${localStorage.getItem('utmId')}`)
        .then(res => {
          setStudentData(res.data);
          fetchBookings(res.data.UTMID);
        })
        .catch(err => {
          console.error(err);
        });
    }, []);

    useEffect(() => {
      if(localStorage.getItem('utmId') == null)
        Navigate('/login');
    }
    , []);
  
    const fetchBookings = (utmId) => {
      // Get current date
      const currentDate = new Date().toISOString().slice(0, 10);
  
      // Fetch bookings based on criteria
      axios.get(`http://localhost:8081/bookingHistory?utmId=${utmId}&currentDate=${currentDate}`)
      .then(res => {
        const formattedBookings = res.data.map(booking => ({
          ...booking,
          date: formatDate(booking.date) // Format the date before setting it in state
        }));

        setBookings(formattedBookings);
      })
      .catch(err => {
        console.error(err);
        setError("Error fetching bookings");
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
      <Box
        sx={{
          backgroundColor: "rgba(235, 235, 235, 0.8)",
          width: "70%",
          height: "100%",
          borderRadius: "5px",
          mt: 8,
        }}
      >
        {/* User Card Nav */}
              <Box sx={{ py: 2, boxShadow: '0 3px 3px -2px rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 1px 8px 0 rgba(0, 0, 0, 0.06)' }} display="flex" justifyContent="center">
                <Tabs value={value} onChange={handleChange} sx={{ '& .MuiTabs-indicator': { marginLeft: '4px' } }}>
                {userNavLinks.map((link) => (
                    <Tab
                    key={link.key}
                    label={
                        <Box display="flex" alignItems="center" justifyContent="center">
                        {icons[link.icon]}
                        <Typography ml={1} mt="2px">
                            {link.name}
                        </Typography>
                        </Box>
                    }
                    />
                ))}
                </Tabs>
            </Box>

        {/* User Card Body */}
        <Grid container sx={{height: '80%', overflowY: 'auto', overflowX: "hidden", px: 4, '&::-webkit-scrollbar' : {display: 'none'}, scrollbarWidth: "none", msOverflowStyle: "none"}}>
          {value === 0 ?  <UserProfileBody datas={studentData} /> : bookings.map((booking) => (
              <Grid key={booking.bookingID} item xs={12} display="flex" flexDirection="row" justifyContent="center">
                <UserActivities activity={booking} components={cardComponents}/>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default UserCard;