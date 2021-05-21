import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import {useParams} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import axios from '../../utils/Axios'
import {StatusCodes} from 'http-status-codes'
import { useHistory } from 'react-router'
import Notifications from '../../utils/Notifications'
const RO = require('../../utils/language/RO.json')

function ResetPass(){

    let { TOKEN, ID } = useParams();
    const [expired, setExpired] = useState(false)
    const [firstPass, setFirstPass] = useState('')
    const [secondPass, setSecondPass] = useState('')
    const history = useHistory()
    
    useEffect(() => {
        checkToken()
    }, [TOKEN])

    const checkToken = () =>{
        axios.get(`reset/${TOKEN}`).then(resp => {
            if(resp.data !== StatusCodes.OK){
                setExpired(true)
            }
        })
    }

    const onChange = event =>{
        if(event.target.name === 'firstPass')
            setFirstPass(event.target.value)
        else setSecondPass(event.target.value)
    }

    const handleReset = () =>{
        if(firstPass !== secondPass)
            Notifications.error(RO.notifications.IDENTICAL_PASS)
        else{
            Notifications.success(RO.notifications.SUCCESS_PASS)
            let password = firstPass
            axios.put(`/users/${ID}`, {password}).then(resp => {
                history.push('/')
            })
        }
    }

    return(
        !expired? 
            <div>
                <Header/>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5">
                    {RO.newPass}
                    </Typography>
                    <form noValidate>
                    <TextField  
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label={RO.auth.new_password}
                        name="firstPass"
                        autoComplete="password"
                        type="password"
                        autoFocus
                        onChange={ onChange }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="secondPass"
                        label={RO.auth.new_password}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={ onChange }
                    />

                    <Button fullWidth onClick={handleReset}>{RO.reset}</Button>
                    </form>
                </div>
                </Container> 
            </div>
        : 
            <div>
                <Header/>
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5">
                        {RO.linkExpired}
                    </Typography>
                </Container> 
            </div>
        
    )
}

export default ResetPass