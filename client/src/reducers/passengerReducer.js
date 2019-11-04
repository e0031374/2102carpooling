
import { GET_AVAILABLE_JOBS, PASSENGER_JOBS_LOADING,
    BID_AVAILABLE_JOBS } from '../actions/types';
const initialState = {
    jobs: [],
    loading: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_AVAILABLE_JOBS:
            return {
                ...state,
                jobs: action.payload.jobs,
                loading: false
            };
        case PASSENGER_JOBS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state
    }
}
