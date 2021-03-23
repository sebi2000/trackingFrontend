import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

// export default function TablePaginationDemo() {
//   const [page, setPage] = React.useState(2);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <TablePagination
//       component="div"
//       count={100}
//       page={page}
//       onChangePage={handleChangePage}
//       rowsPerPage={rowsPerPage}
//       onChangeRowsPerPage={handleChangeRowsPerPage}
//     />
//   );
// }

class Pag extends React.Component{
    state = {
        page: 0,
        rowsPerPage: 10
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage})
    }

    handleChangeRowsPerPage = (event) =>{
        this.setState({rowsPerPage: parseInt(event.target.value, 10)})
        this.setState({page: 0})
    }

    render(){
        return(
            <TablePagination
                component="div"
                count={100}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                rowsPerPage={this.state.rowsPerPage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        )
    }

}
export default Pag;
