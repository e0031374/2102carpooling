
//state is obj
import { GET_ADS} from '../actions/types';
const initialState = {
    ads: [],

}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ADS:
            return {
                ...state,
                ads: action.payload.ads,
                loading: false
            };
            
        default:
            return state
    }
}
