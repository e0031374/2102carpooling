import axios from 'axios';
import { GET_AVAILABLE_JOBS, PASSENGER_JOBS_LOADING, GET_WIN_BIDS,
    BID_AVAILABLE_JOBS } from '../actions/types';

export const getAvailableJobs = (uname) => dispatch => {
    console.log("here")
    dispatch(passengerJobsLoading());
    axios
        //.post(`/api/accounts/`, formState)
        //.get(`/api/jobs/passengers/${uname}`)
        .get(`/api/jobs/passengers`)
        .then(res => {
                dispatch({
                    type: GET_AVAILABLE_JOBS,
                    payload: res.data
                })
            console.log(res.data)
        })
        //.catch( res => 
        //    dispatch({
        //        type: LOGIN_ERROR,
        //    })
        //)
};

export const getWinBids = (uname) => dispatch => {
    console.log("here")
    dispatch(passengerJobsLoading());
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/bid/passengers/${uname}`)
        //.get(`/api/jobs/passengers`)
        .then(res => {
                dispatch({
                    type: GET_WIN_BIDS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const passengerJobsLoading = () => {
    return {
        type: PASSENGER_JOBS_LOADING,
    };
};

export const submitBid = (formState) => dispatch => {
    axios
        .post(`/api/bid/passengers`, formState)
        //.get(`/api/jobs/passengers/${uname}`)
        //.get(`/api/jobs/passengers`)
        //.then(res => {
        //        dispatch({
        //            type: GET_AVAILABLE_JOBS,
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
