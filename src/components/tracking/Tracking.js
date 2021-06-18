import React, { useEffect } from 'react'
import Navbar from '../common/Navbar'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import CONSTANTS from '../../utils/Constants'
import Notifications from '../../utils/Notifications'
import axios from '../../utils/Axios'
import Moment from 'react-moment'
const RO = require('../../utils/language/RO.json')

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
    ['@media (max-width: 1300px)']: {
      display: 'block',
    },
  },
  table: {
    ['@media (min-width: 1200px)']: {
      width: '100%',
    },
  },
  createButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '1.3em',
  },
}))

function Tracking(props) {
  const [tracking, setTracking] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rows, setRows] = React.useState(CONSTANTS.INITIAL_ROWS_PER_PAGE)
  const [count, setCount] = React.useState(0)

  const classes = useStyles()

  const columns = [
    { label: RO.tracking.index, minWidth: 20 },
    { label: RO.tracking.name, minWidth: 20 },
    { label: RO.tracking.surname, minWidth: 20 },
    { label: RO.tracking.action, minWidth: 20 },
    { label: RO.tracking.date, minWidth: 20 },
    { label: RO.tracking.table, minWidth: 20 },
  ]

  useEffect(() => {
    getTracking()
  }, [page, rows, count])

  const getTracking = () => {
    axios
      .get(`/tracking/?page=${page}&rows=${rows}`)
      .then((resp) => {
        setTracking(resp.data[0])
        setCount(resp.data[1])
      })
      .catch((err) => {
        Notifications.error(RO.notifications.SERVER_ERROR)
        console.error(err)
      })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRows(parseInt(event.target.value, CONSTANTS.PARSE_INT_RADIX))
  }


  return (
    <div>
      <Navbar path={props.location.pathname} />
      <div className={classes.table}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
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
              {tracking
                ? tracking.map((tracking, index) => (
                    <TableRow>
                      <TableCell>{page * rows + index + 1}</TableCell>
                      <TableCell>{tracking.name}</TableCell>
                      <TableCell>{tracking.surname}</TableCell>
                      <TableCell>{tracking.action}</TableCell>
                      <TableCell>
                        <Moment format={CONSTANTS.DATE_FORMAT}>
                          {tracking.date}
                        </Moment>
                      </TableCell>
                      <TableCell>{tracking.table}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={count}
          rowsPerPageOptions={CONSTANTS.ROWS_PER_PAGE_ARRAY}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rows}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  )
}

export default Tracking
