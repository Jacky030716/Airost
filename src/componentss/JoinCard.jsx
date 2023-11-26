import React, { useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';
import ReactCardFlip from 'react-card-flip';
import styles from '../constants/style'

const JoinCard = ({datas}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Box onClick={handleClick} style={{position: 'relative', padding: 5 }}>
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" style={{boxShadow: `${styles.inputBoxShadow}`,width: '300px', height: '290px', borderRadius: "0 0 15px 15px"}}>
                <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                    <Box display="flex" marginBottom="70px">
                        <Typography variant='h5' sx={{mt: "3px"}}>{datas.name}</Typography>
                        <img src={datas.icon} alt="icon" style={{width: '40px', marginLeft: '20px'}}/>
                    </Box>
                </Grid>
            </Grid>
            <Grid style={{position: 'absolute', bottom: 0, left:0 ,right:0, width: '100%', height: '30%', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '0 0 15px 15px'}}>
                <Typography variant='h5'>{datas.organizer}</Typography>
                <Typography>{datas.date}</Typography>
            </Grid>
        </Box>

      <Box onClick={handleClick} style={{width: '300px', height: 'fit-content'}}>
        <Grid padding={5} container spacing={2} direction="column" alignItems="center" style={{boxShadow: `${styles.inputBoxShadow}`}}>
            <Grid item xs={12}><Typography>Venue: {datas.venue}</Typography></Grid>
            <Grid item xs={12}><Typography>Date: {datas.date}</Typography></Grid>
            <Grid item xs={12}><Typography>Time: {datas.time}</Typography></Grid>
            <Grid item xs={12}><Typography>Organizer: {datas.organizer}</Typography></Grid>
            <Grid item xs={12}>
                <Button startIcon={<FaceIcon />} variant="contained" color="primary" style={{backgroundColor: "#075E54", width: "inherit"}}>
                    {datas.players} Join Now
                </Button>
            </Grid>
        </Grid>
      </Box>
    </ReactCardFlip>
  )
}

export default JoinCard