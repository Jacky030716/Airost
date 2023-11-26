import { Box, Grid, Typography } from '@mui/material'
import { racquet } from '../assets'
import { fadeIn } from '../constants/style'
import React from 'react'

const UserActivities = ({activity}) => {
    const date = new Date(activity.date)
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' })

    return(
        <>
        <Box sx={{
            mt: 8,
            width: "38%",
            height: "80%",
            borderRadius: "10px",
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "auto",
            backgroundImage: 'linear-gradient(to right, rgba(15, 32, 39, 0.8), rgba(32, 58, 67, 0.8), rgba(44, 83, 100, 0.8))',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 2px 4px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            padding: "10px 30px",
            animation: `${fadeIn} 1s ease-in-out`,
        }}>
            <Grid display="flex" mb={3}>
                <Grid display="flex" alignItems="center" justifyContent="center" flexDirection="column" borderRadius="8px" border="1px solid rgba(255, 255, 255, 0.6)" width="fit-content" py={2} px={3} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" mt="2px">
                    <Typography sx={{color: "white"}}>{month}</Typography>
                    <Typography sx={{color: "white"}}>{day}</Typography>
                </Grid>
                <Grid ml={2}>
                    <Grid display="flex" alignItems="center" mb={0.5}>
                        <Typography variant='h5' ml="-1px" color="white" fontWeight="500">{activity.name}</Typography>
                        <Typography sx={{color: "lightgrey", ml: 1.5, mt: 0.5, fontWeight: 300}}>{activity.time}</Typography>
                    </Grid>
                    <Grid display="flex" flexDirection="column" justifyContent="center">
                        <Grid>
                            <Typography sx={{fontSize: "14px", lineHeight: 0.5, color: "#ff0f0f", fontWeight: 600}}>Please come early to your court!</Typography>
                        </Grid>
                        <Grid mt={1} display="flex" alignItems="left" flexDirection="column" textAlign="left">
                            <Typography color="white" sx={{fontSize: "14px", lineHeight: 1.1}}>Venue: {activity.venue}</Typography>
                            <Typography color="white" sx={{fontSize: "14px", lineHeight: 1.1}}>Number of players: {activity.players}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid 
                width="100%" 
                height="100%"
                sx={{
                    mt: 1, 
                }}>
                    <img src={activity.src} alt="racquet" style={{width: "100%", height: "120px", objectFit: "cover", objectPosition: "center", borderRadius: "5px"}} />
            </Grid>
        </Box>
        </>
    )
}

export default UserActivities
