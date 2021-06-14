import React, {useEffect} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import axios from '../../utils/Axios'
import { makeStyles } from '@material-ui/core/styles'
import Notifications from '../../utils/Notifications'
import CloseIcon from '@material-ui/icons/Close'
import validator from 'validator'
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
    },
  createButton:{
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '1.3em',
  }
}));

function ResetDialog(props) {

  const initialFields = {
    name:{value: '', error: false}, 
    representative: {value:'', error: false}, 
    phone:{value:'', error: false}, 
    email: {value:'', error: false}
  }
  const [open, setOpen] = React.useState(false)
  const [company, setCompany] = React.useState(initialFields)
  
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCompany(initialFields)
    setOpen(false);
  };

  const onChange = event => {
    let error = false
    if(event.target.name === 'name' && validator.isEmpty(event.target.value))
      error = true
    else if(event.target.name === 'phone' && !validator.isMobilePhone(event.target.value))
      error = true
    else if(event.target.name === 'representative' && !validator.isAlpha(event.target.value))
      error = true
    else if(event.target.name === 'email' && !validator.isEmail(event.target.value))
      error = true
      
    setCompany({
      ...company,
      [event.target.name] : {value: event.target.value, error: error}
    })
  };

  const addCompany = () => {

    let isOk = true
    Object.entries(company).forEach(([key, field]) =>{
      if(field.error === true || validator.isEmpty(field.value))
        isOk = false
    })

    if(isOk === true)
    {
      let newCompany = {
        name: company.name.value,
        representative: company.representative.value,
        phone: company.phone.value,
        email: company.email.value
      }
      axios.post('/companies', {newCompany}).then(response => {
        if(response.data.company){
          Notifications.success(RO.notifications.SUCCESS_ADD_COMPANY)
          props.getCompanies()
          handleClose()
        }
        else if(response.data.keyValue.name)
          Notifications.error(RO.notifications.COMPANY_ALREADY_EXISTS)
      })
      .catch(err => {
        Notifications.error(RO.notifications.SERVER_ERROR)
        console.error(err)
      })
    }
    else Notifications.error(RO.notifications.DATA_ERROR)
  }

  return (
    <div>
      <div className={classes.createButton}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          {RO.addCompany}
        </Button>
      </div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <div className={classes.buttonContainer}>
          <DialogTitle id="form-dialog-title">{RO.addCompany}</DialogTitle>
          <Button onClick={handleClose} className={classes.closeIcon}><CloseIcon/></Button>
        </div>
        <DialogContent>
          <TextField error={company.name.error} name="name" autoFocus margin="dense" label={RO.companies.name} fullWidth onChange={onChange}/>
          <TextField error={company.representative.error} name="representative" margin="dense" label={RO.companies.representative} fullWidth onChange={onChange}/>
          <TextField error={company.phone.error} name="phone" margin="dense" label={RO.companies.phone} fullWidth onChange={onChange}/>
          <TextField error={company.email.error} name="email" margin="dense" label={RO.companies.email} fullWidth onChange={onChange}/>
        </DialogContent>
        <DialogActions>
          <Button color="default" variant="contained" onClick={handleClose}>
            {RO.cancel}
          </Button>
          <Button onClick={addCompany} color="primary" variant="contained">
            {RO.add}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResetDialog
