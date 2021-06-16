import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CanvasDraw from 'react-canvas-draw'
import { makeStyles } from '@material-ui/core/styles'
const RO = require('../../utils/language/RO.json')

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  seriesWidth: {
    width: '15%',
    marginRight: '3%',
  },
}))

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false)

  const classes = useStyles()

  useEffect(() => {
    setOpen(props.open)
  }, [props.row, props.open])

  const handleClose = () => {
    setOpen(false)
    props.onCloseModal()
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{RO.details}</DialogTitle>
      <DialogContent>
        <TextField
          disabled
          autoFocus
          margin="dense"
          id="name"
          label={RO.entries.name}
          type="name"
          fullWidth
          value={props.row.name}
        />
        <TextField
          disabled
          autoFocus
          margin="dense"
          id="name"
          label={RO.entries.surname}
          type="name"
          fullWidth
          value={props.row.surname}
        />
        <div className={classes.buttonContainer}>
          <TextField
            className={classes.seriesWidth}
            disabled
            autoFocus
            margin="dense"
            id="name"
            label={RO.entries.series}
            type="name"
            fullWidth
            value={props.row.series}
          />
          <TextField
            disabled
            autoFocus
            margin="dense"
            id="name"
            label={RO.entries.number}
            type="name"
            fullWidth
            value={props.row.number}
          />
        </div>
        <TextField
          disabled
          autoFocus
          margin="dense"
          id="name"
          label={RO.entries.email}
          type="email"
          fullWidth
          value={props.row.email}
        />
        <TextField
          disabled
          autoFocus
          margin="dense"
          id="name"
          label={RO.entries.company}
          type="name"
          fullWidth
          value={props.row.company}
        />
        <TextField
          disabled
          autoFocus
          margin="dense"
          id="name"
          label={RO.entries.phone}
          type="name"
          fullWidth
          value={props.row.phone}
        />
        <TextField
          disabled
          autoFocus
          margin="dense"
          id="name"
          label={RO.entries.duration}
          type="name"
          fullWidth
          value={props.row.duration}
        />
        <TextField
          disabled
          autoFocus
          margin="dense"
          id="name"
          label={RO.entries.observations}
          type="name"
          fullWidth
          value={props.row.observations}
        />
        <div>
          <CanvasDraw
            canvasHeight={50}
            canvasWidth={50}
            disabled={true}
            hideGrid={true}
            saveData={props.row.signature}
            loadTimeOffset={1}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{RO.close}</Button>
      </DialogActions>
    </Dialog>
  )
}
