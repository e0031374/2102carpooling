
import { DRIVER_JOBS_LOADING, GET_DRIVER_JOBS, GET_AREAS, GET_CONFIRM_BID,
    BID_AVAILABLE_JOBS, GET_CARS, GET_INSURANCE, GET_INSURANCE_COMPANIES
} from '../actions/types';
const initialState = {
    jobs: [],
    car: {},
    //car : {
    //    brand: "Honda",
    //    type: "Civic",
    //    seat: 4,
    //},
    insurance: [],
    loading: false,
    areas: [],
    confirmjobs: [],

    insuranceCompanies: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_AREAS:
            return {
                ...state,
                areas: action.payload.areas,
                loading: false
            };
        case GET_CONFIRM_BID:
            return {
                ...state,
                confirmjobs: action.payload.confirmjobs,
                loading: false
            };
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
                car: action.payload.car,
                loading: false
            };
        case GET_INSURANCE:
            return {
                ...state,
                insurance: action.payload.insurance,
                loading: false
            };
        case GET_INSURANCE_COMPANIES: {
            console.log(action.payload)
            return {
                ...state,
                insuranceCompanies: action.payload.insuranceCompanies,
                loading: false
            };
        }
        default:
            return state
    }
}
