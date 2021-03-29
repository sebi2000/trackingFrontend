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
 
  getEntries = () => axios.get('/entries').then(response => {
    console.log("CDM",response.data)
    this.setState({entries : response.data})
    
    console.log("ENTRIES",this.state.entries)
    }).catch(err => {
      console.log(err)
    })

componentDidMount() {
  this.getEntries()
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
                            <TableCell>{index+1}</TableCell>
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
          </fieldset>
    </div>
    )
  }
}

export default EntriesList;
