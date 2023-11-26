import React, {useState} from 'react';
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

export default function ImgMediaCard({datas, icons}) {
  const[isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Card 
        onClick={handleFlip} 
        sx={{ 
            width: 230, 
            height: 300, 
            display: "flex", 
            alignItems: "center", 
            flexBasis: "70%", 
            position: "relative",
            backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.62), rgba(117, 19, 93, 0.83)),url(${datas.image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}>
        <Grid container display="flex" alignItems="center" flexDirection="column">
          <CardContent sx={{display: "flex", alignItems: "center", justifyContent: "center", padding: 0}}>
            <Typography gutterBottom variant="h5" component="p">
              {datas.organizer}
            </Typography>
            <CardMedia 
              component="img"
              alt='badminton'
              image={datas.icon}
              sx={{ width: 20, height: 20, ml: 1, mb: 1 }}
            />
          </CardContent>
          <Typography variant="body2" color="black  ">
              {datas.date}
            </Typography>
            <CardActions>
              <Button 
                size="small" 
                style={{backgroundColor: "green", borderRadius: "5px", padding: "6px 26px", color: "white"}}
              >Learn More
              </Button>
          </CardActions>
        </Grid>
        </Card>

        <Card onClick={handleFlip} sx={{ width: 230, height: 300, display: "flex", alignItems: "center", flexBasis: "70%" }}>
          <Grid container display="flex" alignItems="center" flexDirection="column">
            <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 0}}>
              <Typography gutterBottom variant="body1" component="p">
                Venue: {datas.venue}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                Time Slot: {datas.time}
              </Typography>
            </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  style={{backgroundColor: "#075E54", borderRadius: "5px", padding: "6px 26px", color: "white"}}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClick();s
                  }}
                  
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FaceIcon sx={{mr: 2, fontSize: "24px"}}/>
                    <Typography variant='body1'>Join {datas.players}</Typography>
                </Box>
                </Button>
            </CardActions>
          </Grid>
        </Card>
    </ReactCardFlip>
  );
}
