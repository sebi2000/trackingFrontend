import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Moment from 'react-moment'
import 'react-datepicker/dist/react-datepicker.css'
import Button from '@material-ui/core/Button'
import CONSTANTS from '../../utils/Constants'
import TablePagination from '@material-ui/core/TablePagination'
import EditDialog from '../common/EditDialog'
import { withStyles } from '@material-ui/core/styles'
import Navbar from '../common/Navbar'
import Notifications from '../../utils/Notifications'
import ConfirmDialog from '../common/ConfirmDialog'
import CloseIcon from '@material-ui/icons/Close'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import moment from 'moment'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { connect } from 'react-redux'
import { createLog } from '../../redux/actions/tracking'
import InfoModal from './InfoModal'
import { deleteEntry } from '../../redux/actions/entries'
import { getEntries } from '../../redux/actions/entries'
const RO = require('../../utils/language/RO.json')

const styles = (theme) => ({
  root: {
    justifyContent: 'flex-end',
    display: 'flex',
    paddingBottom: '1.7em',
    marginRight: '1.5em',
  },
  datepicker: {
    zIndex: '100',
    marginRight: '0.3rem',
    width: '11em',
    marginLeft: '1em',
  },
  dateSelector: {
    display: 'flex',
    marginRight: 'auto',
    marginLeft: '1.5em',
    width: '14em',
  },
  actions: {
    display: 'flex',
    ['@media (max-width: 1300px)']: {
      display: 'block',
    },
  },
  logout: {
    marginRight: 'auto',
  },
  table: {
    ['@media (min-width: 1200px)']: {
      width: '100%',
    },
  },
  filterCloseButton: {
    margin: '0',
    marginLeft: '0.3rem',
    height: '1rem',
    width: '1rem',
    minWidth: '1rem',
  },
  filterCloseIcon: {
    height: '1.2rem',
  },
  filter: {
    marginLeft: '0.7rem',
    marginTop: '2em',
  },
  arrowButton: {
    marginTop: '2.5em',
    marginRight: '0.2em',
    backgroundColor: 'inherit',
    '&:hover': {
      backgroundColor: '#DADADA',
    },
    color: 'black',
    height: '1.5rem',
    width: '1.5rem',
    minWidth: '1rem',
  },
  selectableRows: {
    cursor: 'pointer',
  },
})

const columns = [
  { label: RO.entries.index, minWidth: 20 },
  { label: RO.entries.name, minWidth: 20 },
  { label: RO.entries.surname, minWidth: 20 },
  { label: RO.entries.email, minWidth: 20 },
  { label: RO.entries.date, minWidth: 20 },
  { label: RO.entries.company, minWidth: 20 },
  { label: RO.entries.actions, minWidth: 10 },
]

class EntriesList extends React.Component {
  initialDate

  state = {
    classes: '',
    page: 0,
    rowsPerPage: CONSTANTS.INITIAL_ROWS_PER_PAGE,
    entries: [],
    startDate: moment().startOf('day').toDate(),
    endDate: moment().endOf('day').toDate(),
    count: 0,
    csvData: [],
    showFilterIcon: false,
    currentRow: {},
  }

  componentDidMount() {
    this.setInitialDate()
    this.getEntries()
  }

  getEntries = () => {
    this.props
      .getEntries(
        this.state.page,
        this.state.rowsPerPage,
        this.state.startDate,
        this.state.endDate
      )
      .then((response) => {
        let aux = []
        response[0].map((entry, index) => {
          aux[index] = {
            [RO.entries.surname]: entry.surname,
            [RO.entries.name]: entry.name,
            [RO.entries.email]: entry.email,
            [RO.entries.phone]: entry.phone,
            [RO.entries.company]: entry.company,
            [RO.entries.date]: entry.date,
          }
        })

        this.setState({
          entries: response[0],
          count: response[1],
          csvData: aux,
        })
      })
  }

