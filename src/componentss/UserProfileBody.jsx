import { Avatar, Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { profile } from '../assets'
import { fadeIn, slideInFromRight } from '../constants/style'
import React from 'react'
import UserCardItem from './UserCardItem'

const UserProfileBody = () => {
    const UserTestData = {
        name: "Lim Si Ni",
        matricNo: "A22EC0700",
        contactNo: "012-3456789",
        course: "Software Engineering",
        IC: "012345678901",
    }

    return (
        <>
            <Grid container display="flex" alignItems="center" justifyContent="space-evenly">
                    {/* Left Side */}
                <Grid
                    container
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width="30%"
                    height="85%"
                    sx={{boxShadow: 
                        'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' , 
                        ml: 5, 
                        mt: 4, 
                        pb: 3,
                        animation: `${fadeIn} 1s ease-in-out`
                    }}
                >
                    <Avatar src={profile} sx={{ width: "50%", height: "50%", mt: 6 }} />
                    <Typography variant="h5" mt={2}>
                    ni-02
                    </Typography>
                    <Typography variant="body1">ni-02@gmail.com</Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                    Faculty of Computing
                    </Typography>
                </Grid>
                            
                {/* Right Side */}
                <Grid width="40%" mt={4} sx={{animation: `${slideInFromRight} 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)`}}>
                    <Typography textAlign="center" variant='h3'> User Details</Typography>
                    <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem/>}
                    >
                        <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{py: 2}}>
                            <UserCardItem title="Name" data={UserTestData.name} bgColor="lightblue"/>
                            <UserCardItem title="Matric No" data={UserTestData.matricNo}/>
                            <UserCardItem title="Contact No" data={UserTestData.contactNo} bgColor="lightblue"/>
                            <UserCardItem title="Course" data={UserTestData.course}/>
                            <UserCardItem title="IC" data={UserTestData.IC} bgColor="lightblue"/>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </>
  )
}

export default UserProfileBody
