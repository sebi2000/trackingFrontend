import React from 'react'
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
import EditDialog from '../common/DialogEdit'
import { withStyles } from '@material-ui/core/styles'
import Navbar from '../common/Navbar'
import Notifications from '../../utils/Notifications'
import ConfirmDialog from '../common/ConfirmDialog'
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
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
  },
  filterCloseButton:{
    margin: '0',
    marginLeft: '0.3rem',
    height: '1rem',
    width: '1rem',
    minWidth: '1rem'
  },
  filterCloseIcon: {
    height: '1.2rem',
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

  initialDate = new Date()
  
  state = {
    classes : "",
    page : 0,
    rowsPerPage : 5,
    entries: [],
    startDate : this.initialDate,
    endDate : new Date(),
    count : 0,
    csvData : [],
    showFilterIcon: false
}

  componentDidMount() {
    this.setInitialDate()
    this.getEntries()
  }
 
  getEntries = () =>{
    axios.get('/entries/?page='+ this.state.page + '&rows=' + this.state.rowsPerPage + '&start=' + this.state.startDate + '&end=' + this.state.endDate).then(response => {
      
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

  setInitialDate = () => {
    this.initialDate.setHours(0)
    this.initialDate.setMinutes(0)
    this.initialDate.setSeconds(0)
  }

  handleChangePage = (event, newPage) =>{
    this.setState({page : newPage}, () => {
      this.getEntries()
     })
  }

  handleChangeRowsPerPage = (event) =>{
    this.setState({
      rowsPerPage : parseInt(event.target.value, CONSTANTS.PARSE_INT_RADIX),
      page : 0
    }, () => {
      this.getEntries()
    })
    
  }

  onDeleteButton = id => {
    axios.delete(`/entries/${id}`).then(resp => {
      this.getEntries()
    })
    Notifications.success(RO.notifications.SUCCESS_EDIT)
  }

  onCloseFilter = event => {
    event.stopPropagation(); 
    this.setState({
      showFilterIcon: false, 
      startDate: this.initialDate, 
      endDate: new Date()
    }, () => {
      this.getEntries()
    }) 
  }

  onFilterClick = () => {
    if(this.state.startDate !== this.initialDate){
      this.getEntries()
      this.setState({showFilterIcon: true})
    }
      
  }

  render() {
    
    const { classes } = this.props
    
    return (
     <div>
        <Navbar showTabletButton={true} showLogoutButton={true} path={this.props.location.pathname}/>
        <div className={classes.root}>
          <div className={classes.datepicker}>
            <DatePicker dateFormat="yyyy/MM/dd" selected={this.state.startDate} onChange={date => {this.setState({ startDate : date})}} />
          </div>
          <div className={classes.datepicker}>
            <DatePicker dateFormat="yyyy/MM/dd" selected={this.state.endDate} onChange={date => {this.setState({ endDate : date})}} />
          </div>
            <Button onClick={() => this.onFilterClick()}>
              {RO.filter}
                {this.state.showFilterIcon === true ? 
                  
                  <Button onClick={event => this.onCloseFilter(event)} className={classes.filterCloseButton}>
                    <CloseIcon className={classes.filterCloseIcon}/> 
                  </Button> : null
                }
                
            </Button>
            <ConfirmDialog type='export' data={this.state.csvData}/>
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
                              <EditDialog entry={entry} getEntries={this.getEntries}/>
                              <ConfirmDialog type={'delete'} action={() => this.onDeleteButton(entry._id)} />
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

export default  (withStyles(styles)(EntriesList));
