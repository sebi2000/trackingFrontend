import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from '../../utils/Axios'
import validator from 'validator'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import Navbar from '../common/Navbar'
import Notifications from '../../utils/Notifications'
import { StatusCodes } from 'http-status-codes'
const RO = require('../../utils/language/RO.json')

class Register extends React.Component {

    state = {
        name : "",
        surname : "",
        email : "",
        phone : "",
        password:"",
        role: "",
        fields: {
            errorName: false,
            errorSurname: false,
            errorEmail: false,
            errorCompany: false,
            errorPhone: false,
            errorRole: false
        }
    }

handleRegister = () => {

    let isOk = true

    let auxFields = {
      errorName: false,
      errorSurname: false,
      errorEmail: false,
      errorCompany: false,
      errorPhone: false,
      errorRole: false
    }

    Object.entries(this.state.fields).forEach(([key, value]) =>{
      switch(key){
        case 'errorSurname':
          if(!validator.isAlpha(this.state.surname)){
              isOk=false
              auxFields.errorSurname = true
            }
        break
        case 'errorName':
          if(!validator.isAlpha(this.state.name)){
              isOk=false
              auxFields.errorName = true
            }
        break
        case 'errorEmail':
          if(!validator.isEmail(this.state.email)){
              isOk=false
              auxFields.errorEmail= true
            }
        break
        case 'errorPhone':
          if(!validator.isMobilePhone(this.state.phone)){
              isOk=false
              auxFields.errorPhone= true
            }
        break
        case 'errorRole':
          if(validator.isEmpty(this.state.role)){
              isOk=false
              auxFields.errorRole= true
            }
        break
      }
    })
    this.setState({fields: auxFields})

    if(isOk)
        {
            let user = {
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                phone: this.state.phone,
                role: this.state.role,
                password: this.state.password
            }
            axios.post('/users', {user}).then(response =>{
                console.log(response)
                if(response.data.user)
                    Notifications.success(RO.notifications.ADMIN_REGISTRATION)
                else if(response.data.status.errors && response.data.code === StatusCodes.UNPROCESSABLE_ENTITY)
                    Notifications.error(RO.notifications.VALIDATION_ERROR)
            }).catch(err => {
                console.log(err)
                Notifications.error(RO.notifications.SERVER_ERROR)
            })

            this.setState({
                name : "",
                surname : "",
                email : "",
                phone : "",
                password:"",
                role: ""
            })
        }
        else Notifications.error(RO.notifications.ADMIN_FAIL_REGISTRATION)

    }

    onChange = event =>{
        this.setState({ [event.target.name] : event.target.value })
    }

    render() {
        return (
            <div>
                 <Navbar showLogoutButton={true}/>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5">
                        {RO.register}
                    </Typography>

                    <form noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label={RO.entries.surname}
                            name="surname"
                            autoComplete="surname"
                            autoFocus
                            onChange={ this.onChange }
                            value={this.state.surname}
                            error={this.state.fields.errorSurname}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label={RO.entries.name}
                            type="name"
                            id="name"
                            autoComplete="name"
                            onChange={ this.onChange }
                            value={this.state.name}
                            error={this.state.fields.errorName}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={RO.entries.email}
                            name="email"
                            autoComplete="email"
                            onChange={ this.onChange }
                            value={this.state.email}
                            error={this.state.fields.errorEmail}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label={RO.entries.phone}
                            id="phone"
                            autoComplete="phone"
                            onChange={ this.onChange }
                            value={this.state.phone}
                            error={this.state.fields.errorPhone}
                        />
                        <FormControl variant="outlined" fullWidth required margin="normal" error={this.state.fields.errorRole}>
                            <InputLabel id="demo-simple-select-outlined-label">Rol</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.role}
                            onChange={this.onChange}
                            name="role"
                            label="Age"
                            >
                            <MenuItem value={'super'}>Super Admin</MenuItem>
                            <MenuItem value={'user'}>User</MenuItem>
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="primary" fullWidth onClick={ this.handleRegister }> {RO.register}</Button>

                        <Grid container>
                            <Grid item>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            </div>
          )
    }
}

export default Register