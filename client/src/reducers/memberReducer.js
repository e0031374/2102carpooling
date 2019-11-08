import { GET_MEMBERS , GET_FEEDBACK,
    } from '../actions/types';
const initialState = {
    //members : [
    //    {
    //        uname: "root",
    //        bios: "the first",
    //        rating: 2,
    //    },{
    //        uname: "user",
    //        bios: "generic user",
    //        rating: 1,
    //    }, {
    //        uname: "rogers",
    //        bios: "70 old vet",
    //        rating: 0,
    //    }, {
    //        uname: "stark",
    //        bios: "you know who i am",
    //        rating: 2,
    //    }, {
    //        uname: "banner",
    //        bios: "green",
    //        rating: 1,
    //    }
    //],
    members: [],
    feedback: [],
    jobs: [],
    loading: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MEMBERS:
            console.log("memberRed");
            console.log(action.payload);
            return {
                ...state,
                members: action.payload,
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
