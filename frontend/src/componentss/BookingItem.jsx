import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import Icon from './Icon';
import axios from 'axios';
import {
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
  Snackbar,
  Alert,
} from '@mui/material';
import { MenuItem as MuiMenuItem } from '@mui/material';
import { timeSlots, courtNumbers, icons } from '../constants/constant';
import styles from '../constants/style';

const BookingItem = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [failSnackbar, setFailSnackbar] = useState(false);

  const [sport, setSport] = useState('');
  const [sportDetail, setSportDetail] = useState(null);
  const [sportVenues, setSportVenues] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedSportID, setselectedSportID] = useState('');
  const [selectedSportVenue, setselectedSportVenue] = useState('');
  const [fulledCapacity, setFulledCapacity] = useState('');


  const handleSelectionChange = (iconName) => {
    setSport(iconName)

    axios.get(`http://localhost:8081/sport?nameSport=${iconName}`)
      .then(res => {
        if (res.data && res.data.capacity) {
          setSportDetail(res.data);
          fetchSportVenues(res.data.sportID);
          setselectedSportID(res.data.sportID);
        } else {
          setSportDetail({ capacity: 'Not Available' });
        }
      })
      .catch(err => {
        console.error(err);
        setSportDetail({ capacity: 'Not Available' });
      });
  };

  const fetchSportVenues = (selectedSportID) => {
    axios.get(`http://localhost:8081/sportVenues?sportID=${selectedSportID}`)
      .then(res => {
        setSportVenues(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Function to handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Function to handle time slot change
  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  // Function to handle fulledCapacity change
  const handleFulledCapacityChange = (event) => {
    setFulledCapacity(event.target.value);
  };

  //Function to book court
  const bookCourt = () => {
    const userID = localStorage.getItem('utmId');
    if (!userID) {
      console.error('User ID not found.');
      return;
    }

    if (!selectedIcon || !selectedTimeSlot || !selectedDate || !selectedSportVenue || !fulledCapacity || !sport) {
      return;
    }

    axios.post('http://localhost:8081/booking', {
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      fulledCapacity: fulledCapacity,
      sportVenueID: selectedSportVenue,
      UTMID: userID,
    })
      .then((res) => {
        console.log('Booking successful:', res.data);
        setSuccessSnackbar(true);
        // Optionally, add logic to handle success (e.g., show a success message)
      })
      .catch((err) => {
        console.error('Booking failed:', err);
        setFailSnackbar(true);
        // Optionally, add logic to handle failure (e.g., show an error message)
      });
  };

  const MenuItem = (props) => (
    <MuiMenuItem
      {...props}
      sx={{
        '&:hover': {
          backgroundColor: 'rgba(202, 223, 255, 0.3)',
        },
      }}
    />
  );

  // Handle date conversion
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(currentDate - timezoneOffset)).toISOString().split('T')[0];

  return (
    <Box
      sx={{
        width: { xs: '50%', md: '70%' }, // Adjusted width to percentages
        mt: 10,
        mx: 'auto',
        boxShadow: 3,
        p: 3,
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6" align="center" mb={1}>
            Book for your game now!
          </Typography>
        </Grid>
        <Grid container display="flex" justifyContent="center">
          {icons.map((icon) => (  
              <Icon key={icon.name} icon={icon} selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} handleSelectionChange={handleSelectionChange}/>
          ))}
        </Grid>
        <Grid item>
          <FormControl fullWidth variant="outlined" style={{ boxShadow: `${styles.inputBoxShadow}` }}>
            <InputLabel id="court-number-label" htmlFor="outlined-court-number">
              Venue
            </InputLabel>
            <Select
              labelId="court-number-label"
              input={<OutlinedInput label="Court Number" id="outlined-court-number" />}
              value={selectedSportVenue}
              onChange={(event) => setselectedSportVenue(event.target.value)}
            >
              {sportVenues.map((sportVenue, index) => (
                <MenuItem key={index} value={sportVenue.sportVenueID}>
                  {sportVenue.sportVenueID}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            id="date"
            label="Date"
            type="date"
            defaultValue={formattedDate}
            InputLabelProps={{
              shrink: true,
            }}
            value={selectedDate}
            onChange={handleDateChange}
            fullWidth
            style={{ boxShadow: `${styles.inputBoxShadow}` }}
            inputProps={{
              min: localISOTime, // Disables past dates
            }}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth variant="outlined" style={{ boxShadow: `${styles.inputBoxShadow}` }}>
            <InputLabel id="time-slot-label" htmlFor="outlined-time-slot">
              Time Slot
            </InputLabel>
            <Select
              labelId="time-slot-label"
              input={<OutlinedInput label="Time Slot" id="outlined-time-slot" />}
              value={selectedTimeSlot}
              onChange={handleTimeSlotChange}
            >
              {timeSlots.map((timeSlot) => (
                <MenuItem key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ m: '10px 0px' }}>
          <Typography variant="h7" sx={{ ml: '6px' }}>
            Maximum Capacity : {sportDetail ? sportDetail.capacity : 'Not Available'}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Number of Players"
            defaultValue="1"
            type="number"
            value={fulledCapacity}
            onChange={handleFulledCapacityChange}
            fullWidth
            inputProps={{ min: '1', max: `${sportDetail?.capacity}` }}
            style={{ boxShadow: `${styles.inputBoxShadow}` }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: '5px', padding: '10px', fontSize: '16px', fontWeight: 'bold' }}
            onClick={bookCourt}
          >
            Book
          </Button>
        </Grid>
        <Snackbar 
          open={successSnackbar} 
          autoHideDuration={3000} 
          onClose={() => setSuccessSnackbar(false)}
          anchorOrigin={{ vertical: 'middle', horizontal: 'center' }}
          style={{ minWidth: '30%', minHeight: '20%' }}
        >
          <Alert onClose={() => setSuccessSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            Booking Successfully!
          </Alert>
        </Snackbar>
        <Snackbar 
          open={failSnackbar} 
          autoHideDuration={3000} 
          onClose={() => setFailSnackbar(false)}
          anchorOrigin={{ vertical: 'middle', horizontal: 'center' }}
          style={{ minWidth: '30%', minHeight: '20%' }}
        >
          <Alert onClose={() => setFailSnackbar(false)} severity="error" sx={{ width: '100%' }}>
            You choose an unavailable slot!
          </Alert>
        </Snackbar>
      </Grid>
    </Box>
  );
};

export default BookingItem;
