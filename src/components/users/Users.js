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
import AddUserDialog from './AddUserDialog'
import EditDialog from '../common/DialogEdit'
import ConfirmDialog from '../common/ConfirmDialog'
import { connect } from 'react-redux'
import { createLog } from '../../redux/actions/tracking'
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

function Users(props) {
  const [users, setUsers] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rows, setRows] = React.useState(CONSTANTS.INITIAL_ROWS_PER_PAGE)
  const [count, setCount] = React.useState(0)

  const classes = useStyles()

  const columns = [
    { label: RO.entries.index, minWidth: 20 },
    { label: RO.entries.name, minWidth: 20 },
    { label: RO.entries.surname, minWidth: 20 },
    { label: RO.entries.email, minWidth: 20 },
    { label: RO.entries.date, minWidth: 20 },
    { label: RO.entries.phone, minWidth: 20 },
    { label: RO.entries.role, minWidth: 20 },
    { label: RO.entries.actions, minWidth: 20 },
  ]

  useEffect(() => {
    getUsers()
  }, [page, rows, count])

  const getUsers = () => {
    axios
      .get(`/users/?page=${page}&rows=${rows}`)
      .then((resp) => {
        setUsers(resp.data[0])
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

  const onDeleteButton = (id) => {
    axios
      .delete(`/users/${id}`)
      .then((resp) => {
        Notifications.success(RO.notifications.SUCCESS_EDIT)
        getUsers()
        props.createLog(
          props.user.name,
          props.user.surname,
          RO.tracking.delete,
          RO.tracking.usersTable
        )
      })
      .catch((err) => {
        Notifications.error(RO.notifications.SERVER_ERROR)
        console.error(err)
      })
  }

  return (
    <div>
      <Navbar path={props.location.pathname} />
      <AddUserDialog getUsers={getUsers} />
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
              {users
                ? users.map((user, index) => (
                    <TableRow>
                      <TableCell>{page * rows + index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.surname}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Moment format={CONSTANTS.DATE_FORMAT}>
                          {user.date}
                        </Moment>
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <div className={classes.actions}>
                          <EditDialog
                            type={'user'}
                            data={user}
                            getUsers={() => getUsers()}
                          />
                          <ConfirmDialog
                            type={'delete'}
                            onDeleteButton={() => onDeleteButton(user._id)}
                          />
                        </div>
                      </TableCell>
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

const mapStateToProps = (state) => {
  return { user: state.user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createLog: (name, surname, action, table) =>
      dispatch(createLog(name, surname, action, table)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
