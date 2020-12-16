import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState={
    loading:false,
    searchText:'',
    error: null,
    loadedServices_Companies:[]
};

const loadFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
    });
};

const loadServicesCompanies = ( state, action ) => {
    return updateObject( state,{
        loadedServices_Companies:action.loadedServices_Companies
    });
};

const reducer = (state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.ADMIN_LOAD_SERVICES: return loadServicesCompanies(state,action);
        case actionTypes.ADMIN_LOAD_ERROR: return loadFail(state,action);
        
        default: return state;
    }

}

export default reducer
