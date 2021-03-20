import React from 'react'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles'
import axios from '../../utils/Axios'
import Moment from 'react-moment'
import CanvasDraw from "react-canvas-draw"

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


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#bdbdbd",
    color: theme.palette.common.black,
    fontSize: 15,
  },

}))(TableCell);


class EntriesList extends React.Component {

  state = {
    classes : "",
    page : "",
    rowsPerPage : "5",
    entries: []

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
    return (
      <Paper >
        <Header/>
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
                              <Moment format = "YYYY/MM/DD">
                                {entry.data_intrare}
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
        </Paper>
      
    );
  }
}

export default EntriesList;
