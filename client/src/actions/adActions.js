
import axios from 'axios';
import { GET_ADS, ADS_LOADING,
    } from '../actions/types';

export const getAds = () => dispatch => {
    dispatch(passengerJobsLoading());
    axios
        //.post(`/api/accounts/`, formState)
        .get(`/api/jobs/ads`)
        .then(res => {
                dispatch({
                    type: GET_ADS,
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

export const adsLoading = () => {
    return {
        type: ADS_LOADING,
    };
};
