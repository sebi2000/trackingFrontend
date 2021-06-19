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
  gridContainer: {
    display: 'grid',
    width: '100%',
    gridTemplateAreas: `
                          'email sign'
                          'phone sign'
                        `,
    gridTemplateColumns: '1fr 5em',
    gridTemplateRows: '1fr 1fr',
  },
  email: {
    gridArea: 'email',
  },
  phone: {
    gridArea: 'phone',
  },
  sign: {
    gridArea: 'sign',
    marginTop: '2em',
  },
}))

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false)

  const classes = useStyles()

  useEffect(() => {
    setOpen(true)
  }, [props.row])

  const handleClose = () => {
    setOpen(false)
    props.onCloseModal()
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" >
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
        <div className={classes.gridContainer}>
          <TextField
            className={classes.phone}
            disabled
            autoFocus
            margin="dense"
            id="name"
            label={RO.entries.phone}
            type="name"
            fullWidth
            value={props.row.phone}
          />
          <CanvasDraw
            className={classes.sign}
            canvasHeight={100}
            canvasWidth={70}
            disabled={true}
            hideGrid={true}
            saveData={props.row.signature}
            loadTimeOffset={1}
          />
          <TextField
            className={classes.email}
            disabled
            autoFocus
            margin="dense"
            id="name"
            label={RO.entries.duration}
            type="name"
            fullWidth
            value={props.row.duration}
          />
        </div>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{RO.close}</Button>
      </DialogActions>
    </Dialog>
  )
}
