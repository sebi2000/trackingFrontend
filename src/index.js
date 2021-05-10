import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import {store, persistor} from './redux/store/store'

ReactDOM.render(
    <React.StrictMode>
       <Provider store={store}> 
            <PersistGate  loading={null} persistor={persistor}>
                <Root/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root') 
  );

export default Root;