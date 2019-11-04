import axios from 'axios';
import { GET_AVAILABLE_JOBS, PASSENGER_JOBS_LOADING,
    BID_AVAILABLE_JOBS } from '../actions/types';

export const getAvailableJobs = (uname) => dispatch => {
    console.log("here")
    dispatch(passengerJobsLoading());
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/jobs/passengers/${uname}`)
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

export const passengerJobsLoading = () => {
    return {
        type: PASSENGER_JOBS_LOADING,
    };
};
