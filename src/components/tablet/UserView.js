import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Header from '../common/Header'
import Modal from './SignatureModal'
import CanvasDraw from 'react-canvas-draw'
import axios from '../../utils/Axios'
import validator from 'validator'
import Navbar from '../common/Navbar'
import { connect } from 'react-redux'
import Notifications from '../../utils/Notifications'
import { withStyles } from '@material-ui/core/styles'
import { StatusCodes } from 'http-status-codes'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import CONSTANTS from '../../utils/Constants'
import { createUser } from '../../redux/actions/tablet'
import { getCompanies } from '../../redux/actions/companies'
const RO = require('../../utils/language/RO.json')

const styles = (theme) => ({
  nextButton: {
    backgroundColor: '#336600',
    '&:hover': {
      backgroundColor: '#264d00',
    },
    marginRight: '0 ',
  },
  flexContainer: {
    display: 'flex',
  },
  gridContainer: {
    display: 'grid',
    width: '100%',
    height: '10em',
    gridTemplateAreas: `
                          'email sign'
                          'phone sign'
                        `,
    gridTemplateColumns: '1fr 250px',
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
    marginTop: '1em',
    marginLeft: '3.5em',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: '1em',
    left: '2.5%',
    right: '2.5%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tabletForm: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    width: '95%',
  },
  identityFields: {
    width: '10%',
    marginRight: '2%',
  },
  fullHeight: {
    height: '100%',
  },
  menuItem: {
    justifyContent: 'space-evenly',
  },
})

