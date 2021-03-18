import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            head: {
                fontSize: 17,
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
                '&:nth-of-type(odd)': {
                  backgroundColor: '#b2dfdb',
                }
            },
        },

        MuiButton :{
            root: {
                backgroundColor: "#00695c",
                color : "white",
            },
        },

        MuiPaper: {
            root : {
                background: 'Linear-gradient(45deg, #b2dfdb 30%, #81d4fa 90%)',
            },
        }
        

    }
});

export default theme