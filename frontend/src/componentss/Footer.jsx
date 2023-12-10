import React from 'react'
import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright © '}
      <Link color="#4394e0">
        Milo Dinosaur
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles({
  icon: {
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.2)',
      color: 'blue',
    },
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container display="flex" justifyContent="center" width="100%" mt={2}>
      <Grid width="100%" py={4} display="flex" justifyContent="center" style={{ backgroundColor: "rgba(175, 175, 175, 0.7)", boxShadow: '0px -3px 4px 2px rgba(0, 0, 0, 0.25)' }}>
        <Grid width="20%" item display="flex" alignItems="center" justifyContent="space-evenly">
          <a href="https://www.facebook.com/UtmSportsExcellence">
            <FacebookIcon className={classes.icon}/>
          </a>
          <a href="https://instagram.com/utmsportsexcellence?igshid=M2RkZGJiMzhjOQ==">
            <InstagramIcon className={classes.icon}/>
          </a>
          <a href="https://twitter.com">
            <TwitterIcon className={classes.icon}/>
          </a>
          <a href="https://github.com/Jacky030716/Airost">
            <GitHubIcon className={classes.icon}/>
          </a>
          <a href="https://www.linkedin.com">
            <LinkedInIcon className={classes.icon}/>
          </a>
        </Grid>
      </Grid>
      <Grid py={1} width="inherit" style={{ backgroundColor: "rgba(84, 84, 84, 0.7)", boxShadow: '0px 3px 4px 2px rgba(0, 0, 0, 0.25)'}}>
        <Copyright />
      </Grid>
    </Grid>
  )
}

export default Footer