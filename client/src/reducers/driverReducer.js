
import { DRIVER_JOBS_LOADING, GET_DRIVER_JOBS,
    BID_AVAILABLE_JOBS, GET_CARS, GET_INSURANCE
} from '../actions/types';
const initialState = {
    jobs: [],
    cars: [],
    insurance: [],
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
        case GET_CARS:
            return {
                ...state,
                cars: action.payload.cars,
                loading: false
            };
        case GET_INSURANCE:
            return {
                ...state,
                insurance: action.payload.insurance,
                loading: false
            };
        default:
            return state
    }
}
