<<<<<<< Updated upstream
import Paper from '@material-ui/core/Paper'
import UserView from './tablet/UserView'

function Root() {
    return (
        <Paper>
            <UserView />
        </Paper>
=======
import Login from './login/Login'
import UserView from './userView/UserView'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

function Root() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/userView" component={UserView} />
            </Switch>
        </BrowserRouter>
>>>>>>> Stashed changes
    )
}

export default Root