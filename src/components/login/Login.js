import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from '../../utils/Axios.js';
import CONSTANTS from '../../utils/Constants'

  let useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  class Login extends React.Component {

    state = {
        email: "",
        password: ""
    }
    
    onChange = event => {
      this.setState({ [event.target.name] : event.target.value})
    }

    handleLogin = () => {
        let user = {user : this.state}
        axios.post('/auth', user).then(response => {
          const { status, code } = response.data
          if(status === CONSTANTS.MESSAGES.AUTH_SUCCESS && CONSTANTS.CODES.ACCESS === 202)
            console.log('User has successfully logged in')
          else if(status === CONSTANTS.MESSAGES.USER_NOT_FOUND && CONSTANTS.CODES.FORBIDDEN === 403)
            console.log('Access forbidden. User was not found!')
          else if(status === CONSTANTS.MESSAGES.INCORRECT_PASS && code === CONSTANTS.CODES.FORBIDDEN)
            console.log('Access forbidden. Incorrect password!')
          else console.log('Unexpected error')
      })
      .catch(err =>{
        console.log(err)
      })
    }

    render(){
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div >
            <Typography component="h1" variant="h5">
            {CONSTANTS.LOGIN}
            </Typography>
            <form noValidate>
              <TextField  
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={ this.onChange }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = { this.onChange }
              />
              <Link href='http://localhost:3000/register' variant="body1">
                  {CONSTANTS.REGISTER}
              </Link>
  
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={ this.handleLogin }
              >
                {CONSTANTS.LOGIN}
              </Button>
              
              <Grid container>
                <Grid item>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      );
    }
  }

export default Login;
  