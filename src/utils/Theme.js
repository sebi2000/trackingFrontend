import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            head: {
                fontSize: 20,
                //fontWeight: 'bold
                backgroundColor: '#4db6ac',
                color: 'black',
            },
            body: {
                fontSize: 14,
            },
        },

        MuiTableRow: {
            root: {
               // '&:nth-of-type(odd)': {
                  backgroundColor: '#b2dfdb',
               // }
            },
        },

         MuiButton :{
             root: {
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