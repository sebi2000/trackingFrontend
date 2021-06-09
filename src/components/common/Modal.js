import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CanvasDraw from 'react-canvas-draw'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import Notifications from '../../utils/Notifications'
const RO = require('../../utils/language/RO.json')

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  closeIcon: {
    backgroundColor: 'inherit',
    color: 'black',
    '&:hover': {
      backgroundColor: '#DADADA',
    },
    width: '5%'
  }
})

class Modal extends React.Component{

  state = {
    open : false
  }
  
  handleClickOpen = () => {
    this.setState({open : true})
  };

  handleClose = () => {
    this.setState({open : false})
  };

  render(){
    const {classes} = this.props
    return (
      <div>
        <Button onClick={() => this.handleClickOpen()}>
          {RO.sign}
        </Button>
        <Dialog
          open={this.state.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={'md'}
          fullWidth={true}
        >

          <div className={classes.buttons}>
            <Button onClick={this.handleClose} className={classes.closeIcon}><CloseIcon/></Button>
          </div>
          <DialogContent>
            <div>
              <CanvasDraw
                ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                brushColor={"#009933"}
                brushRadius={3}
                canvasWidth={900}
                canvasHeight={400}
              /> 
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  onClick={() => {
                    this.saveableCanvas.clear();
                  }}
                >
                  {RO.clear}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    console.log(this.saveableCanvas.getSaveData()['width'])
                    if(this.saveableCanvas.getSaveData().lines.length){
                      localStorage.setItem(
                        "savedDrawing",
                        this.saveableCanvas.getSaveData()
                      );
                      this.handleClose()
                      this.props.showDrawing()
                    }
                    else Notifications.error(RO.notifications.SIGNATURE_ERROR)
                    
                  }}
                >
                  {RO.save}
                </Button> 
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(Modal)

