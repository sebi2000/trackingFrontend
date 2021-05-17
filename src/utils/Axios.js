import axios from 'axios'
import CONSTANTS from './Constants'

const instance =  axios.create ({
    baseURL: CONSTANTS.BACKEND_URL,
    withCredentials: true
})

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = 'Bearer ' + token
    return config
}, error => {
    Promise.reject(error)
})

export default instance