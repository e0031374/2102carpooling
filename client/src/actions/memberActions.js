
import axios from 'axios';
import { GET_MEMBERS, GET_FEEDBACK } from '../actions/types';

export const getMembers = () => dispatch => {
    axios
        .get(`/api/accounts`)
        .then(res => {
                dispatch({
                    type: GET_MEMBERS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const sendFeedback = (formState) => dispatch => {
    axios
        .post(`/api/members`, formState)
        //.then(res => {
        //        dispatch({
        //            type: GET_MEMBERS,
        //            payload: res.data
        //        })
        //    console.log(res.data)
        //})
};
