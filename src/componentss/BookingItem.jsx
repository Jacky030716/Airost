import React from 'react';
import Icon from './Icon';
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
} from '@mui/material';
import { MenuItem as MuiMenuItem } from '@mui/material';
import { timeSlots, courtNumbers, icons } from '../constants/constant';
import styles from '../constants/style';

const BookingItem = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

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
        <Icon icons={icons} />
        <Grid item>
          <FormControl fullWidth variant="outlined" style={{ boxShadow: `${styles.inputBoxShadow}` }}>
            <InputLabel id="court-number-label" htmlFor="outlined-court-number">
              Court Number
            </InputLabel>
            <Select
              labelId="court-number-label"
              input={<OutlinedInput label="Court Number" id="outlined-court-number" />}
            >
              {courtNumbers.map((courtNumber) => (
                <MenuItem key={courtNumber} value={courtNumber}>
                  {courtNumber}
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
            fullWidth
            style={{ boxShadow: `${styles.inputBoxShadow}` }}
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
            Maximum Capacity :
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Number of Players"
            defaultValue="1"
            type="number"
            fullWidth
            inputProps={{ min: '1' }}
            style={{ boxShadow: `${styles.inputBoxShadow}` }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: '5px', padding: '10px', fontSize: '16px', fontWeight: 'bold' }}
          >
            Book
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingItem;
