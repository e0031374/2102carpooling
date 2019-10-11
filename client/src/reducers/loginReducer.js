import { USER_SETTINGS, LOGIN_VALIDATION, LOGIN_ERROR, GET_USER, 
    GET_SETTINGS} from '../actions/types';

const initState = {
    authError: null,
    isLoggedIn: false,
    user: "",
    isPassenger: false,
    isDriver: false,
    license: "",
    isAd: false,

}


export default function(state = initState, action) {
    switch(action.type) {
        case LOGIN_ERROR:
            return {
                ...state,
                authError: 'Login failed'
            };
        case LOGIN_VALIDATION:
            console.log(action.payload.uname)
            console.log(state)
            return {
                ...state,
                authError: null,
                user: action.payload.uname,
                isLoggedIn: action.payload.success,
            };
        case GET_USER:
            return {
                ...state,
            };
        case GET_SETTINGS:
            return {
                ...state,
                isPassenger: action.payload.ispassenger,
                isDriver: action.payload.isdriver,
                isAd: action.payload.isad,
            };
        default:
            return state
    }
}
