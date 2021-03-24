import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from '../../utils/Axios'
import CONSTANTS from '../../utils/Constants'
import Header from '../common/Header'
import theme from '../../utils/Theme'
import validator from 'validator'

class Register extends React.Component {

    state = {
        name : "",
        surname : "",
        email : "",
        phone : "",
        password: ""
    }

    handleRegister = () => {

        let surnameIsValid = validator.isAlpha(this.state.surname)
        let nameIsValid = validator.isAlpha(this.state.name)
        let emailIsValid = validator.isEmail(this.state.email)
        let phoneIsValid = validator.isNumeric(this.state.phone)
        let passwordIsValid = !validator.isEmpty(this.state.password)

        if(surnameIsValid && nameIsValid && emailIsValid && phoneIsValid && passwordIsValid)
        {
            let user = {user : this.state}
            axios.post('/users', user).then(response =>{
                console.log(response)
            })
            this.props.history.push("/")
        }
        else alert('Introdu datele in mod corespunzator')
    }

    onChange = event =>{
        this.setState({ [event.target.name] : event.target.value })
    }

    render() {
        return (
            <div>
                 <Header/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5">
                        {CONSTANTS.REGISTER}
                    </Typography>

                    <form noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nume"
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
                            name="name"
                            label="Prenume"
                            type="name"
                            id="name"
                            autoComplete="name"
                            onChange={ this.onChange }
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresa de email"
                            name="email"
                            autoComplete="email"
                            onChange={ this.onChange }
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Nr. Telefon"
                            id="phone"
                            autoComplete="phone"
                            onChange={ this.onChange }
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Parola"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={ this.onChange }
                        />

                        <Button variant="contained" color="primary" fullWidth onClick={ this.handleRegister }> {CONSTANTS.REGISTER}</Button>

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