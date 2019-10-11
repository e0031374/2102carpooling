import {combineReducers} from 'redux';
import jobReducer from './jobReducer';
import loginReducer from './loginReducer';
//import authReducer from ...

///meeting place of reducers

export default combineReducers({
    //item: itemReducer,
    job: jobReducer,
    login: loginReducer,
    //auth: authReducer
});
