import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Header from '../common/Header'
import Modal from '../common/Modal'
import CanvasDraw from 'react-canvas-draw'
import axios from '../../utils/Axios'
import { withRouter } from 'react-router-dom'
import CONSTANTS from '../../utils/Constants'
import validator from 'validator'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const RO = require('../../utils/language/RO.json')
toast.configure()

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
    
    let surnameIsValid = validator.isAlpha(this.state.surname)
    let nameIsValid = validator.isAlpha(this.state.name)
    let emailIsValid = validator.isEmail(this.state.email)
    let phoneIsValid = validator.isNumeric(this.state.phone)
    let companyIsValid = !validator.isEmpty(this.state.company)
    let signatureIsValid = !validator.isEmpty(this.state.signature)
    
    if(surnameIsValid && nameIsValid && emailIsValid && phoneIsValid && companyIsValid && signatureIsValid)
    {
      let entry = {entries : {
        name : this.state.name,
        surname : this.state.surname,
        email : this.state.email,
        phone : this.state.phone,
        company : this.state.company,
        signature : this.state.signature,
        date: new Date()
      }}
      console.log(entry)
      axios.post("/entries", entry).then(response => {
          console.log(response.data)
          toast.success(RO.notifications.ENTRY_REGISTRATION)
      })
    }
    else toast.error(RO.notifications.ENTRY_ERROR)
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
<<<<<<< HEAD
            <TextField  variant="outlined" margin="normal" required fullWidth id="name" label={RO.entries.name} name="surname" autoComplete="name" autoFocus onChange={ this.onChange }  value={this.state.surname}/>
            </div>
            <div>
            <TextField  variant="outlined" margin="normal" required fullWidth id="surname" label={RO.entries.surname} name="name" autoComplete="surname"  onChange={ this.onChange }  value={this.state.name}/>
=======
            <TextField  variant="outlined" margin="normal" required fullWidth id="surname" label="Nume" name="surname" autoComplete="surname" autoFocus onChange={ this.onChange }  value={this.state.surname}/>
            </div>
            <div>
            <TextField  variant="outlined" margin="normal" required fullWidth id="name" label="Prenume" name="name" autoComplete="name"  onChange={ this.onChange }  value={this.state.name}/>
>>>>>>> 4815846 (feat: add actions entries table)
            </div>
            <div>
              <TextField  variant="outlined" margin="normal" required fullWidth id="email" label={RO.entries.email} name="email" autoComplete="email"  onChange={ this.onChange }  value={this.state.email}/>
            </div>
            <div>
            <TextField  variant="outlined" margin="normal" required fullWidth id="phone" label={RO.entries.phone} name="phone" autoComplete="phone"  onChange={ this.onChange }  value={this.state.phone}/>
            </div>
            <div>
            <TextField  variant="outlined" margin="normal" required fullWidth id="company" label={RO.entries.company} name="company" autoComplete="company"  onChange={ this.onChange }  value={this.state.company}/>
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
              {RO.next}
            </Button>
            </div>
          </fieldset>
          </div>
      )
  }
}
export default withRouter(UserView)
