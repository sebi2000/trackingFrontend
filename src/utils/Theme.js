import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            head: {
                fontSize: 20,
                fontWeight: 'bold',
                backgroundColor: 'white',
                color: 'black',
            },
            body: {
                fontSize: 14,
            },
        },

        MuiTableRow: {
            root: {
               // '&:nth-of-type(odd)': {
                  backgroundColor: 'white',
               // }
            },
        },

         MuiButton :{
             root: {
                 marginTop:"1em",
                 marginRight:"1em",
                 backgroundColor: "#3f50b5",
                 color : "white",
                 '&:hover': {
                    backgroundColor: '#0e24a1',
                 }
            },
            
         },

    }
});

export default theme