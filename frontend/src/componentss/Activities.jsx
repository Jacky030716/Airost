import React from 'react';
import ActivityCard from './ActivityCard'; 
import { Grid, Typography } from '@mui/material';
import { activities } from '../constants/activities';

const Activity = () => {
  return (
    <>
        <Typography variant='h4' mb={1} color="white">Activities</Typography>
        <Grid display="flex" >
            {activities.map((activity) => (
                <Grid item key={activity.name} mr={2} width="25%" height="30%">
                    <ActivityCard activity={activity} />
                </Grid>
            ))}
        </Grid>
    </>
  )
};

export default Activity;