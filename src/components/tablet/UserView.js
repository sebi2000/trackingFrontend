import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import Header from '../common/Header'

 class UserView extends React.Component {
   render(){
    return(
      <fieldset>
      <Header/>
        <fieldset>
          <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
          </div>
          <div>
            <TextField id="outlined-basic" label="Surname" variant="outlined" />
          </div>
          <div>
            <TextField id="outlined-basic" label="Email" variant="outlined" />
          </div>
          <div>
            <TextField id="outlined-basic" label="Phone" variant="outlined" />
          </div>
          <div>
            <TextField id="outlined-basic" label="Company" variant="outlined" />
          </div>
          <div >
            <TextField id="outlined-basic" label="Signature" variant="outlined" />
          </div>
          <div>
          <Button variant="contained" >
            Next
          </Button>
          </div>
        </fieldset>
    </fieldset>
    )
  }
}

export default UserView