import {combineReducers} from 'redux';
import jobReducer from './jobReducer';
import loginReducer from './loginReducer';
import adReducer from './adReducer';
import passengerReducer from './passengerReducer';
import driverReducer from './driverReducer';
import memberReducer from './memberReducer';
import ewalletReducer from './ewalletReducer';
import historyReducer from './historyReducer';
//import authReducer from ...

///meeting place of reducers

export default combineReducers({
    //item: itemReducer,
    job: jobReducer,
    passenger: passengerReducer,
    driver: driverReducer,
    login: loginReducer,
    member: memberReducer,
    ewallet: ewalletReducer,
    history: historyReducer,
    ads: adReducer,
    //auth: authReducer
});
