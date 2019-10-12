import {combineReducers} from 'redux';
import jobReducer from './jobReducer';
import loginReducer from './loginReducer';
import passengerReducer from './passengerReducer';
//import authReducer from ...

///meeting place of reducers

export default combineReducers({
    //item: itemReducer,
    job: jobReducer,
    passenger: passengerReducer,
    login: loginReducer,
    //auth: authReducer
});
