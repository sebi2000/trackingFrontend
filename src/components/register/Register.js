import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from '../../utils/Axios'
import Header from '../common/Header'
import validator from 'validator'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import {logout} from '../../redux/actions/index'
const RO = require('../../utils/language/RO.json')
toast.configure()

class Register extends React.Component {

    state = {
        name : "",
        surname : "",
        email : "",
        phone : "",
        password:"",
        role: ""
    }

    handleRegister = () => {

        let surnameIsValid = validator.isAlpha(this.state.surname)
        let nameIsValid = validator.isAlpha(this.state.name)
        let emailIsValid = validator.isEmail(this.state.email)
        let phoneIsValid = validator.isNumeric(this.state.phone)
        let roleIsValid = !validator.isEmpty(this.state.role)

        if(surnameIsValid && nameIsValid && emailIsValid && phoneIsValid && roleIsValid)
        {
            let user = {user : this.state}
            axios.post('/users', user).then(response =>{
                console.log(response)
            })
            toast.success('Ai inregistrat utilizatorul cu succes')
            this.setState({
                name : "",
                surname : "",
                email : "",
                phone : "",
                password:"",
                role: ""
            })
        }
        else toast.error('Introdu datele in mod corespunzator')

    }

    onChange = event =>{
        this.setState({ [event.target.name] : event.target.value })
    }

    onLogOut = () => {
        this.props.logout()
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                 <Header/>
                 <Button  onClick={this.onLogOut}> {RO.logout} </Button>
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
                        />
                        
                        <FormControl variant="outlined" fullWidth required margin="normal">
                            <InputLabel id="demo-simple-select-outlined-label">Rol</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.role}
                            onChange={this.onChange}
                            name="role"
                            label="Age"
                            >
                            {/* <MenuItem value=""></MenuItem> */}
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

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logout())
    }
  }

export default connect(null, mapDispatchToProps)(Register)