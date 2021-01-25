import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState={
    loadUserBusinessServices:[],
    modBusinessServices:[],
    modServiceFail:false,
};

const loadFailServiceMod = ( state, action ) => {
    return updateObject( state,{
        modServiceFail:action.modServiceFail
    });
}

const loadUserBusinessServices = ( state, action ) => {
    return updateObject( state,{
        loadUserBusinessServices:action.loadUserBusinessServices
    });
};

const loadModBusinessServices = ( state, action ) => {
    return updateObject( state,{
        modBusinessServices:action.modBusinessServices
    });
}

const reducer = (state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.LOAD_BUSINESS_SERVICES: return loadUserBusinessServices(state,action);
        case actionTypes.LOAD_MOD_SERVICES: return loadModBusinessServices( state, action );
        case actionTypes.MOD_SERVICE_FAIL: return loadFailServiceMod( state, action );
        default: return state;
    }
}

export default reducer
