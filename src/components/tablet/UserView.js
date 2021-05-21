import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Header from '../common/Header'
import Modal from '../common/Modal'
import CanvasDraw from 'react-canvas-draw'
import axios from '../../utils/Axios'
import validator from 'validator'
import Navbar from '../common/Navbar'
import {connect} from 'react-redux'
import Notifications from '../../utils/Notifications'
import { withStyles } from '@material-ui/core/styles'
const RO = require('../../utils/language/RO.json')

const styles = theme => ({
  nextButton: {
    backgroundColor: '#336600',
    '&:hover': {
      backgroundColor: '#264d00',
    },
  },
  
})


class UserView extends React.Component{

  state ={
    name : "",
    surname : "",
    email : "",
    phone : "",
    company : "",
    signature : "",
    show: false,
    render: false
  }

  initialFields= [
    {name: 'surname', error: false},
    {name: 'name', error: false},
    {name: 'email', error: false},
    {name: 'phone', error: false},
    {name: 'company', error: false},
    {name: 'signature', error: false}
  ]

  showDrawing = () =>{
    this.setState({
      signature: localStorage.getItem("savedDrawing"),
      show : true,
  })
  }

  onChange = event => {
    this.setState({ [event.target.name] : event.target.value})
  }

  handleEntries = () =>{
    let isOk = true

  this.initialFields.forEach(value=>{
    value.error = false
    switch(value.name){
      case 'surname': 
        if(!validator.isAlpha(this.state.surname)){
          isOk=false
          value.error = true
        }
        break
      case 'name': 
        if(!validator.isAlpha(this.state.name)){
          isOk=false
          value.error = true
        } 
        break
      case 'email': 
        if(!validator.isEmail(this.state.email)){
          isOk=false
          value.error = true
        }
        break
      case 'phone': 
        if(!validator.isNumeric(this.state.phone)){
          isOk=false
          value.error = true
        }
        break
      case 'company': 
        if(validator.isEmpty(this.state.company)){
          isOk=false
          value.error = true
        }
        break
      case 'signature': 
        if(validator.isEmpty(this.state.signature)){
          isOk=false
          value.error = true
        }
        break
    }
  })  
      
    if(isOk)
    {
      let entry = {
        name : this.state.name,
        surname : this.state.surname,
        email : this.state.email,
        phone : this.state.phone,
        company : this.state.company,
        signature : this.state.signature,
        date: new Date()
      }

      this.setState({ 
        name : "" ,
        surname : "",
        email : "",
        phone : "",
        company : "",
        show: false
    })
      axios.post("/entries", {entry}).then(response => {
          if(response.data.entry)
            Notifications.success(RO.notifications.ENTRY_REGISTRATION)
          else Notifications.error(RO.notifications.SERVER_ERROR)
      })
    }
    else {
        Notifications.error(RO.notifications.ENTRY_ERROR)
        this.setState({render: true})
    }
  }

  render(){
    const {classes} = this.props
    return(
           <div>
             {this.props.user ?
                <Navbar showTabletButton={true} showLogoutButton={true} path={this.props.location.pathname}/> :
                <Header/>
            }
            
          <fieldset>
            <div>
            <TextField variant="outlined" error={this.initialFields[0].error} margin="normal" required fullWidth id="name" label={RO.entries.name} name={this.initialFields[0].name} autoComplete="name" autoFocus onChange={ this.onChange }  value={this.state.surname}/>
            </div>
            <div>
            <TextField  variant="outlined" error={this.initialFields[1].error} margin="normal" required fullWidth id="surname" label={RO.entries.surname} name={this.initialFields[1].name} autoComplete="surname"  onChange={ this.onChange }  value={this.state.name}/>
            </div>
            <div>
              <TextField  variant="outlined"  error={this.initialFields[2].error} margin="normal" required fullWidth id="email" label={RO.entries.email} name={this.initialFields[2].name} autoComplete="email"  onChange={ this.onChange }  value={this.state.email}/>
            </div>
            <div>
            <TextField  variant="outlined" error={this.initialFields[3].error}  margin="normal" required fullWidth id="phone" label={RO.entries.phone} name={this.initialFields[3].name} autoComplete="phone"  onChange={ this.onChange }  value={this.state.phone}/>
            </div>
            <div>
            <TextField  variant="outlined"  error={this.initialFields[4].error} margin="normal" required fullWidth id="company" label={RO.entries.company} name={this.initialFields[4].name} autoComplete="company"  onChange={ this.onChange }  value={this.state.company}/>
            </div>
            
          <div>
            <Modal showDrawing={ this.showDrawing }/> 

            {this.state.show ?
              <CanvasDraw
              canvasHeight={200}
              canvasWidth={200}
              disabled={true}
              hideGrid={true}
              ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
              saveData={localStorage.getItem("savedDrawing")}
              loadTimeOffset={2}
            />
            : null
          } 
           
       
          </div>
            <div>
            <Button  className={classes.nextButton} onClick={() => {this.handleEntries()}}  >
              {RO.next}
            </Button>
            </div>
          </fieldset>
          </div>
      )
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps)(withStyles(styles)(UserView))
