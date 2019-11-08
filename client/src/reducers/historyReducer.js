import { GET_HISTORY , GET_FEEDBACK,
    } from '../actions/types';

const initialState = {
    history: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_HISTORY:
            return {
                ...state,
                history: action.payload.history,
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
