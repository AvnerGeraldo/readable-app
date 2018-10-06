//Action
import { LOGIN_PROCCESS, LOGIN_FAIL, LOGOUT } from '../actions/Login'

//Initial State
const initialState = {
    isLogged: false,
    authorLogged: ''
}

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case LOGIN_PROCCESS:
            //If author is not filled
            if (!payload.author) {
                return {
                    ...state,
                    isLogged: false,
                    authorLogged: ''
                }
            }

            //Return the new State
            return {
                ...state,
                isLogged: true,
                authorLogged: payload.author
            }
            break;
        case LOGIN_FAIL:
            return {
                ...state,
                isLogged: false,
                authorLogged: '',
                msmError: payload.error || ''
            }
            break;
        case LOGOUT:
            return {
                ...state,
                isLogged: false,
                authorLogged: ''
            }
            break;
        default:
            return state
    }
}