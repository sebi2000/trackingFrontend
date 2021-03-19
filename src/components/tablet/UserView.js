import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import Header from '../common/Header'
import Modal from '../common/Modal'
import CanvasDraw from 'react-canvas-draw'
import axios from '../../utils/Axios'
import { withRouter } from 'react-router-dom'
import CONSTANTS from '../../utils/Constants'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from '../../utils/Theme'
//import Paper from '@material-ui/core/Paper'

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
      <ThemeProvider theme={theme}>

            <Header/>
          <fieldset>
            <div>
            <TextField  variant="outlined" margin="normal" required fullWidth id="name" label="Nume" name="name" autoComplete="name" autoFocus onChange={ this.onChange }  value={this.state.name}/>
            </div>
            <div>
            <TextField  variant="outlined" margin="normal" required fullWidth id="surname" label="Prenume" name="surname" autoComplete="surname"  onChange={ this.onChange }  value={this.state.surname}/>
            </div>
            <div>
              <TextField  variant="outlined" margin="normal" required fullWidth id="email" label="Adresa de email" name="email" autoComplete="email"  onChange={ this.onChange }  value={this.state.email}/>
            </div>
            <div>
            <TextField  variant="outlined" margin="normal" required fullWidth id="phone" label="Telefon" name="phone" autoComplete="phone"  onChange={ this.onChange }  value={this.state.phone}/>
            </div>
            <div>
            <TextField  variant="outlined" margin="normal" required fullWidth id="company" label="Companie" name="company" autoComplete="company"  onChange={ this.onChange }  value={this.state.company}/>
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
            <Button variant="contained" color="primary" onClick={() => {this.handleEntries(); this.onNextClick();}}  >
              Urmatorul
            </Button>
            </div>
          </fieldset>
      </ThemeProvider>
      )
  }
}
export default withRouter(UserView)
