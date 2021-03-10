import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login/Login'
import UserView from './components/tablet/UserView'
import ResetPass from './components/resetPass/ResetPass'
import Register from './components/register/Register'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import EntriesList from './components/entriesList/EntriesList'

function Root() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/tablet" component={UserView} />
                <Route exact path="/resetPass" component={ResetPass}/>
                <Route exact path="/entriesList" component={EntriesList}/>
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <React.StrictMode>
      <Root/>
    </React.StrictMode>,
    document.getElementById('root')
  );

export default Root;