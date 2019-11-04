import {combineReducers} from 'redux';
import jobReducer from './jobReducer';
import loginReducer from './loginReducer';
import passengerReducer from './passengerReducer';
import driverReducer from './driverReducer';
//import authReducer from ...

///meeting place of reducers

export default combineReducers({
    //item: itemReducer,
    job: jobReducer,
    passenger: passengerReducer,
    driver: driverReducer,
    login: loginReducer,
    //auth: authReducer
});
