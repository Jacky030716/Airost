import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, CssBaseline, FormHelperText, Grid, TextField, Typography } from '@mui/material';
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
    
    useEffect(() => {
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
          })
          .catch((err) => {
            console.error(err);
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
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
        </Container>
    </Grid>
  );
};
  

export default ForgotPassword;
