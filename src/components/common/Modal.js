import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CanvasDraw from 'react-canvas-draw'
const RO = require('../../utils/language/RO.json')

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
    return (
      <div>
        <Button  onClick={() => this.handleClickOpen()}>
          {RO.sign}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{RO.sign}</DialogTitle>
          <DialogContent>
            <div>
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem(
                      "savedDrawing",
                      this.saveableCanvas.getSaveData()
                    );
                    this.handleClose()
                    this.props.showDrawing()
                  }}
                >
                  {RO.save}
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    this.saveableCanvas.clear();
                  }}
                >
                  {RO.clear}
                </Button> 
              </div>
              <CanvasDraw
                ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                brushColor={"#009933"}
                brushRadius={3}
                canvasWidth={400}
                canvasHeight={400}
              /> 
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default Modal

