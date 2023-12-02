import React, {useState, useEffect} from 'react';
import { scaleUp } from '../constants/style';
import styles from '../constants/style';
import FaceIcon from '@mui/icons-material/Face';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import ReactCardFlip from 'react-card-flip';
import { icons } from '../constants/constant';
import axios from 'axios';

export default function ImgMediaCard({booking, handleJoin}) {
  const[isFlipped, setIsFlipped] = useState(false);
  const matchingComponent = icons?.find(icon => icon.name === booking.sportType);
  const imgSrc = matchingComponent ? matchingComponent.img : '';
  const matchingComponent2 = icons?.find(icon => icon.name === booking.sportType);
  const bgSrc = matchingComponent2 ? matchingComponent2.background : '';

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Card
        onClick={handleFlip}
        style={{position: "relative"}}
        sx={{
            borderRadius: "10px",
            width: 230, 
            height: 300, 
            display: "flex", 
            alignItems: "center", 
            flexBasis: "70%", 
            position: "relative",
            backgroundImage: `linear-gradient(to bottom, rgba(32, 38, 57, 0.7) 11.4%, rgba(63, 76, 119, 0.7) 70.2%),url(${bgSrc})`,
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 2px 4px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            backgroundPosition: "center",
            backgroundSize: "cover",
            cursor: "pointer",
            backfaceVisibility: 'hidden',
            transition: 'transform 0.5s', 
            '&:hover': {
              transform: 'scale(1.1) ',
            },
          }}>
        <Grid container display="flex" alignItems="center" flexDirection="column">
          <CardContent sx={{display: "flex", alignItems: "center", justifyContent: "center", padding: 0}} style={{position: "absolute" , top: "25%"}}>
            <Typography gutterBottom variant="h4" component="p" color="white">
              {booking.sportType}
            </Typography>
            <CardMedia 
              component="img"
              alt='badminton'
              image={imgSrc}
              sx={{ width: 30, height: 30, ml: 1, mb: 1 }}
            />
          </CardContent>
          <Typography variant="body1" color="white" mt={4}>
              {booking.date}
            </Typography>
            <Typography gutterBottom variant="body1" component="p" color="white">
                Time Slot: {booking.timeSlot}
              </Typography>
            <CardActions>
              <Button
                size="small"
                style={{backgroundColor: "#075E54", borderRadius: "5px", padding: "6px 26px", color: "white", position: "absolute", bottom: "40px", left: "22%"}}
              >Learn More
              </Button>
          </CardActions>
        </Grid>
        </Card>

        <Card 
          onClick={handleFlip} 
          sx={{ 
            width: 230, 
            height: 300, 
            display: "flex", 
            alignItems: "center", 
            flexBasis: "70%", 
            backfaceVisibility: 'hidden',
            borderRadius: "10px",
            background: "linear-gradient(to bottom, rgba(32, 38, 57, 0.7) 11.4%, rgba(63, 76, 119, 0.7) 70.2%)",
            transition: 'transform 0.5s', 
            '&:hover': {
              transform: 'scale(1.1) translateZ(0)',
            },
            }}>
          <Grid container display="flex" alignItems="left" flexDirection="column" width="100%">
            <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "left", padding: 0}}>
              <Typography gutterBottom variant="body1" color="white" component="p" mb={-0.5} ml={4.5}>
                Venue
              </Typography>
              <Typography gutterBottom variant="h4" color="white" component="p" ml={4.5}>
                {booking.sportVenueID}
              </Typography>
            </CardContent>
              <CardActions>
                <Button
                  sx={{ml: 3.5}}
                  size="small" 
                  style={{backgroundColor: "#075E54", borderRadius: "5px", padding: "6px 26px", color: "white"}}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleJoin(booking.bookingID);
                  }}
                  
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FaceIcon sx={{mr: 2, fontSize: "24px"}}/>
                    <Typography variant='body1'>Join {booking.fulledCapacity}</Typography>
                </Box>
                </Button>
            </CardActions>
          </Grid>
        </Card>
    </ReactCardFlip>
  );
}
