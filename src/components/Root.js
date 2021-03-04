import Login from './login/Login'
import UserView from './tablet/UserView'
import ResetPass from './resetPass/ResetPass'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import EntriesList from './entriesList/EntriesList'

function Root() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/tablet" component={UserView} />
                <Route exact path="/resetPass" component={ResetPass}/>
                <Route exact path="/entriesList" component={EntriesList}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Root