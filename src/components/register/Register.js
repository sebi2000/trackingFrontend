import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

class Register extends React.Component {
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
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
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