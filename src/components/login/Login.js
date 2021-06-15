import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Header from '../common/Header'
import { StatusCodes } from 'http-status-codes'
import validator from 'validator'
import { withStyles } from '@material-ui/core/styles'
import DialogReset from '../../components/common/DialogReset'
import { connect } from 'react-redux'
import { auth } from '../../redux/actions/index'
import Notifications from '../../utils/Notifications'
const RO = require('../../utils/language/RO.json')

const styles = (theme) => ({
  button: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  header: {
    margin: 'auto',
    width: '11%',
    marginBottom: '2%',
    marginTop: '2%',
  },
})

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    role: '',
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = () => {
    let emailIsValid = validator.isEmail(this.state.email)
    let passIsValid = !validator.isEmpty(this.state.password)

    if (emailIsValid && passIsValid) {
      let user = { user: this.state }

      this.props.login(user).then((response) => {
        if (response.userFound) {
          if (response.userFound.role === 'super')
            this.props.history.push('/tracking')
          else this.props.history.push('/entries')

          localStorage.setItem('token', response.token)
        } else if (
          response.code === StatusCodes.FORBIDDEN &&
          response.status === RO.notifications.USER_NOT_FOUND
        )
          Notifications.error(RO.notifications.USER_NOT_FOUND)
        else if (
          response.code === StatusCodes.FORBIDDEN &&
          response.status === RO.notifications.INCORRECT_PASS
        )
          Notifications.error(RO.notifications.INCORRECT_PASS)
        else Notifications.error(RO.notifications.SERVER_ERROR)
      })
    } else {
      if (!emailIsValid) Notifications.error(RO.notifications.EMAIL_INCORRECT)
      else Notifications.error(RO.notifications.PASS_INCORRECT)
    }
  }

  onRegisterButtonClick = () => {
    this.props.history.push('/register')
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <div className={classes.header}>
          <Header />
        </div>
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
                onChange={this.onChange}
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
                onChange={this.onChange}
                onKeyPress={(event) =>
                  event.key === 'Enter' ? this.handleLogin() : null
                }
              />
              <Button fullWidth onClick={this.handleLogin}>
                {RO.login}
              </Button>
              <DialogReset />

              <Grid container>
                <Grid item></Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(auth(user)),
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login))
