import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../../utils/Axios'
const RO = require('../../utils/language/RO.json')

export default function FormDialog(props) {
   
  const [open, setOpen] = React.useState(false)
  const [entry, setEntry] = React.useState(props.entry)

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
    if(JSON.stringify(props.entry) !== JSON.stringify(entry)){
      axios.put(`/entries/${props.entry._id}`, entry).then(resp => {
          props.getEntries()
      })
    }
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        {RO.edit}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{RO.edit}</DialogTitle>
        <DialogContent>
            <TextField name="surname" margin="dense" id="surname" label="Nume" fullWidth value={entry.surname} onChange={onChange}/>
            <TextField name="name" margin="dense" id="name" label="Prenume" fullWidth value={entry.name} onChange={onChange}/>
            <TextField name="email" margin="dense" id="email" label="Email" fullWidth value={entry.email} onChange={onChange}/>
            <TextField name="company" margin="dense" id="company" label="Companie" fullWidth value={entry.company} onChange={onChange}/>
            <TextField name="phone" margin="dense" id="phone" label="Telefon" fullWidth value={entry.phone} onChange={onChange}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleClose(); onSaveClick()}} >
            {RO.save}
          </Button>
          <Button onClick={handleClose}>
            {RO.cancel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
