//state is obj
import { LOGIN_VALIDATION, GET_JOBS, ADD_JOB, DELETE_JOB, JOBS_LOADING} from '../actions/types';
const initialState = {
    user: "waifong",

    jobs: [],

    loading: false,

    //jobs: [
    //    {
    //        user: "waifong",
    //        startDateTime: "02-Jan-1990 1459",
    //        endDateTime: "02-Jan-1990 2359",
    //        origin: "KR Terminal",
    //        end: "College Green",
    //        bid: false,
    //    },
    //    {
    //        user: "waifong",
    //        startDateTime: "02-Jan-1990 0000",
    //        endDateTime: "02-Jan-1990 2359",
    //        origin: "KR MRT",
    //        end: "Biz 2",
    //        bid: true,
    //    },
    //    {
    //        user: "waifong",
    //        startDateTime: "02-Jan-1990 0100",
    //        endDateTime: "02-Jan-1990 0200",
    //        origin: "KR MRT",
    //        end: "Utown",
    //        bid: false,
    //    }
    //]

}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_JOBS:
            return {
                ...state,
                jobs: action.payload,
                loading: false
            };
        case DELETE_JOB:
            return {
                ...state,

                jobs: state.jobs.filter(job => { 
                    return ! (job.user === state.user 
                        && job.startDateTime === action.payload); 
                }),

            }
        case ADD_JOB:
            const newJob = {
                ...action.payload, user: state.user
            };

            return {
                ...state,
                jobs: [newJob, ...state.jobs]
            };
        case JOBS_LOADING:
            return {
                ...state,
                loading: true
            };
        case LOGIN_VALIDATION:
            console.log(action.payload.uname)
            return {
                ...state,
                user: action.payload.uname
            };
               

            
        default:
            return state
    }
}
