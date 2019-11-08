import { GET_BALANCE , GET_FEEDBACK,
    } from '../actions/types';

const initialState = {
    balance: 0,
    ccnum: "0",
    loading: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_BALANCE:
            return {
                ...state,
                balance: parseFloat(action.payload.balance),
                ccnum: parseFloat(action.payload.ccnum),
            };
        //case GET_AVAILABLE_JOBS:
        //    return {
        //        ...state,
        //        jobs: action.payload.jobs,
        //        loading: false
        //    };
        //case PASSENGER_JOBS_LOADING:
        //    return {
        //        ...state,
        //        loading: true
        //    };
        default:
            return state
    }
}
