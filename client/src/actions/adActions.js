
import axios from 'axios';
import { GET_ADS, ADS_LOADING,
    } from '../actions/types';

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
