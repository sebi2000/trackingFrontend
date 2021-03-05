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


const columns = [
    { id: 'nume', label: 'Nume', minWidth: 170 },
    { id: 'prenume', label: 'Prenume', minWidth: 170 },
    {
      id: 'data_intrare',
      label: 'Data intrare',
      minWidth: 170,
      align: 'right',
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
  
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

  

function EntriesList(){

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rows, rowsPerPage, setRowsPerPage] = React.useState(10);

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
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.ReactDOM.render(
                    <React.StrictMode>
                      <UserView/>
                      {/*<FormAdmin/>*/}
                      <Root/>
                    </React.StrictMode>,
                    document.getElementById('root')
                  );minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
             </TableRow>
            </TableHead>
            <TableBody>                   
            </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> 
    </Paper>
       
    )
}

export default EntriesList