import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';

//---------------------------------User------------------------------------------------

export const loadUserBusinessServices = (content) => {
    return {
        type: actionTypes.LOAD_BUSINESS_SERVICES,
        loadUserBusinessServices: content,
    }
 }

 export const fetchUserBusinessServices = (busId) => {
    let services = [];
    return dispatch => {
        axios.get('api/product_services/services/' + busId )
        .then(res => {
            for (let key in res.data) {
                services.push({
                    ...res.data[key]
                });
            }
            dispatch(loadUserBusinessServices(services));
        })
        .catch(err => {
            console.log(err)
        //    dispatch(loadFail(err))
        });
    } 
}

//---------------------------------Moderator------------------------------------------------

export const loadModBusinessServices = (content) => {
    return {
        type: actionTypes.LOAD_MOD_SERVICES,
        modBusinessServices: content,
    }
 }
 export const fetchModBusinessServices = (busId) => {
    let services = [];
    return dispatch => {
        axios.get('api/product_services/services/' + busId )
        .then(res => {
            for (let key in res.data) {
                services.push({
                    ...res.data[key]
                });
            }
            dispatch(loadModBusinessServices(services));
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadFail(err))
        });
    } 
}
export const creteModNewService = (newService) => {
    return dispatch =>{
        axios.post('api/product_services/services/add',newService )
        .then(res =>{
            console.log("added epitixos", res);
            dispatch(fetchModBusinessServices(newService.business_id));
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadFail(err))
        });
    }
}
export const updateModService = (updatedService,id) => {
    return dispatch =>{
        axios.put('api/product_services/services/update/'+ id ,updatedService )
        .then(res =>{
            console.log("updated epitixos", res);
            dispatch(fetchModBusinessServices(updatedService.business_id));
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadModFail(err))
        });
    }
}
export const deleteModService = (id,busId) => {
    return dispatch =>{
        axios.delete('api/product_services/services/delete/'+ id)
        .then(res =>{
            console.log("deleted epitixos", res);
            dispatch(fetchModBusinessServices(busId));
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadModFail(err))
        });
    }
}