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
    signature : "",
    data: "",
    height: 0,
    width: 0
  }

  showDrawing = () =>{
    this.setState({
      data : localStorage.getItem("savedDrawing"),
      height : 200,
      width : 200
  })
  }

  onChange = event => {
    this.setState({ [event.target.name] : event.target.value})
  }

  handleEntries = () =>{
    let entry = {entries : {
      name : this.state.name,
      surname : this.state.surname,
      email : this.state.email,
      phone : this.state.phone,
      company : this.state.company,
      signature : this.state.signature,
    }}
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
      signature : "",
      height: 0,
      width: 0
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
             <Modal showDrawing={ this.showDrawing }/> 
         
            <CanvasDraw
              canvasHeight={this.state.height}
              canvasWidth={this.state.width}
              disabled={true}
              hideGrid={true}
              saveData={this.state.data}
              loadTimeOffset={10}
            /> 
         
          </div>
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
