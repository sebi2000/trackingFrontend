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
import store from './redux/store/store'
import {useHistory} from 'react-router'
import { Provider } from 'react-redux'

function Root() {
    const [isLogged, setIsLogged] = useState('')
    
    const logIn = () => {
        let role = store.getState().user.role
        setIsLogged(role)
    }

    const logOut = () => {
        setIsLogged('')
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
        console.log("GETSTATE: ", store.getState().user.role)
    })

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
            <BrowserRouter>
                {console.log("Route: ", isLogged)}
                {isLogged === 'user' ?

                    <Switch>
                        <Route exact path="/" render={(props) => ( <Login {...props} logIn={() => { logIn() }}/> )} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/tablet" component={UserView} />
                        <Route exact path="/reset/:TOKEN/:ID" component={ResetPass}/>
                        <Route exact path="/entries" render={(props) => ( <EntriesList {...props} logOut={() => { logOut() }}/> )}/>
                    </Switch> 
                    :
                isLogged === 'super' ?
                    <Switch>
                        <Route exact path="/" render={(props) => ( <Login {...props} logIn={() => { logIn() }}/> )}/>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/reset/:TOKEN/:ID" component={ResetPass}/> 
                    </Switch> 
                    :
                    <Switch>
                        <Route exact path="/" render={(props) => ( <Login {...props} logIn={() => { logIn() }}/> )} />
                        <Route exact path="/tablet" component={UserView} />
                        <Route exact path="/reset/:TOKEN/:ID" component={ResetPass}/>
                        {/* <Redirect to="/" ></Redirect> */}
                    </Switch>
                    
                } 
            </BrowserRouter>
            </ThemeProvider>
        </Provider>
    )
}

ReactDOM.render(
    <React.StrictMode>
      <Root/>
    </React.StrictMode>,
    document.getElementById('root') 
  );

export default Root;