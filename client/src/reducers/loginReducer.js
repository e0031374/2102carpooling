import { USER_SETTINGS, LOGIN_VALIDATION, LOGIN_ERROR, GET_USER, 
    GET_SETTINGS, RETRIEVE_PASS} from '../actions/types';

const initState = {
    authError: null,
    isLoggedIn: false,
    user: "",
    isPassenger: false,
    isDriver: false,
    license: "",
    isAd: false,
    claimed: false,
    retPass: "",
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
        case RETRIEVE_PASS:
            console.log(action.payload.uname)
            console.log(state)
            return {
                ...state,
                //authError: null,
                //user: action.payload.uname,
                //isLoggedIn: action.payload.success,
                claimed: true,
                retPass: action.payload.pass,

            };
        default:
            return state
    }
}
