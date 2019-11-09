
//state is obj
import { GET_ADS, GET_FEATURE_ONE, GET_FEATURE_TWO, GET_FEATURE_THREE, 
    GET_TOP_DRIVERS
} from '../actions/types';
const initialState = {
    ads: [],
    feature1: [],
    feature2: [],
    feature3: [],
    topdrivers: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_FEATURE_ONE:
            return {
                ...state,
                feature1: action.payload.stats1,
                loading: false
            };
        case GET_FEATURE_TWO:
            return {
                ...state,
                feature2: action.payload.stats2,
                loading: false
            };
        case GET_FEATURE_THREE:
            return {
                ...state,
                feature3: action.payload.stats3,
                loading: false
            };
        case GET_ADS:
            return {
                ...state,
                ads: action.payload.ads,
                loading: false
            };
        case GET_TOP_DRIVERS:
            return {
                ...state,
                topdrivers: action.payload.topdrivers,
                loading: false
            };
            
        default:
            return state
    }
}
