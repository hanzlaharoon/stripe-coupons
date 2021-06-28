import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { baseUrl } from '../shared/baseUrl';
import Navbar from './Navbar';

// Login true means logins page else registration page
const Login = ({ loginProp = false }) => {
  const [login, setLogin] = useState(loginProp);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
    const history = useHistory();
  const handleLogin = () => {
    if (!username || !password) {
      console.log("Validation failed");
      return null;
    }
    const userObj = {
      username: username,
      password: password,
    };
    axios
      .post(baseUrl + 'users/login/', userObj)
      .then((res) => {
        console.log('/login', res);
        if (res.data && res.data.success) {
          console.log('Login Successful');
          resetForm();
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('creds', JSON.stringify(userObj));
            history.push('/coupons');
        } else {
          console.log('Login Failed');
        }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };
  const handleRegister = () => {
    if (username && password && password === confirmPass) {
      const userObj = {
        username: username,
        password: password,
      };
      axios
        .post(baseUrl + 'users/signup/', userObj)
        .then((res) => {
          console.log('/signup', res);
          if (res.data) {
            console.log('Register Successful');
            // resetForm();
            setLogin(true)
            // history.push('/places');
          } else {
            console.log('Sign Up Failed');
          }
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setConfirmPass('');
  };

  return (
    <>
      <Navbar welcome={true} />
      <Container maxWidth='sm'>
        <Box margin={1} padding={1}>
          <Box paddingY={1} paddingX={0} marginY={1}>
            <Typography variant='h4'>{login ? 'Login' : 'Register'}</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label='Username'
                  variant='outlined'
                  // value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Password'
                  variant='outlined'
                  type='password'
                  // value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </Grid>
              {!login && (
                <Grid item xs={12}>
                  <TextField
                    label='Confirm Password'
                    variant='outlined'
                    type='password'
                    // value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    fullWidth
                  />
                </Grid>
              )}
            </Grid>

            <Grid container spacing={2} justify='space-between'>
              <Grid item>
                <Button
                  variant='text'
                  size='small'
                  onClick={() => setLogin(!login)}
                >
                  {login
                    ? 'New user? Register here.'
                    : 'Already registered? Sign in'}
                </Button>
              </Grid>
              <Grid item>
                <Box spacing={1}>
                  <Button
                    onClick={() => (login ? handleLogin() : handleRegister())}
                    variant='contained'
                  >
                    {login ? 'Login' : 'Register'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
