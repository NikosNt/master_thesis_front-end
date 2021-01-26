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
           // dispatch(loadModFail(err))
        });
    }

}

export const createModBusiness = () => {
    return {
        type: actionTypes.CREATE_MOD_BUSINESS,
        newModBusiness:  {
            moderatorId:'',
            business_name:'',
            rating:0,
            info:'',
            ref:'',
            owner:[],
            b_type:[],
            address:[],
            phones:[]
        },
    }
}

export const createBusiness = (business) => {
    console.log(business)
    return dispatch => {
        axios.post('api/services/business/add',business)
        .then(response => {
            console.log("added epitixos", response);
            dispatch(fetchBusiness(business.moderatorId));
            dispatch(createModBusiness());//midenizei to obj 
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadModFail(err))
        });

    }
}


export const updateModBusiness = () => {
    return {
        type: actionTypes.UPDATE_BUSINESS,
        updateBusiness:  {
            moderatorId:'',
            business_name:'',
            rating:0,
            info:'',
            ref:'',
            owner:[],
            b_type:[],
            address:[],
            phones:[]
        },
    }
}

export const updateBusiness = (business,id) => {
    return dispatch => {
        axios.put('api/services/business/update/' +id , business)
        .then(response => {
            console.log("updated epitixos", response);
            dispatch(fetchBusiness(business.moderatorId));
        })
        .catch(err => {
            console.log(err)
            dispatch(loadModFail(true))
        });
    }
}

export const deletePropBusiness = (id,prop,modId) => {
    return dispatch => {
        let path = '';
        if(prop === "phone"){  path = 'api/services/props/phone/delete/'+id   }
        if(prop === "owner"){  path = 'api/services/props/owner/delete/'+id  }
        if(prop === "address"){  path = 'api/services/props/address/delete/'+id  }
        if(prop === "type"){  path = 'api/services/props/type/delete/' +id }
        axios.delete(path)
        .then(response => {
            console.log("deleted", response);
            dispatch(fetchBusiness(modId));
        })
        .catch(err => {
            console.log(err)
            dispatch(loadModFail(true))
        });
    }
}