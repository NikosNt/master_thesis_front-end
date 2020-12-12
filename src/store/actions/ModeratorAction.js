import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';


export const loadModFail = (error) => {
    return {
        type: actionTypes.LOAD_MOD_FAIL,
        error: error
    };
};

export const loadModBusinessInit = (modBusiness) => {
    return {
        type: actionTypes.LOAD_MOD_BUSINESS,
        modBusiness: modBusiness
    }
}

export const createModBusiness = (newModBusiness) => {
    return {
        type: actionTypes.CREATE_MOD_BUSINESS,
        newModBusiness: newModBusiness
    }
}

export const fetchBusiness = (modId) => {
    return dispatch => {
        axios.get('api/services/business/mod/'+ modId)
        .then( res => {
            const business = [];
            business.push({
                ...res.data
            }); 
        dispatch(loadModBusinessInit(business[0]));
        })
        .catch(err => {
            console.log(err)
            dispatch(loadModFail(err))
        });
    }

}
