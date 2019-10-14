
import { DRIVER_JOBS_LOADING, GET_DRIVER_JOBS,
    BID_AVAILABLE_JOBS } from '../actions/types';
const initialState = {
    jobs: [],
    loading: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_DRIVER_JOBS:
            return {
                ...state,
                jobs: action.payload.jobs,
                loading: false
            };
        case DRIVER_JOBS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state
    }
}
