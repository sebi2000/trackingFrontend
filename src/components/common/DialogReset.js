import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../../utils/Axios'
import {StatusCodes} from 'http-status-codes'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const RO = require('../../utils/language/RO.json')
toast.configure()

export default function FormDialog() {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')

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
          toast.error(RO.notifications.USER_NOT_FOUND)
        else if(status === RO.notifications.AUTH_SUCCESS && code === StatusCodes.OK)
          toast.success(RO.notifications.EMAIL_SENT)
        else toast.error(RO.notifications.SERVER_ERROR)
      
    })
  }

  return (
    <div>
      <Button style={{marginRight: '0'}} variant="contained" color="primary" onClick={handleClickOpen}>
        {RO.reset}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{RO.reset}</DialogTitle>
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
          <Button onClick={() => {handleClose(); handleEmail();}} color="primary" variant="contained">
            {RO.send}
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            {RO.cancel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}