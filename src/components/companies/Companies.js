import React, { useEffect } from 'react'
import Navbar from '../common/Navbar'
import axios from '../../utils/Axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import CONSTANTS from '../../utils/Constants'
import { makeStyles } from '@material-ui/core/styles'
import EditDialog from '../common/DialogEdit'
import ConfirmDialog from '../common/ConfirmDialog'
import Notifications from '../../utils/Notifications'
import AddCompanyDialog from './AddCompanyDialog'
import {connect} from 'react-redux'
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

function Companies(props) {
  const [companies, setCompanies] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rows, setRows] = React.useState(CONSTANTS.INITIAL_ROWS_PER_PAGE)
  const [count, setCount] = React.useState(0)

  const classes = useStyles()

  const columns = [
    { label: RO.companies.index, minWidth: 20 },
    { label: RO.companies.name, minWidth: 20 },
    { label: RO.companies.representative, minWidth: 20 },
    { label: RO.companies.phone, minWidth: 20 },
    { label: RO.companies.email, minWidth: 20 },
    { label: RO.companies.actions, minWidth: 20 },
  ]

  useEffect(() => {
    getCompanies()
  }, [page, rows, count])

  const getCompanies = () => {
    axios
      .get(`/companies/?page=${page}&rows=${rows}`)
      .then((resp) => {
        setCompanies(resp.data[0])
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
      .delete(`/companies/${id}`)
      .then((resp) => {
        Notifications.success(RO.notifications.SUCCESS_EDIT)
        getCompanies()
        props.createLog(props.user.name, props.user.surname, RO.tracking.delete, RO.tracking.companiesTable)
      })
      .catch((err) => {
        Notifications.error(RO.notifications.SERVER_ERROR)
        console.error(err)
      })
  }

  return (
    <div className={classes.table}>
      <Navbar path={props.location.pathname} />
      <AddCompanyDialog getCompanies={getCompanies} />
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
            {companies.map((company, index) => (
              <TableRow>
                <TableCell>{page * rows + index + 1}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.representative}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>
                  <div className={classes.actions}>
                    <EditDialog
                      type={'company'}
                      data={company}
                      getCompanies={() => getCompanies()}
                    />
                    <ConfirmDialog
                      type={'delete'}
                      onDeleteButton={() => onDeleteButton(company._id)}
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
        count={count}
        rowsPerPageOptions={CONSTANTS.ROWS_PER_PAGE_ARRAY}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rows}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {user: state.user}
}

const mapDispatchToProps = (dispatch) => {
  return {
    createLog: (name, surname, action, table) =>
      dispatch(createLog(name, surname, action, table)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies)
