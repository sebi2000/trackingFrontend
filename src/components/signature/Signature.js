import React, { Component } from "react"
import Button from '@material-ui/core/Button';
import CanvasDraw from 'react-canvas-draw'

class Signature extends Component {
 
  render() {
    return (
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
              this.props.handleClose()
              this.props.showDrawing()
            }}
          >
            Save
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            Clear
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
    );
  }
}

export default Signature