  setInitialDate = () => {
    this.initialDate = moment().startOf('day').toDate()
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage }, () => {
      this.getEntries()
    })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState(
      {
        rowsPerPage: parseInt(event.target.value, CONSTANTS.PARSE_INT_RADIX),
        page: 0,
      },
      () => {
        this.getEntries()
      }
    )
  }

  onDeleteButton = (id) => {
    this.props.deleteEntry(id).then((resp) => {
      Notifications.success(RO.notifications.SUCCESS_EDIT)
      this.getEntries()
      this.props.createLog(
        this.props.user.name,
        this.props.user.surname,
        RO.tracking.delete,
        RO.tracking.entriesTable
      )
    })
  }

  onCloseFilter = (event) => {
    event.stopPropagation()
    this.setState(
      {
        showFilterIcon: false,
        startDate: this.initialDate,
        endDate: moment().endOf('day').toDate(),
      },
      () => {
        this.handleChangePage(event, 0)
        this.getEntries()
      }
    )
  }

  onFilterClick = () => {
    if (this.state.startDate > this.state.endDate)
      Notifications.error(RO.notifications.DATE_ERROR)
    else {
      if (!moment(this.initialDate).isSame(this.state.startDate)) {
        this.getEntries()
        this.setState({ showFilterIcon: true })
      } else {
        this.setState({ showFilterIcon: false })
        this.getEntries()
      }
    }
  }
  onArrowClick = (step) => {
    let startDate, endDate

    if (step === RO.NEXT) {
      startDate = moment(this.state.startDate).add(1, 'days').toDate()
      endDate = moment(this.state.endDate).add(1, 'days').toDate()
    } else {
      startDate = moment(this.state.startDate).subtract(1, 'days').toDate()
      endDate = moment(this.state.endDate).subtract(1, 'days').toDate()
    }

    if (moment(startDate).isAfter(this.initialDate))
      return Notifications.error(RO.notifications.DATE_ERROR)

    this.setState({ startDate: startDate, endDate: endDate }, () => {
      this.getEntries()
      this.onFilterClick()
    })
  }

  onCloseModal = () => {
    this.setState({ currentRow: {} })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Navbar path={this.props.location.pathname} />
        <div className={classes.root}>
          <div className={classes.dateSelector}>
            <Button className={classes.arrowButton}>
              <KeyboardArrowLeftIcon
                onClick={() => {
                  this.onArrowClick(RO.PREV)
                }}
              />
            </Button>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <KeyboardDatePicker
                  autoOk={true}
                  maxDate={new Date()}
                  variant="inline"
                  format={RO.dateFormat}
                  margin="normal"
                  id="date-picker-inline"
                  label={RO.sort}
                  value={this.state.startDate}
                  onChange={(date) => {
                    this.setState(
                      {
                        startDate: date,
                        endDate: moment(date).endOf('day').toDate(),
                      },
                      this.onFilterClick()
                    )
                  }}
                  KeyboardButtonProps={{ 'aria-label': 'change date' }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Button className={classes.arrowButton}>
              <KeyboardArrowRightIcon
                onClick={() => {
                  this.onArrowClick(RO.NEXT)
                }}
              />
            </Button>
          </div>

          <div className={classes.datepicker}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <KeyboardDatePicker
                  autoOk={true}
                  maxDate={new Date()}
                  variant="inline"
                  format={RO.dateFormat}
                  margin="normal"
                  id="date-picker-inline"
                  label={RO.startDate}
                  value={this.state.startDate}
                  onChange={(date) => {
                    this.setState({ startDate: date })
                  }}
                  KeyboardButtonProps={{ 'aria-label': 'change date' }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>

          <div className={classes.datepicker}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <KeyboardDatePicker
                  autoOk={true}
                  maxDate={new Date()}
                  variant="inline"
                  format={RO.dateFormat}
                  margin="normal"
                  id="date-picker-inline"
                  label={RO.endDate}
                  value={this.state.endDate}
                  onChange={(date) => {
                    this.setState({ endDate: date })
                  }}
                  KeyboardButtonProps={{ 'aria-label': 'change date' }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>

          <div>
            <Button
              className={classes.filter}
              onClick={() => this.onFilterClick()}
            >
              {RO.filter}
              {this.state.showFilterIcon === true ? (
                <Button
                  onClick={(event) => this.onCloseFilter(event)}
                  className={classes.filterCloseButton}
                >
                  <CloseIcon className={classes.filterCloseIcon} />
                </Button>
              ) : null}
            </Button>
          </div>
          <ConfirmDialog type="export" data={this.state.csvData} />
        </div>

        {Object.keys(this.state.currentRow).length !== 0 ? (
          <InfoModal
            row={this.state.currentRow}
            onCloseModal={this.onCloseModal}
          />
        ) : null}

        <div className={classes.table}>
          <TableContainer>
            <Table entriesList>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      size={'small'}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.entries.map((entry, index) => (
                  <TableRow
                    hover={true}
                    className={classes.selectableRows}
                    onClick={(event) => {
                      if (event.target.tagName.toLowerCase() === 'td')
                        this.setState({ currentRow: entry })
                    }}
                  >
                    <TableCell size={'small'}>
                      {this.state.page * this.state.rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell size={'small'}>{entry.surname}</TableCell>
                    <TableCell size={'small'}>{entry.name}</TableCell>
                    <TableCell size={'small'}>{entry.email}</TableCell>
                    <TableCell size={'small'}>
                      <Moment format={CONSTANTS.DATE_FORMAT}>
                        {entry.date}
                      </Moment>
                    </TableCell>
                    <TableCell size={'small'}>{entry.company}</TableCell>
                    <TableCell size={'small'}>
                      <div className={classes.actions}>
                        <EditDialog
                          type={'entry'}
                          data={entry}
                          getEntries={this.getEntries}
                        />
                        <ConfirmDialog
                          type={'delete'}
                          onDeleteButton={() => this.onDeleteButton(entry._id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={this.state.count}
            rowsPerPageOptions={CONSTANTS.ROWS_PER_PAGE_ARRAY}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            rowsPerPage={this.state.rowsPerPage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
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
    createLog: (name, surname, action, table) =>
      dispatch(createLog(name, surname, action, table)),
    deleteEntry: (id) => dispatch(deleteEntry(id)),
    getEntries: (page, rows, startDate, endDate) =>
      dispatch(getEntries(page, rows, startDate, endDate)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EntriesList))
