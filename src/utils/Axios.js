import axios from 'axios'
import * as CONSTANTS from './constants'

export default axios.create ({
    baseURL: CONSTANTS.BACKEND_URL,
    withCredentials: true
})