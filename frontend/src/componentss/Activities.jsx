import React, { useState } from 'react';
import ActivityCard from './ActivityCard'; 
import { Grid, Typography, Modal, Box } from '@mui/material';
import { activities } from '../constants/activities';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shake = keyframes`
  0% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
  70% { transform: translateY(5px); }
  100% { transform: translateY(0); }
`;

const AnimatedBox = styled(Box)`
  animation: ${shake} 0.5s ease-in-out;
`;

const Activity = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleOpen = (activity) => {
    setSelectedActivity(activity);
  };

  const handleClose = () => {
    setSelectedActivity(null);
  };

  return (
    <>
      <Typography variant='h4' mb={1} fontFamily="Poppins" fontWeight="600" color="white">Activities</Typography>
      <Grid display="flex" >
        {activities.map((activity) => (
          <Grid item key={activity.name} mr={2} width="25%" height="30%">
            <ActivityCard activity={activity} onClick={() => handleOpen(activity)} />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={!!selectedActivity}
        onClose={handleClose}
        aria-labelledby="selected-activity"
        aria-describedby="selected-activity-description"
      >
        <AnimatedBox sx={{ width: '25%', margin: 'auto', marginTop: '10%', backgroundColor: 'white', padding: '20px', borderRadius: "10px", scale: "1.2" }}>
          {selectedActivity && <ActivityCard activity={selectedActivity} />}
        </AnimatedBox>
      </Modal>
    </>
  );
};

export default Activity;