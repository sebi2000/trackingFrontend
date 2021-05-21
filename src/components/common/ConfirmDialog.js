import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CSVLink} from 'react-csv'
import { makeStyles } from '@material-ui/core/styles'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
const RO = require('../../utils/language/RO.json')

const useStyles = makeStyles((theme) => ({
  export: {
      color: 'white',
      textDecoration: 'none'
    },
  logout: {
      marginBottom : '10px',
      backgroundColor: 'inherit',
      '&:hover': {
        backgroundColor: '#DADADA',
      },
    },
  powerIcon: {
      color: 'black'
    },
}));

export default function ConfirmDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  const classes = useStyles()

 return (
   
    <div>
      {props.type === 'delete' ?
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          {RO.clear}
        </Button>
        : props.type === 'export' ? 
          <Button onClick={handleClickOpen}>{RO.export}</Button>
        : props.type === 'logout' ?
        <Button onClick={handleClickOpen} className={classes.logout}>
          <PowerSettingsNewIcon className={classes.powerIcon}/>
        </Button> 
        : null
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {
          props.type === 'delete' ?
          <div>
          <DialogTitle id="alert-dialog-title">{RO.deleteMessage}</DialogTitle>
            <DialogActions>
              <Button color="secondary" variant="contained" onClick={() => {handleClose(); props.action() }} >
                {RO.clear}
              </Button>
              <Button onClick={handleClose}  autoFocus>
                {RO.cancel}
              </Button>
              </DialogActions>
          </div> 
            : props.type === 'export' ?
          <div>
          <DialogTitle id="alert-dialog-title">{RO.exportMessage}</DialogTitle>
            <DialogActions>
              <Button onClick={() => {handleClose();}} >
                <CSVLink data={props.data} className={classes.export} filename={"Lista-Intrati.csv"}>
                {RO.export}</CSVLink>
              </Button>
              <Button onClick={handleClose}  autoFocus>
                {RO.cancel}
              </Button>
              </DialogActions>
          </div> 
          : props.type === 'logout' ?
          <div>
          <DialogTitle id="alert-dialog-title">{RO.logoutMessage}</DialogTitle>
            <DialogActions>
              <Button color="secondary" variant="contained" onClick={() => {handleClose(); props.onLogOutButton()}}>
                {RO.logout}
              </Button>
              <Button onClick={handleClose} autoFocus>
                {RO.cancel}
              </Button>
              </DialogActions>
          </div> 
          : null

        }
        
      </Dialog>
    </div>
  );
}
