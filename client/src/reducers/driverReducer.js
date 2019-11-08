
import { DRIVER_JOBS_LOADING, GET_DRIVER_JOBS,
    BID_AVAILABLE_JOBS, GET_CARS, GET_INSURANCE, GET_INSURANCE_COMPANIES
} from '../actions/types';
const initialState = {
    jobs: [],
    car : {
        brand: "Honda",
        type: "Civic",
        seat: 4,
    },
    insurance: [],
    loading: false,

    insuranceCompanies: [],
    //insuranceCompanies: [ 
    //    { cname: 'Aviva', contactnum: '1234' },
    //    { cname: 'Virgin', contactnum: '1235' },
    //    { cname: 'Great Eastern', contactnum: '1236' },
    //],
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
