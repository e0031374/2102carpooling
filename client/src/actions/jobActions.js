//DEPRECATED
import axios from 'axios';
import { GET_JOBS, ADD_JOB, DELETE_JOB, JOBS_LOADING} from '../actions/types';


export const getJobs = () => dispatch => {
    dispatch(setJobsLoading());
    axios
        .get('/api/jobs')
        .then(res => 
            dispatch({
                type: GET_JOBS,
                payload: res.data
            })
        )
    //we can just do /api/jobs because we set the proxy
    //and dunnid do http://localhost:...
};

//id will be using startDateTime?
export const deleteJob = (id) => dispatch => {
    axios.delete(`/api/jobs/${id}`).then(res => 
        dispatch({
            type: DELETE_JOB,
            payload: id,
        })
    )
    //check against jobReducer case DELETE_JOB, what action.payload is
    //return {
    //    type: DELETE_JOB,
    //    payload: id
    //};
};

export const addJob = (job) => dispatch => {
    axios
        .post('/api/jobs', job) //post request
        .then(res => 
            dispatch({
                type: ADD_JOB,
                payload: res.data
            })
        )
    //note assumes res.data is the item which is returned by the api
    //and dispatch would then add it to the local redux state too
};

export const setJobsLoading = () => {
    return {
        type: JOBS_LOADING,
    };
};
