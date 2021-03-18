import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import Header from '../common/Header'
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 29c4b347e9405becb0a2f40e56db64c9bebdcec7

 class UserView extends React.Component {

  onChange = event => {
    this.setState({ [event.target.name] : event.target.value})
  }
<<<<<<< HEAD
>>>>>>> chore:small corrections
=======
>>>>>>> 29c4b347e9405becb0a2f40e56db64c9bebdcec7

   render(){
    return(
      <fieldset>
      <Header/>
        <fieldset>
            <TextField 
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="name"
             label="Name"
             name="name"
             autoComplete="name"
             autoFocus
             onChange={ this.onChange }
             />
           <TextField 
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="surname"
             label="Surname"
             name="surname"
             autoComplete="surname"
             autoFocus
             onChange={ this.onChange }
             />
            <TextField  
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={ this.onChange }
              />
           <TextField 
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="phone"
             label="Phone"
             name="phone"
             autoComplete="phone"
             autoFocus
             onChange={ this.onChange }
             />
           <TextField 
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="company"
             label="Company"
             name="company"
             autoComplete="company"
             autoFocus
             onChange={ this.onChange }
             />
          <TextField 
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="signature"
             label="Signature"
             name="signature"
             autoComplete="signature"
             autoFocus
             onChange={ this.onChange }
             />
            <div align='right'>
             <Button 
             variant="contained"
             color="primary"
             >
              Next
             </Button>
            </div>
        </fieldset>
    </fieldset>
    )
  }
}

export default UserView