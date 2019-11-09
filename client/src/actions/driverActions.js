
import axios from 'axios';
import { GET_DRIVER_JOBS, DRIVER_JOBS_LOADING, GET_CONFIRM_BID, GET_AREAS,
    BID_AVAILABLE_JOBS, ADD_INSURANCE, 
    GET_CARS, GET_INSURANCE, GET_INSURANCE_COMPANIES } from '../actions/types';

export const getAreas = () => dispatch => {
    axios
        .get(`/api/bid/areas/all`)
        .then(res => {
                dispatch({
                    type: GET_AREAS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const getCar = (uname) => dispatch => {
    axios
        .get(`/api/drivers/car/${uname}`)
        .then(res => {
                dispatch({
                    type: GET_CARS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const addCar = (formState) => dispatch => {
    axios
        .post(`/api/drivers/car`, formState)
        //.then( dispatch(getCar()) )
        //.get(`/api/bid/drivers/confirm/${uname}`)
        //.then(res => {
        //        dispatch({
        //            type: GET_CONFIRM_BID,
        //            payload: res.data
        //        })
        //    console.log(res.data)
        //})
};

export const confirmBid = (formState) => dispatch => {
    axios
        .post(`/api/bid/drivers/confirm/`, formState)
        //.get(`/api/bid/drivers/confirm/${uname}`)
        .then(res => {
                dispatch({
                    type: GET_CONFIRM_BID,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const getConfirmBid = (uname) => dispatch => {
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/bid/drivers/confirm/${uname}`)
        .then(res => {
            //note with the GET_CONFIRM_BID, you are setting the state again
            //with the feedback to create a closed loop
            //so server needs tor etun somethin or local state will be overwritten
            //causing all soerts of probelms
                dispatch({
                    type: GET_CONFIRM_BID,
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

export const getDriverJobs = (uname) => dispatch => {
    dispatch(driverJobsLoading());
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/bid/drivers/all/${uname}`)
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

export const delDriverJob = (user, startDateTime) => dispatch => {
    dispatch(driverJobsLoading());
    axios
        .post(`/api/jobs/drivers/${user}/${startDateTime}`)
        .then(res => {
                dispatch({
                    type: GET_DRIVER_JOBS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const addDriverJob = (formState) => dispatch => {
    dispatch(driverJobsLoading());
    axios
        //.post(`/api/accounts/`, formState)
        .post(`/api/bid/drivers/`, formState)
        //.then(res => {
        //        dispatch({
        //            type: GET_DRIVER_JOBS,
        //            payload: res.data
        //        })
        //    console.log(res.data)
        //})
};

export const getCars = (uname) => dispatch => {
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/drivers/car/${uname}`)
        .then(res => {
                dispatch({
                    type: GET_CARS,
                    payload: res.data
                })
            console.log(res.data)
        })
};


export const getInsuranceCompanies = () => dispatch => {
    //dispatch(driverJobsLoading());
    axios
        .get(`/api/drivers/insurance/`)
        .then(res => {
                dispatch({
                    type: GET_INSURANCE_COMPANIES,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const getInsurance = (uname) => dispatch => {
    //dispatch(driverJobsLoading());
    axios
        .get(`/api/drivers/insurance/${uname}`)
        .then(res => {
                dispatch({
                    type: GET_INSURANCE,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const addInsurance = (formState) => dispatch => {
    //dispatch(getInsurance(formState.uname));
    axios
        //.post(`/api/accounts/`, formState)
        .post(`/api/drivers/insurance/`, formState)
        //.then(res => {
        //        dispatch({
        //            type: GET_INSURANCE,
        //            payload: res.data
        //        })
        //    console.log(res.data)
        //})
};
