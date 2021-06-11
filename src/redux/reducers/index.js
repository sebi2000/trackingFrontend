const initialState = {user: "", isLogged: false}
export default (state=initialState, action) => {
    switch(action.type){
        case 'LOGIN':{
            return {
                ...state,
                user : action.payload,
                isLogged: true
           }
        }
        case 'LOGOUT':{
            return {
                ...state,
                user : '',
                isLogged: false
           }
        }

        default: return state  
    }
    
}