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
const RO = require('../../utils/language/RO.json')

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
            })
            Notifications.success(RO.notifications.ADMIN_REGISTRATION)
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

export default Register