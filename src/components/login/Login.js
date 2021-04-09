import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import axios from '../../utils/Axios.js'
import CONSTANTS from '../../utils/Constants'
import Header from '../common/Header'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'
  
  class Login extends React.Component {
    
    state = {
        email: "",
        password: ""
    }
    
    onChange = event => {
      this.setState({ [event.target.name] : event.target.value})
    }

    handleLogin = () => {

        let emailIsValid = validator.isEmail(this.state.email)
        let passIsValid = !(validator.isEmpty(this.state.password))
            
        if(emailIsValid && passIsValid){
          let user = {user : this.state}
          axios.post('/auth', user).then(response => {
            const { status, code } = response.data
           
            if(code === StatusCodes.OK && status === CONSTANTS.MESSAGES.AUTH_SUCCESS)
                this.props.history.push("/entries")
            else if(code=== StatusCodes.FORBIDDEN && status === CONSTANTS.MESSAGES.USER_NOT_FOUND)
                alert("User not found!")
            else if(code === StatusCodes.FORBIDDEN && status === CONSTANTS.MESSAGES.INCORRECT_PASS)
                alert("Incorrect password")
            else alert("Unexpected error")
          })
          .catch(err =>{
            console.log(err)
          })
        }
        else{
          if(!emailIsValid)
            alert("Enter a valid email!")
          else alert("Password should not be empty!")
        }
    }

    onRegisterButtonClick = () =>{
      this.props.history.push("/register")
    }

    render(){
      return (
        <div>
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
        </div>
      );
    }
  }

export default withRouter(Login);
  