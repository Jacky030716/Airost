import { Grid, Box } from '@mui/material'
import Navbar from '../componentss/Navigation'
import React from 'react'
import UserCard from '../componentss/UserCard'

const UserProfile = () => {
  return (
    <>  
        <Grid item position="sticky" sx={{top: 0, zIndex: 1000}}>
            <Navbar />
        </Grid>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="80vh">
            <UserCard />
        </Box>
    </>
  )
}

export default UserProfile