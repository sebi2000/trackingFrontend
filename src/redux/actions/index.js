import axios from '../../utils/Axios'

export const auth = user => dispatch => axios.post('/auth', user)
.then(response => {
    if(response.data.userFound){
        dispatch({type: 'LOGIN', payload: response.data.userFound})
    }
    return response.data
})
.catch(err =>{
    console.error(err)
})

export const logout = () => dispatch => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
}

