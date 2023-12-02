import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ActivityCard({activity}) {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 400, borderRadius: "10px  " }}>
      <CardMedia
        component="img"
        alt={activity.name}
        sx={{height: 200, objectFit: "cover", objectPosition: "center"  }}
        image={activity.src}
/>
      <CardContent sx={{ height: 140}}>
        <Typography gutterBottom variant="h5" component="div">
          {activity.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" height="10%">
          {activity.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ height: 60}}>
        <Button size="small" sx={{ml: 0.5}}>Learn More</Button>
      </CardActions>
    </Card>
  );
}