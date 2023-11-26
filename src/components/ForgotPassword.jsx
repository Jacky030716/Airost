import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, CssBaseline, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ForgotPassword = () => {  
    const [utmID, setUtmID] = useState('');
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operation, setOperation] = useState('+');
    const [answer, setAnswer] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmErrorMessage, setconfirmErrorMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    useEffect(() => {
      setNum1(Math.floor(Math.random() * 10));
      setNum2(Math.floor(Math.random() * 10));
      const operations = ['+', '-'];
      setOperation(operations[Math.floor(Math.random() * operations.length)]);
    }, []);


  const handleSubmit = (e) => {
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
    if (answer == correctAnswer) {
        alert('Correct answer!')
    } else {
        alert('Wrong answer!')
    }
    setAnswer('');
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

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
        if (newConfirmPassword !== password) {
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="utmid"
                        label="Enter UTMID"
                        name="utmid"
                        value={utmID}
                        onChange={(e) => setUtmID(e.target.value)}
                        autoFocus
                    />
                    <Grid item xs={12}>
                        <TextField 
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        />
                        {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sx={{mt: "8px"}}>
                        <TextField
                        required
                        fullWidth
                        name="confirm-password"
                        label="Confirm Your Password"
                        type='password'
                        id="confirm-password"
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
                        value={answer}
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
                            <Link to="/" variant="body2" style={{ color: 'blue'}}>
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
