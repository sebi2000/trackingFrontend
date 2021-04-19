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
  
  let initialFields = [
      {name:'surname', value: props.entry.surname},
      {name:'name', value: props.entry.name},
      {name:'email', value: props.entry.email},
      {name:'company', value: props.entry.company},
      {name:'phone', value: props.entry.phone}
  ]

  const [open, setOpen] = React.useState(false)
  const [entry, setEntry] = React.useState([...initialFields])

  useEffect(() => {
    setEntry(initialFields)
  },[props.entry]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEntry(initialFields)
  };

  const onChange = (event) =>{
    let index = entry.findIndex(field => field.name === event.target.name)
    let copy = [...entry]
    copy[index].value = event.target.value
    setEntry(copy)
  }

  const onSaveClick = () => {
    if(JSON.stringify(initialFields) !== JSON.stringify(entry)){
      let aux ={
          'surname': entry[0].value,
          'name': entry[1].value,
          'email': entry[2].value,
          'company': entry[3].value,
          'phone': entry[4].value
      }
      axios.put(`/entries/${props.entry._id}`, aux).then(resp => {
          console.log(resp)
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
        <DialogTitle id="form-dialog-title">Editeaza</DialogTitle>
        <DialogContent>
            <TextField name="surname" margin="dense" id="surname" label="Nume" fullWidth value={entry[0].value} onChange={onChange}/>
            <TextField name="name" margin="dense" id="name" label="Prenume" fullWidth value={entry[1].value} onChange={onChange}/>
            <TextField name="email" margin="dense" id="email" label="Email" fullWidth value={entry[2].value} onChange={onChange}/>
            <TextField name="company" margin="dense" id="company" label="Companie" fullWidth value={entry[3].value} onChange={onChange}/>
            <TextField name="phone" margin="dense" id="phone" label="Telefon" fullWidth value={entry[4].value} onChange={onChange}/>
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
