
import { GET_AVAILABLE_JOBS, PASSENGER_JOBS_LOADING, GET_WIN_BIDS,
    BID_AVAILABLE_JOBS } from '../actions/types';
const initialState = {
    jobs: [],
    loading: false,
    winbids: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_AVAILABLE_JOBS:
            return {
                ...state,
                jobs: action.payload.jobs,
                loading: false
            };
        case GET_WIN_BIDS:
            return {
                ...state,
                winbids: action.payload.bids,
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
