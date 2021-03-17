import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple'

const theme = createMuiTheme({

    palette:{
        primary: {
            main: purple[500],
        },
        
        secondary: {
            main: '#11cb5f'
        }
    },
    overrides: {
    
        MuiTableCell: {
            head: {
                backgroundColor: 'black',
                color: 'white',
            },
            body: {
                fontSize: 14,
            },
        },

        MuiTableRow: {
            root: {
                '&:nth-of-type(odd)': {
                  backgroundColor: 'hover',
                },
            },
        },
    }
});

export default theme