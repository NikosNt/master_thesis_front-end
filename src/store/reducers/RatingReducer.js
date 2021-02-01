import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState={
   businesRatingOfUser:null,
};

const businesRatingOfUser = ( state, action ) => {
    return updateObject( state,{
        businesRatingOfUser:action.businesRatingOfUser
    });
};


const reducer = (state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.RATING_OF_USER_TO_BUSINESS: return businesRatingOfUser(state,action);
        default: return state;
    }
}
export default reducer