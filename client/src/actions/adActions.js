
import axios from 'axios';
import { GET_ADS, ADS_LOADING, GET_FEATURE_ONE, GET_FEATURE_TWO, 
    GET_FEATURE_THREE, GET_TOP_DRIVERS,
    } from '../actions/types';

export const getTops = () => dispatch => {
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/ads/topdrivers`)
        .then(res => {
                dispatch({
                    type: GET_TOP_DRIVERS,
                    payload: res.data
                })
            console.log(res.data)
        })
};
export const getFeatureOne = () => dispatch => {
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/ads/feature1`)
        .then(res => {
                dispatch({
                    type: GET_FEATURE_ONE,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const getFeatureTwo = () => dispatch => {
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/ads/feature2`)
        .then(res => {
                dispatch({
                    type: GET_FEATURE_TWO,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const getFeatureThree = () => dispatch => {
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/ads/feature3`)
        .then(res => {
                dispatch({
                    type: GET_FEATURE_THREE,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const getAds = () => dispatch => {
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/ads`)
        .then(res => {
                dispatch({
                    type: GET_ADS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const postAd = (formState) => dispatch => {
    console.log(formState);
    axios
        .post(`/api/ads/`, formState)
        //.get(`/api/ads`)
        .then(res => {
                dispatch({
                    type: GET_ADS,
                    payload: res.data
                })
            console.log(res.data)
        })
};

export const adsLoading = () => {
    return {
        type: ADS_LOADING,
    };
};
