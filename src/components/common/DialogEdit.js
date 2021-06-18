import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import axios from '../../utils/Axios'
import Notifications from '../../utils/Notifications'
import validator from 'validator'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { connect } from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { createLog } from '../../redux/actions/tracking'
const RO = require('../../utils/language/RO.json')

const useStyles = makeStyles((theme) => ({
  editButton: {
    backgroundColor: 'inherit',
    '&:hover': {
      backgroundColor: '#DADADA',
    },
    color: 'black',
    height: '1.5rem',
    width: '1.5rem',
    minWidth: '1rem',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '1em',
  },
}))

function EditDialog(props) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({})

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setData(props.data)
  }

  const onChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const onSaveClick = () => {
    if (props.type === 'entry') {
      if (
        !validator.isAlpha(data.surname) ||
        !validator.isAlpha(data.name) ||
        !validator.isEmail(data.email) ||
        !validator.isMobilePhone(data.phone) ||
        validator.isEmpty(data.company)
      )
        return Notifications.error(RO.notifications.DATA_ERROR)
      else if (JSON.stringify(props.data) !== JSON.stringify(data)) {
        axios
          .put(`/entries/${props.data._id}`, data)
          .then((resp) => {
            props.getEntries()
            props.createLog(
              props.user.name,
              props.user.surname,
              RO.tracking.edit,
              RO.tracking.entriesTable
            )
          })
          .catch((err) => {
            console.error(err)
            Notifications.error(RO.notifications.SERVER_ERROR)
          })
        Notifications.success(RO.notifications.SUCCESS_EDIT)
        handleClose()
      } else handleClose()
    } else if (props.type === 'company') {
      if (
        validator.isEmpty(data.name) ||
        !validator.isAlpha(data.representative) ||
        !validator.isEmail(data.email) ||
        !validator.isMobilePhone(data.phone)
      )
        return Notifications.error(RO.notifications.DATA_ERROR)
      else if (JSON.stringify(props.data) !== JSON.stringify(data)) {
        axios
          .put(`/companies/${props.data._id}`, data)
          .then((resp) => {
            props.getCompanies()
            props.createLog(
              props.user.name,
              props.user.surname,
              RO.tracking.edit,
              RO.tracking.companiesTable
            )
          })
          .catch((err) => {
            console.error(err)
            Notifications.error(RO.notifications.SERVER_ERROR)
          })
        Notifications.success(RO.notifications.SUCCESS_EDIT)
        handleClose()
      } else handleClose()
    } else if (props.type === 'user') {
      if (
        !validator.isAlpha(data.surname) ||
        !validator.isAlpha(data.name) ||
        !validator.isEmail(data.email) ||
        !validator.isMobilePhone(data.phone) ||
        validator.isEmpty(data.role)
      )
        return Notifications.error(RO.notifications.DATA_ERROR)
      else if (JSON.stringify(props.data) !== JSON.stringify(data)) {
        axios
          .put(`/users/${props.data._id}`, data)
          .then((resp) => {
            props.getUsers()
            props.createLog(
              props.user.name,
              props.user.surname,
              RO.tracking.edit,
              RO.tracking.usersTable
            )
          })
          .catch((err) => {
            console.error(err)
            Notifications.error(RO.notifications.SERVER_ERROR)
          })
        Notifications.success(RO.notifications.SUCCESS_EDIT)
        handleClose()
      } else handleClose()
    }
  }

  return (
    <div>
      <Button className={classes.editButton} onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <div className={classes.buttonContainer}>
          <DialogTitle id="form-dialog-title">{RO.edit}</DialogTitle>
          <Button onClick={handleClose} className={classes.closeIcon}>
            <CloseIcon />
          </Button>
        </div>
        {props.type === 'entry' ? (
          <DialogContent>
            <TextField
              name="surname"
              margin="dense"
              id="surname"
              label="Nume"
              fullWidth
              value={data.surname}
              onChange={onChange}
            />
            <TextField
              name="name"
              margin="dense"
              id="name"
              label="Prenume"
              fullWidth
              value={data.name}
              onChange={onChange}
            />
            <TextField
              name="email"
              margin="dense"
              id="email"
              label="Email"
              fullWidth
              value={data.email}
              onChange={onChange}
            />
            <TextField
              name="company"
              margin="dense"
              id="company"
              label="Companie"
              fullWidth
              value={data.company}
              onChange={onChange}
            />
            <TextField
              name="phone"
              margin="dense"
              id="phone"
              label="Telefon"
              fullWidth
              value={data.phone}
              onChange={onChange}
            />
          </DialogContent>
        ) : props.type === 'company' ? (
          <DialogContent>
            <TextField
              name="name"
              margin="dense"
              id="name"
              label="Nume"
              fullWidth
              value={data.name}
              onChange={onChange}
            />
            <TextField
              name="email"
              margin="dense"
              id="email"
              label="Email"
              fullWidth
              value={data.email}
              onChange={onChange}
            />
            <TextField
              name="representative"
              margin="dense"
              id="representative"
              label="Reprezentant"
              fullWidth
              value={data.representative}
              onChange={onChange}
            />
            <TextField
              name="phone"
              margin="dense"
              id="phone"
              label="Telefon"
              fullWidth
              value={data.phone}
              onChange={onChange}
            />
          </DialogContent>
        ) : props.type === 'user' ? (
          <DialogContent>
            <TextField
              name="surname"
              margin="dense"
              id="surname"
              label="Nume"
              fullWidth
              value={data.surname}
              onChange={onChange}
            />
            <TextField
              name="name"
              margin="dense"
              id="name"
              label="Prenume"
              fullWidth
              value={data.name}
              onChange={onChange}
            />
            <TextField
              name="email"
              margin="dense"
              id="email"
              label="Email"
              fullWidth
              value={data.email}
              onChange={onChange}
            />
            <TextField
              name="phone"
              margin="dense"
              id="phone"
              label="Telefon"
              fullWidth
              value={data.phone}
              onChange={onChange}
            />
            <FormControl fullWidth required margin="normal">
              <InputLabel id="demo-simple-select-outlined-label">
                {RO.entries.role}
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.role}
                onChange={onChange}
                name="role"
              >
                <MenuItem value={'super'}>Super Admin</MenuItem>
                <MenuItem value={'user'}>User</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
        ) : null}
        <DialogActions className={classes.actionsContainer}>
          <Button color="default" variant="contained" onClick={handleClose}>
            {RO.cancel}
          </Button>
          <Button
            onClick={() => {
              onSaveClick()
            }}
          >
            {RO.save}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createLog: (name, surname, action, table) =>
      dispatch(createLog(name, surname, action, table)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog)
