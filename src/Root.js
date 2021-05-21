import React, { useEffect } from 'react'
import Login from './components/login/Login'
import UserView from './components/tablet/UserView'
import ResetPass from './components/resetPass/ResetPass'
import Register from './components/register/Register'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import EntriesList from './components/entriesList/EntriesList'
import theme from '../src/utils/Theme'
import {ThemeProvider} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import axios from './utils/Axios'

function Root(props) {

    const [isLogged, setIsLogged] = React.useState(false)

   useEffect(() => {
       axios.get('/isLogged').then(resp => {
           setIsLogged(true)
       })
   })
   
    return (
            <ThemeProvider theme={theme}>
            <BrowserRouter>
                {props.user.role === 'user' ?
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/entries" component={EntriesList}/>
                        <Route exact path="/tablet" component={UserView} />
                        <Route exact path="/reset/:TOKEN/:ID" component={ResetPass}/>
                        <Redirect to="/entries" />
                    </Switch> 
                    :
                props.user.role === 'super' ?
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/reset/:TOKEN/:ID" component={ResetPass}/> 
                        <Redirect to="/register" />
                    </Switch> 
                    :
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/tablet" component={UserView} />
                        <Route exact path="/reset/:TOKEN/:ID" component={ResetPass}/>
                        <Redirect to="/" />
                    </Switch>
                    
                } 
            </BrowserRouter>
            </ThemeProvider>
    )
}

const mapStateToProps = state => {
        return {user: state.user}
}
   
export default connect(mapStateToProps)(Root)