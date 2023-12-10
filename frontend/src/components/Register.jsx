import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import fadeIn from '../style/animation.css'
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormHelperText } from '@mui/material';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="#4394e0">
        Milo Dinosaur
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  export default function SignUp() {
    const [student, setStudent] = useState({
      matricNo: '',
      name: '',
      IC: '',
      faculty: '',
      course: '',
      phoneNo: '',
      email:'',
      UTMID:''
    })

    const [user, setUser] = useState({
      UTMID: '',
      password: ''
    })

    const navigate = useNavigate();
    const registerItemRef = useRef(null);

    useEffect(() => {
      registerItemRef.current.style.animation = 'fadeIn 1s forwards';
    }, []);

    const [errorMessage, setErrorMessage] = useState('');
    const [confirmErrorMessage, setconfirmErrorMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const handlePasswordChange = (event) => {
      const newPassword = event.target.value;
      setUser({...user, password: newPassword})
  
      // Check password strength here
      if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newPassword)) {
      setErrorMessage('Password should contain letters, numbers, and symbols. No spaces.');
      } else {
      setErrorMessage('');
      }
    };

    const handleConfirmPasswordChange = (event) => {
      const newConfirmPassword = event.target.value;
      setConfirmPassword(newConfirmPassword);
      
      // Check if password and confirm password match
      if (newConfirmPassword !== user.password) {
          setconfirmErrorMessage('Password and confirm password do not match');
      } else {
          setconfirmErrorMessage('');
      }
    };

    const handleEmailChange = (event) => {
      const newEmail = event.target.value;
      setStudent({...student, email: newEmail})

      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
          setConfirmEmail('Please enter a valid email address');
      } else {
          setConfirmEmail('');
      }
    };

    const handleUTMIDinput = (e) => {
        const value = e.target.value;
    
        // Update both user and student state properties with the new UTMID value
        setUser({ ...user, UTMID: value });
        setStudent({ ...student, UTMID: value });
    };
  //for submission
  const handleSubmit = async (e) => {
      e.preventDefault();
      axios.post('http://localhost:8081/student', student)
      .then(res => {
          console.log(res);
          if(res.status === 200){
              navigate('/login', { replace: true });
          }
      })
      .catch(err => console.log(err))

      axios.post('http://localhost:8081/user', user)
      .then(res => {
          console.log(res);
          if(res.status === 200){
              navigate('/login', { replace: true });
          }
      })
      .catch(err => console.log(err))
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          ref={registerItemRef}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            backgroundColor: "rgba(235, 235, 235, 0.8)",
            width: "450px",
            borderRadius: "10px",
            py: 2,
            px: 5,  
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={e => setStudent({...student, name: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="matricNo"
                  label="Matric No"
                  name="matricNo"
                  onChange={e => setStudent({...student, matricNo: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleEmailChange}
                />
                {confirmEmail && <FormHelperText error>{confirmEmail}</FormHelperText>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNo"
                  label="Phone Number"
                  id="phoneNo"
                  onChange={e => setStudent({...student, phoneNo: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="ic"
                  label="Identification Number"
                  id="ic"
                  onChange={e => setStudent({...student, IC: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="faculty"
                  required
                  fullWidth
                  id="faculty"
                  label="Faculty"
                  autoFocus
                  onChange={e => setStudent({...student, faculty: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="course"
                  label="Course"
                  name="course"
                  onChange={e => setStudent({...student, course: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="utmID"
                  label="UTMID"
                  id="utmID"
                  autoComplete="new-utmid"
                  onChange={handleUTMIDinput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={!!errorMessage}
                  onChange={handlePasswordChange}
                />
                {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Your Password"
                  type='password'
                  id="confirm-password"
                  value={confirmPassword}
                  error={!!confirmErrorMessage}
                  onChange={handleConfirmPasswordChange}
                />
                {confirmErrorMessage && <FormHelperText error>{confirmErrorMessage}</FormHelperText>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              endIcon={<LoginIcon />}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, ml: 5 }} />
      </Container>
    </ThemeProvider>
  );
}