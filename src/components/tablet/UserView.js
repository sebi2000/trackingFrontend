import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Header from '../common/Header'
import Modal from '../common/Modal'
import CanvasDraw from 'react-canvas-draw'
import axios from '../../utils/Axios'
import { withRouter } from 'react-router-dom'

class UserView extends React.Component{

  state ={
    name : "",
    surname : "",
    email : "",
    phone : "",
    company : "",
    signature : "",
    show: false
  }

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
    let entry = {entries : {
      name : this.state.name,
      surname : this.state.surname,
      email : this.state.email,
      phone : this.state.phone,
      company : this.state.company,
      signature : this.state.signature,
      date: new Date()
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
      show: false
  })
  }

  render(){
    return(
           <div>
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
            <Button onClick={() => {this.handleEntries(); this.onNextClick();}}  >
              Urmatorul
            </Button>
            </div>
          </fieldset>
          </div>
      )
  }
}
export default withRouter(UserView)
