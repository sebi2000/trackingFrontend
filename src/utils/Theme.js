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
                 marginTop:"10px",
                 marginRight:"10px",
                 backgroundColor: "#3f50b5",
                 color : "white",
            },
            
         },

        MuiPaper: {
            root : {
                background: 'Linear-gradient(45deg, #E0F2F1 30%, #E0F7FA 90%)',
            },
        }
        

    }
});

export default theme