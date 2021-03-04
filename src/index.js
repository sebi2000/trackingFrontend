import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import  UserView from './components/tablet/UserView';
import Root from './components/Root';
//import FormAdmin from './components/formAdmin/FormAdmin'


ReactDOM.render(
  <React.StrictMode>
    {/*<FormAdmin/>*/}
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);

