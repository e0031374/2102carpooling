import axios from 'axios';
import { ADD_USER, GET_USER, LOGIN_VALIDATION, LOGIN_ERROR, RERIEVE_PASS,
    USER_SETTINGS, GET_SETTINGS, ADD_PASSENGER, ADD_DRIVER, ADD_ADVERTIZER,
    RETRIEVE_PASS } from '../actions/types';

export const loginValidate = (state) => dispatch => {
    console.log("here")
    axios
        .get(`/api/accounts/${state.uname}/${state.pass}`)
        .then(res => {
                dispatch({
                    type: LOGIN_VALIDATION,
                    payload: res.data
                })
            console.log(res.data)
            //if (res.data.sucess) {
            //    console.log(res.data);
            //    dispatch({
            //        type: LOGIN_VALIDATION,
            //        payload: res.data
            //    });
            //} else {
            //    dispatch({
            //        type: LOGIN_ERROR,
            //    })
            //}
        })
        .catch( res => 
            dispatch({
                type: LOGIN_ERROR,
            })
        )
};

export const addAccount = (formState) => dispatch => {
    console.log("here")
    axios
        .post(`/api/accounts/`, formState)
        .then(res => {
                dispatch({
                    type: LOGIN_VALIDATION,
                    payload: res.data
                })
            console.log(res.data)
        })
        .catch( res => 
            dispatch({
                type: LOGIN_ERROR,
            })
        )
};

//i dont remember what this does anymore
export const userSettings = (formState) => dispatch => {
    axios
        .post(`/api/accounts/settings`, formState)
        .then(res => {
                dispatch({
                    type: USER_SETTINGS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

// gets all of a certain users settings
// isPassenger, isDriver, isAd
export const getSettings = (uname) => dispatch => {
    axios
        .get(`/api/settings/${uname}`)
        .then(res => {
                dispatch({
                    type: GET_SETTINGS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

//expects req.body.uname to be inserted in formState
export const addPassenger = (formState) => dispatch => {
    axios
        .post(`/api/settings/passengers`, formState)
        .then(res => {
                dispatch({
                    //fetch new settings
                    type: GET_SETTINGS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

//expects req.body.uname to be inserted in formState
//expects req.body.license to be inserted in formState
export const addDriver = (formState) => dispatch => {
    axios
        .post(`/api/settings/drivers`, formState)
        .then(res => {
                dispatch({
                    //fetch new settings
                    //should also fetch driver settings
                    //but one day i guess
                    type: GET_SETTINGS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

//expects req.body.uname to be inserted in formState
export const addAdvertizer = (formState) => dispatch => {
    axios
        .post(`/api/settings/advertizers`, formState)
        .then(res => {
                dispatch({
                    //fetch new settings
                    type: GET_SETTINGS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

//TODO
//expects req.body.uname to be inserted in formState
export const resetPass = (formState) => dispatch => {
    console.log("reset pass");
    axios
        .post(`/api/settings/resetpass`, formState)
        .then(res => {
                console.log(res.data);
                dispatch({
                    //fetch new settings
                    type: RETRIEVE_PASS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const retrievePass = (state) => dispatch => {
    console.log("hee")
    axios
        .get(`/api/accounts/`)
        .then(res => {
                dispatch({
                    type: RETRIEVE_PASS,
                    payload: res.data
                })
            console.log(res.data)
        })
        .catch( res => 
            dispatch({
                type: LOGIN_ERROR,
            })
        )
};

export const changePass = (formState) => dispatch => {
    console.log("here")
    axios
        .post(`/api/settings/changepass`, formState)
        //.then(res => {
        //        dispatch({
        //            type: LOGIN_VALIDATION,
        //            payload: res.data
        //        })
        //    console.log(res.data)
        //})
        //.catch( res => 
        //    dispatch({
        //        type: LOGIN_ERROR,
        //    })
        //)
};
