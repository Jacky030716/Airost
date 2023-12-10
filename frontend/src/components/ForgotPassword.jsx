import React, { useState, useEffect, useRef } from 'react';
import fadeIn from '../style/animation.css'
import { Link } from 'react-router-dom';
import { Alert, Box, Button, Container, CssBaseline, FormHelperText, Grid, Snackbar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const ForgotPassword = () => {  
    const [utmId, setUtmId] = useState('');
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operation, setOperation] = useState('+');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmErrorMessage, setconfirmErrorMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [failSnackbar, setFailSnackbar] = useState(false);

    const forgotItemRef = useRef(null);
    
    useEffect(() => {
      forgotItemRef.current.style.animation = 'fadeIn 1s forwards';

      setNum1(Math.floor(Math.random() * 10));
      setNum2(Math.floor(Math.random() * 10));
      const operations = ['+', '-'];
      setOperation(operations[Math.floor(Math.random() * operations.length)]);
    }, []);

    const handleAnswer = (e) => {
        e.preventDefault();
        let correctAnswer;
        switch (operation) {
          case '+':
            correctAnswer = num1 + num2;
            break;
          case '-':
            correctAnswer = num1 - num2;
            break;
          default:
            break;
        }
        if (parseInt(answer) === correctAnswer) {
          handleReset(e);
        }
        setAnswer('');
      };

    const handleReset = (e) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
          return;
        }
    
        axios.put(`http://localhost:8081/resetpassword/${utmId}`, { newPassword })
          .then((res) => {
            console.log(res);
            setSuccessSnackbar(true);
          })
          .catch((err) => {
            console.error(err);
            setFailSnackbar(true);
          });
      };

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setNewPassword(password);

        // Check password strength here
        if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters long');
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
        setErrorMessage('Password should contain letters, numbers, and symbols. No spaces.');
        } else {
        setErrorMessage('');
        }
        };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        
        // Check if password and confirm password match
        if (newConfirmPassword !== newPassword) {
            setconfirmErrorMessage('Password and confirm password do not match');
        } else {
            setconfirmErrorMessage('');        
            }
        };

  return (
    <Grid
        container
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        style={{ minHeight: '100vh' }}
    >
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                ref={forgotItemRef}
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: "rgba(235, 235, 235, 0.8)",
                borderRadius: "10px",
                }}
                style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', 
                         padding: '40px'}}
            >
                <Typography component="h1" variant="h5">
                Password Reset
                </Typography>
                <Box component="form" onSubmit={handleAnswer} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="utmId"
                        label="Enter UTMID"
                        name="utmId"
                        value={utmId}
                        onChange={(e) => setUtmId(e.target.value)}
                        autoFocus
                    />
                    <Grid item xs={12}>
                        <TextField 
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        />
                        {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sx={{mt: "8px"}}>
                        <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Your Password"
                        type='password'
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        />
                        {confirmErrorMessage && <FormHelperText error>{confirmErrorMessage}</FormHelperText>}
                    </Grid>
                    <Typography component="h5" variant='h7' sx={{mt: '20px'}}>
                        To continue, please solve this: {num1} {operation} {num2}
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="answer"
                        label="Answer"
                        name="answer"
                        autoFocus
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2, width: '100%'}}
                        endIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                    <Grid container>
                        <Grid item xs sx={{mt: '20px'}}>
                            <Link to="/login" variant="body2" style={{ color: 'blue'}}>
                                Back to Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar 
              open={successSnackbar} 
              autoHideDuration={3000} 
              onClose={() => setSuccessSnackbar(false)}
              anchorOrigin={{ vertical: 'middle', horizontal: 'center' }}
              style={{ minWidth: '30%', minHeight: '20%' }}
            >
              <Alert onClose={() => setSuccessSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                Changed Successfully!
              </Alert>
            </Snackbar>
            <Snackbar 
              open={failSnackbar} 
              autoHideDuration={3000} 
              onClose={() => setFailSnackbar(false)}
              anchorOrigin={{ vertical: 'middle', horizontal: 'center' }}
              style={{ minWidth: '30%', minHeight: '20%' }}
            >
              <Alert onClose={() => setFailSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                Something went wrong!
              </Alert>
            </Snackbar>
        </Container>
    </Grid>
  );
};
  

export default ForgotPassword;
