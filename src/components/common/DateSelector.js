// import 'date-fns';
// import React, { useEffect } from 'react';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers'
// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles({
//     dateSelector:{
//         width: '11em',
//         height: '3em'
//     }
//   });

// export default function MaterialUIPickers(props) {

//   const classes = useStyles();
// //   const [selectedDate, setSelectedDate] = React.useState('')

// //   useEffect(()=>{
// //     setSelectedDate(props.selectedDate)
// //   },[props.selectedDate])

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <Grid container >
//         <KeyboardDatePicker className={classes.dateSelector} maxDate={new Date()} disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" id="date-picker-inline" 
//         label="Date picker inline" value={props.selectedDate} onChange={handleDateChange} KeyboardButtonProps={{'aria-label': 'change date',}}
//         />
//       </Grid>
//     </MuiPickersUtilsProvider>
//   );
// }
