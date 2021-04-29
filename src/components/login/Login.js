import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Route, withRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import axios from '../../utils/Axios.js'
import Header from '../common/Header'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles'
import DialogReset from '../../components/common/DialogReset'
const RO = require('../../utils/language/RO.json')
toast.configure()

  const styles = theme => ({
    button : {
        display: 'flex',
        justifyContent: 'space-between'
    }
  })
  
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
            if(code === StatusCodes.OK && status === RO.notifications.AUTH_SUCCESS){
              this.props.logIn()
              this.props.history.push("/entries")
            }
            else if(code=== StatusCodes.FORBIDDEN && status === RO.notifications.USER_NOT_FOUND)
                toast.error(RO.notifications.USER_NOT_FOUND)
            else if(code === StatusCodes.FORBIDDEN && status === RO.notifications.INCORRECT_PASS)
                toast.error(RO.notifications.INCORRECT_PASS)
            else toast.error(RO.notifications.SERVER_ERROR)
          })
          .catch(err =>{
            console.log(err)
          })
        }
        else{
          if(!emailIsValid)
            toast.error(RO.notifications.EMAIL_INCORRECT)
          else toast.error(RO.notifications.PASS_INCORRECT)
        }
    }

    onRegisterButtonClick = () =>{
      this.props.history.push("/register")
    }

    render(){
      const {classes} = this.props
      return (
        <div>
        <Header/>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Typography component="h1" variant="h5">
            {RO.login}
            </Typography>
            <form noValidate>
              <TextField  
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={RO.auth.email}
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
                label={RO.auth.password}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = { this.onChange }
              />
               <div className={classes.button}> 
                <Button onClick={this.onRegisterButtonClick}>{RO.register}</Button>
                <DialogReset />
              </div>
              <Button fullWidth onClick={ this.handleLogin }>{RO.login}</Button>
              
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

export default (withStyles)(styles)(Login);
  