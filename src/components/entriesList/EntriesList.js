import React from 'react'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useState} from "react"


// new Intl.DateTimeFormat("en-GB", {
//   year: "numeric",
//   month: "long",
//   day: "2-digit"
// }).format(entries.entry)

const columns = [
  { id: 'nume', label: 'Nume', minWidth: 170 },
  { id: 'prenume', label: 'Prenume', minWidth: 100 },
  {
    id: 'data_intrare',
    label: 'Data intrare',
    minWidth: 170,
    align: 'right',
    format: (Date) => Date.toLocaleDateString(),
  },
  {
    id: 'companie',
    label: 'Companie',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'semnatura',
    label: 'Semnatura',
    minWidth: 170,
    align: 'right',
  
  },
];

const rows = [ ]; 

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function EntriesList() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [entries, setEntries] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
       <Header/>
      <TableContainer className={classes.container}>
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
              {entries.map((entries, index) => 
                <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{entries.title}</TableCell>
                </TableRow>)}       
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default EntriesList;
