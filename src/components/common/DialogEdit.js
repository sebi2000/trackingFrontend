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
const RO = require('../../utils/language/RO.json')

const useStyles = makeStyles((theme) => ({
  editButton: {
      backgroundColor: 'inherit',
      '&:hover': {
        backgroundColor: '#DADADA',
        
      },
      color: "black",
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
    justifyContent: 'space-between'
  }
}));

export default function FormDialog(props) {

  const classes = useStyles()
   
  const [open, setOpen] = React.useState(false)
  const [entry, setEntry] = React.useState({})
 
  useEffect(() => {
    setEntry(props.entry)
  },[props.entry]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEntry(props.entry)
  };

  const onChange = (event) =>{
    setEntry({
      ...entry,
      [event.target.name] : event.target.value
    })
  }

  const onSaveClick = () => {

  if(!validator.isAlpha(entry.surname) || !validator.isAlpha(entry.name) || 
  !validator.isEmail(entry.email) || !validator.isNumeric(entry.phone) || validator.isEmpty(entry.company))
    return Notifications.error(RO.notifications.ENTRY_ERROR)
  else if(JSON.stringify(props.entry) !== JSON.stringify(entry)){
        axios.put(`/entries/${props.entry._id}`, entry).then(resp => {
            props.getEntries()
        })
        .catch(err => {
          console.log(err)
          Notifications.error(RO.notifications.SERVER_ERROR)
        })
        Notifications.success(RO.notifications.SUCCESS_EDIT)
        handleClose()
      }
  else handleClose()
    
  }

  return (
    <div>
      <Button className={classes.editButton} onClick={handleClickOpen}>
        <EditIcon/>
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <div className={classes.buttonContainer}>
          <DialogTitle id="form-dialog-title">{RO.edit}</DialogTitle>
          <Button onClick={handleClose} className={classes.closeIcon}><CloseIcon/></Button>
        </div>
        <DialogContent>
            <TextField name="surname" margin="dense" id="surname" label="Nume" fullWidth value={entry.surname} onChange={onChange}/>
            <TextField name="name" margin="dense" id="name" label="Prenume" fullWidth value={entry.name} onChange={onChange}/>
            <TextField name="email" margin="dense" id="email" label="Email" fullWidth value={entry.email} onChange={onChange}/>
            <TextField name="company" margin="dense" id="company" label="Companie" fullWidth value={entry.company} onChange={onChange}/>
            <TextField name="phone" margin="dense" id="phone" label="Telefon" fullWidth value={entry.phone} onChange={onChange}/>
        </DialogContent>
        <DialogActions>
          <Button color="default" variant="contained" onClick={handleClose}>
            {RO.cancel}
          </Button>
          <Button onClick={() => {onSaveClick()}} >
            {RO.save}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
