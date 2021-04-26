import React, { useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import Login from './components/login/Login'
import UserView from './components/tablet/UserView'
import ResetPass from './components/resetPass/ResetPass'
import Register from './components/register/Register'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import EntriesList from './components/entriesList/EntriesList'
import theme from '../src/utils/Theme'
import {ThemeProvider} from '@material-ui/core/styles'
import axios from '../src/utils/Axios'

function Root() {
    const [isLogged, setIsLogged] = useState(false)

    const logIn = () => {
        setIsLogged(true)
    }

    const logOut = () => {
        setIsLogged(false)
    }

    useEffect(() => {
        axios.get('/isLogged').then(response => {
            if(Object.entries(response.data).length !== 0){
                logIn()
            }
        })
        .catch((error) => {
            console.log(error)
        })

    })

    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            {isLogged ? 
                <Switch>
                    <Route exact path="/" render={(props) => ( <Login {...props} logIn={() => { logIn() }}/> )} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/tablet" component={UserView} />
                    <Route exact path="/reset/:TOKEN/:ID" component={ResetPass}/>
                    <Route exact path="/entries" render={(props) => ( <EntriesList {...props} logOut={() => { logOut() }}/> )}/>
                </Switch> :
                <Switch>
                    <Route exact path="/" render={(props) => ( <Login {...props} logIn={() => { logIn() }}/> )}/>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/reset/:TOKEN/:ID" component={ResetPass}/> 
                    <Route exact path="/tablet" component={UserView} />
                </Switch> 
            } 
        </BrowserRouter>
        </ThemeProvider>
    )
}

ReactDOM.render(
    <React.StrictMode>
      <Root/>
    </React.StrictMode>,
    document.getElementById('root') 
  );

export default Root;