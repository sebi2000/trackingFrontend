import axios from 'axios'
import CONSTANTS from './Constants'

export default axios.create ({
    baseURL: CONSTANTS.BACKEND_URL,
    withCredentials: true
})