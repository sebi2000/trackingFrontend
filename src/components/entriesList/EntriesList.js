import React from 'react'
import Header from '../common/Header'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import axios from '../../utils/Axios'
import Moment from 'react-moment'
import CanvasDraw from 'react-canvas-draw'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Button  from '@material-ui/core/Button'
import CONSTANTS from '../../utils/Constants'
import TablePagination from '@material-ui/core/TablePagination'
import { CSVLink} from 'react-csv'
import Dialog from '../common/Dialog'
import { withStyles } from '@material-ui/core/styles'
import Navbar from '../common/Navbar'
import {connect} from 'react-redux'
const RO = require('../../utils/language/RO.json')

const styles = theme => ({
  root: {
    justifyContent: 'flex-end', 
    display: 'flex',
    paddingBottom: '20px'
  },
  datepicker: {
    zIndex: '100',
    marginTop: '17px',
    marginRight: '10px'
  },
  actions:{
    display: 'flex',
    ['@media (max-width: 1300px)']:{
      display: 'block',
    }
  },
  export: {
    color: 'white',
    textDecoration: 'none'
  },
  logout: {
    marginRight: 'auto'
  },
  table:{
    ['@media (min-width: 1200px)']:{
      width: '100%'
    }
  }
})

const columns = [
  { label: RO.entries.index, minWidth:20},
  { label: RO.entries.name, minWidth:20},
  { label: RO.entries.surname, minWidth:20 },
  { label: RO.entries.email, minWidth:20 },
  { label: RO.entries.date, minWidth:20},
  { label: RO.entries.company, minWidth:20},
  { label: RO.entries.phone, minWidth:20 },
  { label: RO.entries.signature, minWidth:20},
  { label: RO.entries.actions, minWidth:20}
];

class EntriesList extends React.Component {
  
  state = {
    classes : "",
    page : 0,
    rowsPerPage : 5,
    entries: [],
    startDate : new Date(2021,0,1),
    endDate : new Date(),
    count : 0,
    csvData : []
}
 
  getEntries = (page, rows) =>{
    axios.get('/entries/?page='+ page + '&rows=' + rows + '&start=' + this.state.startDate + '&end=' + this.state.endDate).then(response => {
      
      let aux=[]
      response.data[0].map((entry, index)=>{
        
        aux[index] = { 
          [RO.entries.surname] : entry.surname, 
          [RO.entries.name] : entry.name, 
          [RO.entries.email] : entry.email,
          [RO.entries.phone]: entry.phone,
          [RO.entries.company]: entry.company,
          [RO.entries.date]: entry.date
        }
      })
        
      this.setState({
        entries : response.data[0],
        count : response.data[1],
        csvData : aux
       })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getEntries(this.state.page, this.state.rowsPerPage)
  }

  handleChangePage = (event, newPage) =>{
    this.setState({page : newPage}, () => {
      this.getEntries(this.state.page, this.state.rowsPerPage)
     })
  }

  handleChangeRowsPerPage = (event) =>{
    this.setState({
      rowsPerPage : parseInt(event.target.value, CONSTANTS.PARSE_INT_RADIX),
      page : 0
    }, () => {
      this.getEntries(this.state.page, this.state.rowsPerPage)
    })
    
  }

  onLogOutButton = () => {
    axios.get('/logout').then(response => {
      this.props.logout()
      this.props.history.push('/')
    })
  }

  onDeleteButton = id => {
    axios.delete(`/entries/${id}`).then(resp => {
      this.getEntries(this.state.page, this.state.rowsPerPage)
    })
  }

  render() {
    
    const { classes } = this.props
    return (
     <div>
        <Navbar/>
        <div className={classes.root}>
          <Button className={classes.logout} onClick={() => this.onLogOutButton()}> {RO.logout} </Button>
        <div className={classes.datepicker}>
          <DatePicker dateFormat="yyyy/MM/dd" selected={this.state.startDate} onChange={date => {this.setState({ startDate : date})}} />
        </div>
        <div className={classes.datepicker}>
          <DatePicker dateFormat="yyyy/MM/dd" selected={this.state.endDate} onChange={date => {this.setState({ endDate : date})}} />
        </div>
          <Button onClick = { () => this.getEntries(this.state.page, this.state.rowsPerPage) }>{RO.filter}</Button>
          <Button><CSVLink className={classes.export} data={this.state.csvData} filename={"Lista-Intrati.csv"}>{RO.export}</CSVLink></Button>
        </div>
       
      <div className={classes.table}> 
        <fieldset>
        <TableContainer >
          <Table entriesList>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    size={'small'}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
              <TableBody>
                  {this.state.entries.map((entry, index) => 
                    <TableRow>
                            <TableCell size={'small'} >{this.state.page * this.state.rowsPerPage + index + 1}</TableCell>
                            <TableCell size={'small'}>{entry.surname}</TableCell>
                            <TableCell size={'small'}>{entry.name}</TableCell>
                            <TableCell size={'small'}>{entry.email}</TableCell>
                            <TableCell size={'small'}>
                               <Moment format = {CONSTANTS.DATE_FORMAT}> 
                                {entry.date}
                             </Moment> 
                            </TableCell>
                            <TableCell size={'small'}>{entry.company}</TableCell>
                            <TableCell size={'small'}>{entry.phone}</TableCell>
                            <TableCell size={'small'} align="center">
                            <CanvasDraw
                                canvasHeight={50}
                                canvasWidth={50}
                                disabled={true}
                                hideGrid={true}
                                saveData={entry.signature}
                                loadTimeOffset={1}
                            />                                                   
                            </TableCell>
                            <TableCell size={'small'}>
                              <div className={classes.actions}>
                              <Dialog entry={entry} function={this.onChange} getEntries={this.getEntries}/>
                              <Button color="secondary" variant="contained" onClick={ () => { this.onDeleteButton(entry._id)} } >{RO.clear}</Button>
                              </div>
                            </TableCell>
                    </TableRow> )} 
              </TableBody> 
            </Table>
          </TableContainer>
          <TablePagination
                component="div"
                count={this.state.count}
                rowsPerPageOptions = {CONSTANTS.ROWS_PER_PAGE_ARRAY}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                rowsPerPage={this.state.rowsPerPage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </fieldset>
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: 'LOGOUT' })
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(EntriesList));
