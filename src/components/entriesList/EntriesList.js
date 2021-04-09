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
import { CSVLink } from "react-csv"

const columns = [
  { id: 'index', label: 'Index', },
  { id: 'name', label: 'Nume', minWidth: 170 },
  { id: 'surname', label: 'Prenume', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'data_intrare', label: 'Data intrare', minWidth: 100},
  { id: 'company', label: 'Companie', minWidth: 100},
  { id: 'phone', label: 'Telefon', minWidth: 100 },
  { id: 'signature', label: 'Semnatura', minWidth: 100}
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
          'Nume' : entry.name, 
          'Prenume' : entry.surname, 
          'Email' : entry.email,
          'Telefon' : entry.phone,
          'Companie' : entry.company,
          'Data intrare' : entry.date
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
  
  render() {
    const styles= {
      justifyContent: 'flex-end',
      display: 'flex',
      paddingBottom: '20px'
    }
    return (
     <div>
        <Header/>
        <div style={styles}>
        <Button onClick = { () => this.getEntries(this.state.page, this.state.rowsPerPage) }>Filter</Button>
        <Button><CSVLink data={this.state.csvData} >Export</CSVLink></Button>
        <DatePicker dateFormat="yyyy/MM/dd" selected={this.state.startDate} onChange={date => {this.setState({ startDate : date})}}/>
        <DatePicker dateFormat="yyyy/MM/dd" selected={this.state.endDate} onChange={date => {this.setState({ endDate : date})}}/>
        </div>
        <fieldset>
        <TableContainer >
          <Table entriesList aria-label="Entries List">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
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
                            <TableCell>{this.state.page * this.state.rowsPerPage + index + 1}</TableCell>
                            <TableCell>{entry.name}</TableCell>
                            <TableCell>{entry.surname}</TableCell>
                            <TableCell>{entry.email}</TableCell>
                            <TableCell>
                               <Moment format = {CONSTANTS.DATE_FORMAT}> 
                                {entry.date}
                             </Moment> 
                            </TableCell>
                            <TableCell>{entry.company}</TableCell>
                            <TableCell>{entry.phone}</TableCell>
                            <TableCell align="center">
                            <CanvasDraw
                                canvasHeight={50}
                                canvasWidth={50}
                                disabled={true}
                                hideGrid={true}
                                saveData={entry.signature}
                                loadTimeOffset={1}
                            />                                                   
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
    )
  }
}

export default EntriesList;
