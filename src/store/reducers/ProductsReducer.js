import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'

const initialState={
    loadUserBusinessProducts:[],
};

const loadUserBusinessProducts = ( state, action ) => {
    return updateObject( state,{
        loadUserBusinessProducts:action.loadUserBusinessProducts
    });
};

const reducer = (state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.LOAD_BUSINESS_PRODUCTS: return loadUserBusinessProducts(state,action);
        default: return state;
    }
}
export default reducer