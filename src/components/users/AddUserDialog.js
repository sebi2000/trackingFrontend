import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from '../../utils/Axios'
import validator from 'validator'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Notifications from '../../utils/Notifications'
import { StatusCodes } from 'http-status-codes'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import { connect } from 'react-redux'
const RO = require('../../utils/language/RO.json')

const styles = (theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  createButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '1.3em',
  },
  closeIcon: {
    backgroundColor: 'inherit',
    color: 'black',
    '&:hover': {
      backgroundColor: '#DADADA',
    },
    height: '2.3rem',
    width: '2.3rem',
    minWidth: '1rem',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '1em',
  },
})

class Register extends React.Component {
  state = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    fields: {
      errorName: false,
      errorSurname: false,
      errorEmail: false,
      errorCompany: false,
      errorPhone: false,
      errorRole: false,
    },
    open: false,
  }

  handleRegister = () => {
    let isOk = true

    let auxFields = {
      errorName: false,
      errorSurname: false,
      errorEmail: false,
      errorCompany: false,
      errorPhone: false,
      errorRole: false,
    }

    Object.entries(this.state.fields).forEach(([key, value]) => {
      switch (key) {
        case 'errorSurname':
          if (!validator.isAlpha(this.state.surname)) {
            isOk = false
            auxFields.errorSurname = true
          }
          break
        case 'errorName':
          if (!validator.isAlpha(this.state.name)) {
            isOk = false
            auxFields.errorName = true
          }
          break
        case 'errorEmail':
          if (!validator.isEmail(this.state.email)) {
            isOk = false
            auxFields.errorEmail = true
          }
          break
        case 'errorPhone':
          if (!validator.isMobilePhone(this.state.phone)) {
            isOk = false
            auxFields.errorPhone = true
          }
          break
        case 'errorRole':
          if (validator.isEmpty(this.state.role)) {
            isOk = false
            auxFields.errorRole = true
          }
          break
      }
    })
    this.setState({ fields: auxFields })

    if (isOk) {
      let user = {
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        phone: this.state.phone,
        role: this.state.role,
        password: this.state.password,
      }
      axios
        .post('/users', { user })
        .then((response) => {
          if (response.data.user) {
            Notifications.success(RO.notifications.ADMIN_REGISTRATION)
            this.props.getUsers()
            this.setState({
              name: '',
              surname: '',
              email: '',
              phone: '',
              password: '',
              role: '',
            })
            let tracking = {
              name: this.props.user.name,
              surname: this.props.user.surname,
              action: RO.tracking.add,
              table: RO.tracking.usersTable,
              date: new Date(),
            }
            axios
              .post(`/tracking`, { tracking })
              .then((resp) => {
                if (!resp.data.tracking)
                  Notifications.error(RO.notifications.SERVER_ERROR)
              })
              .catch((err) => {
                console.error(err)
                Notifications.error(RO.notifications.SERVER_ERROR)
              })
            this.handleClose()
          } else if (response.data.keyPattern.email)
            Notifications.error(RO.notifications.EMAIL_ALREADY_EXIST)
          else if (response.data.keyPattern.phone)
            Notifications.error(RO.notifications.PHONE_ALREADY_EXIST)
          else if (
            response.data.status.errors &&
            response.data.code === StatusCodes.UNPROCESSABLE_ENTITY
          )
            Notifications.error(RO.notifications.VALIDATION_ERROR)
        })
        .catch((err) => {
          console.error(err)
          Notifications.error(RO.notifications.SERVER_ERROR)
        })
    } else Notifications.error(RO.notifications.ADMIN_FAIL_REGISTRATION)
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.createButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}
          >
            {RO.addUser}
          </Button>
        </div>
        <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
          <div className={classes.buttonContainer}>
            <DialogTitle id="form-dialog-title">{RO.addUser}</DialogTitle>
            <Button onClick={this.handleClose} className={classes.closeIcon}>
              <CloseIcon />
            </Button>
          </div>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label={RO.entries.surname}
              name="surname"
              autoComplete="surname"
              autoFocus
              onChange={this.onChange}
              value={this.state.surname}
              error={this.state.fields.errorSurname}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label={RO.entries.name}
              type="name"
              id="name"
              autoComplete="name"
              onChange={this.onChange}
              value={this.state.name}
              error={this.state.fields.errorName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={RO.entries.email}
              name="email"
              autoComplete="email"
              onChange={this.onChange}
              value={this.state.email}
              error={this.state.fields.errorEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label={RO.entries.phone}
              id="phone"
              autoComplete="phone"
              onChange={this.onChange}
              value={this.state.phone}
              error={this.state.fields.errorPhone}
            />
            <FormControl
              fullWidth
              required
              margin="normal"
              error={this.state.fields.errorRole}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {RO.entries.role}
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.role}
                onChange={this.onChange}
                name="role"
                label="Age"
              >
                <MenuItem value={'super'}>Super Admin</MenuItem>
                <MenuItem value={'user'}>User</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions className={classes.actionsContainer}>
            <Button
              color="default"
              variant="contained"
              onClick={this.handleClose}
            >
              {RO.cancel}
            </Button>
            <Button
              onClick={this.handleRegister}
              color="primary"
              variant="contained"
            >
              {RO.add}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(withStyles(styles)(Register))
