
import axios from 'axios';
import { GET_DRIVER_JOBS, DRIVER_JOBS_LOADING,
    BID_AVAILABLE_JOBS, ADD_INSURANCE, 
    GET_CARS, GET_INSURANCE, GET_INSURANCE_COMPANIES } from '../actions/types';

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
        .post(`/api/jobs/drivers/`, formState)
        .then(res => {
                dispatch({
                    type: GET_CARS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const getCars = (uname) => dispatch => {
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/jobs/drivers/cars/${uname}`)
        .then(res => {
                dispatch({
                    type: GET_CARS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const addCars = (formState) => dispatch => {
    axios
        //.post(`/api/accounts/`, formState)
        .post(`/api/jobs/drivers/cars/`, formState)
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