class UserView extends React.Component {
  state = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    company: '',
    show: false,
    series: '',
    number: '',
    duration: '',
    observations: '',
    fields: {
      errorName: false,
      errorSurname: false,
      errorEmail: false,
      errorCompany: false,
      errorPhone: false,
      errorSignature: false,
      errorSeries: false,
      errorNumber: false,
      errorDuration: false,
      errorObservations: false,
    },
    companies: [],
  }

  componentDidMount() {
    this.props.getCompanies().then((resp) => {
      this.setState({ companies: resp[0] })
    })
  }

  showDrawing = () => {
    this.setState({ show: true })
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleChange = (event) => {
    this.setState({ company: event.target.value })
  }

  handleEntries = () => {
    let isOk = true

    let auxFields = {
      errorName: false,
      errorSurname: false,
      errorEmail: false,
      errorCompany: false,
      errorPhone: false,
      errorSignature: false,
      errorSeries: false,
      errorNumber: false,
      errorDuraion: false,
    }

    Object.entries(this.state.fields).forEach(([key, value]) => {
      switch (key) {
        case 'errorSurname':
          if (!validator.isAlpha(this.state.surname)) {
            isOk = false
            auxFields.errorSurname = true
          }
          break
        case 'errorName':
          if (!validator.isAlpha(this.state.name)) {
            isOk = false
            auxFields.errorName = true
          }
          break
        case 'errorEmail':
          if (!validator.isEmail(this.state.email)) {
            isOk = false
            auxFields.errorEmail = true
          }
          break
        case 'errorCompany':
          if (validator.isEmpty(this.state.company)) {
            isOk = false
            auxFields.errorCompany = true
          }
          break
        case 'errorPhone':
          if (!validator.isMobilePhone(this.state.phone)) {
            isOk = false
            auxFields.errorPhone = true
          }
          break
        case 'errorSignature':
          if (this.state.show === false) {
            isOk = false
            auxFields.errorSignature = true
          }
          break
        case 'errorSeries':
          if (
            !validator.isAlpha(this.state.series) ||
            !(this.state.series.length > 0 && this.state.series.length < 3)
          ) {
            isOk = false
            auxFields.errorSeries = true
          }
          break
        case 'errorNumber':
          if (
            !validator.isNumeric(this.state.number) ||
            this.state.number.length !== 6
          ) {
            isOk = false
            auxFields.errorNumber = true
          }
          break
        case 'errorDuration':
          if (validator.isEmpty(this.state.duration)) {
            isOk = false
            auxFields.errorDuration = true
          }
          break
      }
    })
    this.setState({ fields: auxFields })

    if (isOk) {
      let entry = {
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        phone: this.state.phone,
        company: this.state.company,
        signature: localStorage.getItem('savedDrawing'),
        series: this.state.series,
        number: this.state.number,
        duration: this.state.duration,
        observations: this.state.observations,
        date: new Date(),
      }

      this.setState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        company: '',
        series: '',
        number: '',
        duration: '',
        observations: '',
        show: false,
      })
      this.props.createUser(entry).then((response) => {
        Notifications.success(RO.notifications.ENTRY_REGISTRATION)
      })
    } else {
      Notifications.error(RO.notifications.ADMIN_FAIL_REGISTRATION)
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.fullHeight}>
        {this.props.user ? (
          <Navbar
            showTabletButton={true}
            showLogoutButton={true}
            path={this.props.location.pathname}
          />
        ) : (
          <Header />
        )}

        <div className={classes.tabletForm}>
          <TextField
            error={this.state.fields.errorName}
            margin="normal"
            required
            fullWidth
            id="name"
            label={RO.entries.name}
            name="name"
            autoComplete="name"
            autoFocus
            onChange={this.onChange}
            value={this.state.name}
          />
          <TextField
            error={this.state.fields.errorSurname}
            margin="normal"
            required
            fullWidth
            id="surname"
            label={RO.entries.surname}
            name="surname"
            autoComplete="surname"
            onChange={this.onChange}
            value={this.state.surname}
          />

          <div className={classes.flexContainer}>
            <TextField
              className={classes.identityFields}
              error={this.state.fields.errorSeries}
              margin="normal"
              required
              fullWidth
              id="name"
              label={RO.entries.series}
              name="series"
              autoComplete="name"
              onChange={this.onChange}
              value={this.state.series}
            />
            <TextField
              error={this.state.fields.errorNumber}
              margin="normal"
              required
              fullWidth
              id="name"
              label={RO.entries.number}
              name="number"
              autoComplete="name"
              onChange={this.onChange}
              value={this.state.number}
            />
          </div>

          <FormControl
            fullWidth
            required
            margin="normal"
            error={this.state.fields.errorDuration}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              {RO.entries.duration}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.duration}
              onChange={this.onChange}
              name="duration"
            >
              {CONSTANTS.DURATION_ARRAY.map((time, index) => {
                return <MenuItem value={time}>{time}</MenuItem>
              })}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            required
            margin="normal"
            error={this.state.fields.errorCompany}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              {RO.entries.company}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.company}
              onChange={this.onChange}
              name="company"
            >
              {this.state.companies.length
                ? this.state.companies.map((company, index) => {
                    return (
                      <MenuItem
                        className={classes.menuItem}
                        value={company.name}
                      >
                        {company.name}
                      </MenuItem>
                    )
                  })
                : null}
            </Select>
          </FormControl>

          <div className={this.state.show ? classes.gridContainer : null}>
            <TextField
              className={classes.email}
              error={this.state.fields.errorEmail}
              margin="normal"
              fullWidth
              required
              id="email"
              label={RO.entries.email}
              name="email"
              autoComplete="email"
              onChange={this.onChange}
              value={this.state.email}
            />

            {this.state.show ? (
              <CanvasDraw
                canvasHeight={CONSTANTS.CANVAS.HEIGHT}
                canvasWidth={CONSTANTS.CANVAS.WIDTH}
                disabled={true}
                hideGrid={true}
                ref={(canvasDraw) => (this.loadableCanvas = canvasDraw)}
                saveData={localStorage.getItem('savedDrawing')}
                loadTimeOffset={2}
                className={classes.sign}
              />
            ) : null}

            <TextField
              className={classes.phone}
              error={this.state.fields.errorPhone}
              fullWidth
              margin="normal"
              required
              id="phone"
              label={RO.entries.phone}
              name="phone"
              autoComplete="phone"
              onChange={this.onChange}
              value={this.state.phone}
            />
          </div>

          <TextField
            margin="normal"
            fullWidth
            id="name"
            label={RO.entries.observations}
            name="observations"
            autoComplete="name"
            onChange={this.onChange}
            value={this.state.observations}
          />
        </div>
        <div className={classes.buttonsContainer}>
          <div className={classes.buttons}>
            <Modal
              showDrawing={this.showDrawing}
              error={this.state.fields.errorSignature}
            />
            <Button
              className={classes.nextButton}
              onClick={() => {
                this.handleEntries()
              }}
            >
              {RO.next}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: () => dispatch(getCompanies()),
    createUser: (entry) => dispatch(createUser(entry)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserView))
