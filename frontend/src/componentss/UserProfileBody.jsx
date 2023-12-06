import { Avatar, Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { profile } from '../assets'
import { fadeIn, slideInFromRight } from '../constants/style'
import React from 'react'
import UserCardItem from './UserCardItem'

const UserProfileBody = ({datas}) => {
    return (
        <>
            <Grid container display="flex" alignItems="center" justifyContent="space-evenly">
                    {/* User Icon Card */}
                <Grid
                    container
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width={{ xs: '80%', md: '40%' }}
                    height="85%"
                    sx={{boxShadow: 
                        'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' , 
                        ml: { xs: 0, md: 5 },
                        mt: { xs: 4, md: 0 },
                        pb: 3,
                        animation: `${fadeIn} 1s ease-in-out`
                    }}
                >
                    <Avatar src={profile} sx={{ width: "50%", height: "58%", mt: 6 }} />
                    <Typography variant="h5" mt={2}>
                    {datas?.UTMID}
                    </Typography>
                    <Typography variant="body1">{datas?.email}</Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                    {datas?.faculty}
                    </Typography>
                </Grid>
                            
                {/* User Detail */}
                <Grid width={{ xs: '80%', md: '40%' }}
                        mt={{ xs: 4, md: 0 }} sx={{animation: `${slideInFromRight} 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)`}}>
                    <Typography textAlign="center" variant='h3'> User Details</Typography>
                    <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem/>}
                    >
                        <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{py: 2}}>
                            <UserCardItem title="Name" data={datas?.name} bgColor="lightblue"/>
                            <UserCardItem title="Matric No" data={datas?.matricNo}/>
                            <UserCardItem title="Contact No" data={datas?.phoneNo} bgColor="lightblue"/>
                            <UserCardItem title="Course" data={datas?.course}/>
                            <UserCardItem title="IC" data={datas?.IC} bgColor="lightblue"/>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </>
  )
}

export default UserProfileBody