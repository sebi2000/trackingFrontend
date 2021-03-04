import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  UserView from './components/tablet/UserView';
import FormAdmin from './components/formAdmin/FormAdmin'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <UserView/>
    {/*<FormAdmin/>*/}
  </React.StrictMode>,
  document.getElementById('root')
);

