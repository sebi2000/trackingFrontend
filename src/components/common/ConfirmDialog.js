import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { CSVLink} from 'react-csv'
import { makeStyles } from '@material-ui/core/styles'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'
const RO = require('../../utils/language/RO.json')

const useStyles = makeStyles((theme) => ({
  export: {
      color: 'white',
      textDecoration: 'none',
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
  deleteButton: {
      backgroundColor: 'inherit',
      height: '1.5rem',
      width: '1.5rem',
      minWidth: '1rem',
      '&:hover': {
        backgroundColor: '#DADADA',
      },
      color: "black"
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
  exportButton: {
    marginTop: '2em'
  },
  actionsContainer: {
    display: 'flex', 
    justifyContent: 'space-between',
    marginLeft: '1em'
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
        <Button className={classes.deleteButton} onClick={handleClickOpen}>
          <DeleteIcon/>
        </Button>
        : props.type === 'export' ? 
          <Button onClick={handleClickOpen} className={classes.exportButton} >{RO.export}</Button>
        : props.type === 'logout' ?
        <Button onClick={handleClickOpen} className={classes.logout}>
          <PowerSettingsNewIcon className={classes.powerIcon}/>
        </Button> 
        : null
      }
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {
          props.type === 'delete' ?
          <div>
            <div className={classes.buttonContainer}>
              <DialogTitle id="alert-dialog-title">{RO.clear}</DialogTitle>
              <Button onClick={handleClose} className={classes.closeIcon}><CloseIcon/></Button>
            </div>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {RO.deleteMessage}
              </DialogContentText>
          </DialogContent>
            <DialogActions className={classes.actionsContainer}>
                <Button color="default" variant="contained" onClick={handleClose}  autoFocus>
                  {RO.no}
                </Button>
                <Button onClick={() => {handleClose(); props.onDeleteButton() }} >
                  {RO.yes}
                </Button>
              </DialogActions>
          </div> 
            : props.type === 'export' ?
          <div>
          <div className={classes.buttonContainer}>
            <DialogTitle id="alert-dialog-title">{RO.export}</DialogTitle>
            <Button onClick={handleClose} className={classes.closeIcon}><CloseIcon/></Button>
          </div>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {RO.exportMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.actionsContainer}>
              <Button color="default" variant="contained" onClick={handleClose}  autoFocus>
                {RO.no}
              </Button>
              <Button onClick={() => {handleClose();}} >
                <CSVLink data={props.data} className={classes.export} filename={RO.exportFile}>
                {RO.yes}</CSVLink>
               </Button>
              </DialogActions>
          </div> 
          : props.type === 'logout' ?
          <div>
          <div className={classes.buttonContainer}>
            <DialogTitle id="alert-dialog-title">{RO.logout}</DialogTitle>
            <Button onClick={handleClose} className={classes.closeIcon}><CloseIcon/></Button>
          </div>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {RO.logoutMessage}
            </DialogContentText>
          </DialogContent>
            <DialogActions className={classes.actionsContainer}>
                <Button color="default" variant="contained" onClick={handleClose} autoFocus>
                  {RO.no}
                </Button>
                <Button onClick={() => {handleClose(); props.onLogOutButton()}}>
                  {RO.yes}
                </Button>
              </DialogActions>
          </div> 
          : null

        }
        
      </Dialog>
    </div>
  );
}
