import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import Header from '../common/Header'
import Logo from '../../assets/weSolvvoLogoMotto.jpeg'
import Modal from '../common/Modal'
import CanvasDraw from 'react-canvas-draw'
import axios from '../../utils/Axios'
import { withRouter } from 'react-router-dom'
import CONSTANTS from '../../utils/Constants'


class UserView extends React.Component{

  state ={
    name : "",
    surname : "",
    email : "",
    phone : "",
    company : "",
    signature : ""
  }

  onChange = event => {
    this.setState({ [event.target.name] : event.target.value})
  }

  handleEntries = () =>{
    let entry = {entries : this.state}
    axios.post("/entries", entry).then(response => {
        console.log(response.data)
    })
  }

  onNextClick = () =>{
    this.setState({ 
      name : "" ,
      surname : "",
      email : "",
      phone : "",
      company : "",
      signature : ""
  })
  }

  render(){
    return(
        <div>
          <fieldset>
            <img src={Logo} />
          <fieldset>
            <div>
              <TextField onChange={this.onChange} id="outlined-basic" label="Name" variant="outlined" name="name" value={this.state.name}/>
            </div>
            <div>
              <TextField onChange={this.onChange} id="outlined-basic" label="Surname" variant="outlined" name="surname" value={this.state.surname}/>
            </div>
            <div>
              <TextField onChange={this.onChange} id="outlined-basic" label="Email" variant="outlined" name="email" value={this.state.email}/>
            </div>
            <div>
              <TextField onChange={this.onChange} id="outlined-basic" label="Phone" variant="outlined" name="phone" value={this.state.phone}/>
            </div>
            <div>
              <TextField onChange={this.onChange} id="outlined-basic" label="Company" variant="outlined" name="company" value={this.state.company}/>
            </div>
            <div >
              <TextField onChange={this.onChange} id="outlined-basic" label="Signature" variant="outlined" name="signature" value={this.state.signature}/>
            </div>
            <Modal/>
            <div>
            <Button onClick={() => {this.handleEntries(); this.onNextClick();}} variant="contained" >
              Urmatorul
            </Button>
            </div>
          </fieldset>
          </fieldset>
        </div>
      )
  }
}
export default withRouter(UserView)
