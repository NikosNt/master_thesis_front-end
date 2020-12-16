import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';


export const loadFail = (error) => {
    return {
        type: actionTypes.ADMIN_LOAD_ERROR,
        error: error
    };
};

export const loadServicesCompanies =(content)=>{
    return{
      type:actionTypes.ADMIN_LOAD_SERVICES  ,
      loadedServices_Companies:content
    }   
}

export const fetchAdminServicesCompanies=()=>{
    return dispatch => {
        axios.get('api/services/business/all')
        .then( res => {
            const all_business = [];
                for(let key in res.data){
                    all_business.push({
                        ...res.data[key]
                    });
                }
            dispatch(loadServicesCompanies(all_business));
        })
        .catch(err => {
            dispatch(loadFail(err))
        });
    }
}


export const deleteAdminServicesCompanies=(id)=>{
    return dispatch => {
        axios.delete('api/services/business/delete/' + id)
        .then( res => {
            console.log("deleted", res);
            dispatch(fetchAdminServicesCompanies());
        })
        .catch(err => {
            dispatch(loadFail(err))
        });
    }
}