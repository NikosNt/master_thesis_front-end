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
            dispatch(loadModFail(err))
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
    console.log(business)
    return dispatch => {
        axios.put('api/services/business/update/' +id , business)
        .then(response => {
            console.log("updated epitixos", response);
            dispatch(fetchBusiness(business.moderatorId));
            dispatch(updateModBusiness());//midenizei to obj 
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadModFail(err))
        });

    }
}
