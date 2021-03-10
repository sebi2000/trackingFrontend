import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../../utils/Axios'

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

    onNameSearchChange = event =>{
        this.setState({name : event.target.value})
        console.log(this.state.name)
    }
    
    onSurnameSearchChange = event =>{
        this.setState({surname : event.target.value})
        console.log(this.state.surname)
    }

    onEmailSearchChange = event =>{
        this.setState({email : event.target.value})
        console.log(this.state.email)
    }

    onPhoneSearchChange = event =>{
        this.setState({phone : event.target.value})
        console.log(this.state.phone)
    }

    onPasswordSearchChange = event =>{
        this.setState({password : event.target.value})
        console.log(this.state.password)
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div /*className={classes.paper}*/>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>

                    <form /*className={classes.form}*/ noValidate>
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
                            onChange={ this.onNameSearchChange }
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
                            onChange={ this.onSurnameSearchChange }
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
                            onChange={ this.onEmailSearchChange }
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
                            onChange={ this.onPhoneSearchChange }
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
                            onChange={ this.onPasswordSearchChange }
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={ this.handleRegister }
                        /*className={classes.submit}*/
                        >
                            Register
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