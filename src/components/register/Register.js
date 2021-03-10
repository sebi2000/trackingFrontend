import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../../utils/Axios'
import CONSTANTS from '../../utils/Constants'

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
    }

    onChange = event =>{
        this.setState({ [event.target.name] : event.target.value })
    }

    render() {
        return (
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
                            label="Name"
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
                            label="Surname"
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
                            label="Email Address"
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
                            label="Phone Number"
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
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={ this.onChange }
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={ this.handleRegister }
                        >
                            {CONSTANTS.REGISTER}
                        </Button>

                        <Grid container>
                            <Grid item>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default Register