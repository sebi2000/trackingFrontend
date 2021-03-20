import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles,ThemeProvider} from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from '../../utils/Axios.js';
import CONSTANTS from '../../utils/Constants'
import Header from '../common/Header'
import theme from '../../utils/Theme'
  
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
          {
            console.log('User has successfully logged in')
            this.props.history.push("/entries")
          }
          else if(status === CONSTANTS.MESSAGES.USER_NOT_FOUND && CONSTANTS.CODES.FORBIDDEN === 403)
          {
            console.log('Access forbidden. User was not found!')
            alert("User not found!")
          }
          else if(status === CONSTANTS.MESSAGES.INCORRECT_PASS && code === CONSTANTS.CODES.FORBIDDEN)
          {
            console.log('Access forbidden. Incorrect password!')
            alert("Incorrect password")
          }
          else console.log('Unexpected error')
      })
      .catch(err =>{
        console.log(err)
      })
    }

    onRegisterButtonClick = () =>{
      this.props.history.push("/register")
    }

    render(){
      return (
        <ThemeProvider theme={theme}>
        <Header/>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
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
                label="Adresa de email"
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
                label="Parola"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = { this.onChange }
              />
              <Button  onClick={this.onRegisterButtonClick}>{CONSTANTS.REGISTER}</Button>
              <Button  fullWidth onClick={ this.handleLogin }>{CONSTANTS.LOGIN}</Button>
              
              <Grid container>
                <Grid item>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        </ThemeProvider>
      );
    }
  }

export default withRouter(Login);
  