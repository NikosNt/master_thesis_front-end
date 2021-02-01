import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState={
   businesRatingOfUser:'',
   newRatingId:null,
   loading:true
};

const businesRatingOfUser = ( state, action ) => {
    return updateObject( state,{
        businesRatingOfUser:action.businesRatingOfUser
    });
};

const getNewRatingId = ( state, action ) => {
    return updateObject( state,{
        newRatingId:action.newRatingId
    });
};

const reducer = (state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.RATING_OF_USER_TO_BUSINESS: return businesRatingOfUser(state,action);
        case actionTypes.NEW_RATING_ID: return getNewRatingId(state,action);
        default: return state;
    }
}
export default reducer