import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../../utils/Axios'
import {StatusCodes} from 'http-status-codes'
import { makeStyles } from '@material-ui/core/styles'
import Notifications from '../../utils/Notifications'
import CloseIcon from '@material-ui/icons/Close'
const RO = require('../../utils/language/RO.json')

const useStyles = makeStyles((theme) => ({
  resetLink : {
    color: '#3f50b5',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop : '2%',
    cursor: 'pointer',
    fontSize : '1.05rem',
    "&:hover": {
      color: "#0e24a1"
    }
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
      justifyContent: 'space-between'
    }
}));

function ResetDialog(props) {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = event => {
    setEmail(event.target.value)
  };

  const handleEmail = () => {
    axios.post('/reset', {email}).then(resp =>{
        const {status, code} = resp.data
        if(status === RO.notifications.USER_NOT_FOUND && code === StatusCodes.FORBIDDEN)
          Notifications.error(RO.notifications.USER_NOT_FOUND)
        else if(status === RO.notifications.AUTH_SUCCESS && code === StatusCodes.OK)
          Notifications.success(RO.notifications.EMAIL_SENT)  
    })
    .catch(err =>{
      Notifications.error(RO.notifications.SERVER_ERROR)
    })
  }

  return (
    <div>
      <Link className={classes.resetLink} variant="contained" color="primary" onClick={handleClickOpen}>
        {RO.reset}
      </Link>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <div className={classes.buttonContainer}>
          <DialogTitle id="form-dialog-title">{RO.reset}</DialogTitle>
          <Button onClick={handleClose} className={classes.closeIcon}><CloseIcon/></Button>
        </div>
        <DialogContent>
         <DialogContentText>
            {RO.resetMessage}
         </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={RO.auth.email}
            type="email"
            fullWidth
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="default" variant="contained" onClick={handleClose}>
            {RO.cancel}
          </Button>
          <Button onClick={() => {handleClose(); handleEmail();}} color="primary" variant="contained">
            {RO.send}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResetDialog
