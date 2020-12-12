import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState = {
    modBusiness : [],
    newModBusiness : [],
    error : null
};

const loadModBusinessInit = ( state, action ) => {
    return updateObject( state,{
        modBusiness:action.modBusiness
    });
}

const createModBusiness = ( state, action ) => {
    return updateObject( state,{
        newModBusiness:action.newModBusiness
    });
}

const loadModFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
    });
};

const reducer = (state=initialState,action) =>{
    switch(action.type) {    
        case actionTypes.LOAD_MOD_BUSINESS: return loadModBusinessInit( state, action );
        case actionTypes.LOAD_MOD_FAIL: return loadModFail( state, action );
        case actionTypes.CREATE_MOD_BUSINESS: return createModBusiness( state, action );

        // case actionTypes.CREATE_MOD_BUSINESS: return createModBusiness( state, action );
        // case actionTypes.CREATE_MOD_BUSINESS: return createModBusiness( state, action );
        default: return state;
    }

}

export default reducer
