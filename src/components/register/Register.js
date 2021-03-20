import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../../utils/Axios'
import CONSTANTS from '../../utils/Constants'
import Header from '../common/Header'
import theme from '../../utils/Theme'

class Register extends React.Component {

    state = {
        name : "",
        surname : "",
        email : "",
        phone : "",
        password: ""
    }

    handleRegister = () => {
        let user = this.state
        axios.post('/users', user).then(response =>{
            console.log(response)
        })
        this.props.history.push("/")
    }

    onChange = event =>{
        this.setState({ [event.target.name] : event.target.value })
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
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
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={ this.onChange }
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="surname"
                            label="Prenume"
                            type="name"
                            id="surname"
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
            </ThemeProvider>
        )
    }
}

export default Register