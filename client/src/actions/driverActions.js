
import axios from 'axios';
import { GET_DRIVER_JOBS, DRIVER_JOBS_LOADING,
    BID_AVAILABLE_JOBS } from '../actions/types';

export const getDriverJobs = (uname) => dispatch => {
    dispatch(driverJobsLoading());
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/jobs/drivers/${uname}`)
        .then(res => {
                dispatch({
                    type: GET_DRIVER_JOBS,
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

export const driverJobsLoading = () => {
    return {
        type: DRIVER_JOBS_LOADING,
    };
};
