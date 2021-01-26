import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState={
    business_user_messages:[],
    newMessage:[],
    modMessages:[],
    failMessage:false,

};

const failMessage = ( state, action ) => {
    console.log("Mphka")
    return updateObject( state,{
        failMessage:action.failMessage
    });
};


const loadBusinessUserMessages = ( state, action ) => {
    return updateObject( state,{
        business_user_messages:action.business_user_messages
    });
};
const loadModMessages = ( state, action ) => {
    return updateObject( state,{
        modMessages:action.modMessages
    });
};

const reducer = (state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.LOAD_BUSINESS_USER_MESSAGES: return loadBusinessUserMessages(state,action);
        case actionTypes.LOAD_MOD_MESSAGES: return loadModMessages(state,action);
        case actionTypes.LOAD_MESSAGE_FAIL: return failMessage(state,action);
        default: return state;
    }
}

export default reducer