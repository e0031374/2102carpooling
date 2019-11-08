

import axios from 'axios';
import { GET_BALANCE } from '../actions/types';

export const getBalance = (uname) => dispatch => {
    axios
        .get(`/api/ewallet/${uname}`)
        .then(res => {
                console.log(res.data)
                dispatch({
                    type: GET_BALANCE,
                    payload: res.data.obj
                })
            console.log(res.data)
        })
};

export const setBalance = (formState) => dispatch => {
    axios
        .post(`/api/ewallet`, formState)
        //.then(res => {
        //        dispatch({
        //            type: GET_MEMBERS,
        //            payload: res.data
        //        }p:
    //
        //    console.log(res.data)
        //})
};
