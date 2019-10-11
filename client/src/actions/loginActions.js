import axios from 'axios';
import { ADD_USER, GET_USER, LOGIN_VALIDATION, LOGIN_ERROR,
    USER_SETTINGS, GET_SETTINGS, ADD_PASSENGER } from '../actions/types';

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

export const getUser = () => dispatch => {
    return {
        type: GET_USER,
    };
};
