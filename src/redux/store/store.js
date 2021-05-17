import { createStore, applyMiddleware } from 'redux'
import loginReducer from '../reducers/index'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, loginReducer)
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(persistedReducer, composedEnhancer)
export const persistor = persistStore(store)
