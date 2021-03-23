import React from 'react'
import Header from '../common/Header'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from '../../utils/Axios'
import Moment from 'react-moment'
import CanvasDraw from 'react-canvas-draw'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button  from '@material-ui/core/Button';
import CONSTANTS from '../../utils/Constants';
import TablePagination from '@material-ui/core/TablePagination';

const columns = [
  { id: 'index', label: 'Index', },
  { id: 'name', label: 'Nume', minWidth: 170 },
  { id: 'surname', label: 'Prenume', minWidth: 100 },
  {
    id: 'data_intrare',
    label: 'Data intrare',
  },
  {
    id: 'company',
    label: 'Companie',
  },
  {
    id: 'signature',
    label: 'Semnatura',
  
  },
];

class EntriesList extends React.Component {
  state = {
    classes : "",
    page : "",
    rowsPerPage : "5",
    entries: [],
    startDate : "",
    endDate : ""
}
 
  getEntries = (page, rows) =>{
    axios.get('/entries/?page='+ page + '&rows=' + rows).then(response => {
      this.setState({entries : response.data})
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
    this.setState({rowsPerPage : parseInt(event.target.value, 10)}, () =>{
      this.getEntries(this.state.page, this.state.rowsPerPage)
    })
    
  }

  render() {
    const styles={
    justifyContent: 'flex-end',
    display: 'flex',
    paddingBottom: '20px'
    }
    return (
     <div>
        <Header/>
        <div style={styles}>
        <Button>Filter</Button>
        <Button>Export</Button>
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
                            <TableCell>
                               <Moment format = {CONSTANTS.DATE_FORMAT}> 
                                {entry.date}
                             </Moment> 
                            </TableCell>
                            <TableCell>{entry.company}</TableCell>
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
                count={20}
                rowsPerPageOptions = {[5, 10, 25]}
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
