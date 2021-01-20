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
           // console.log("updated epitixos", response);
            dispatch(fetchBusiness(business.moderatorId));
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadModFail(err))
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
            //dispatch(loadModFail(err))
        });
    }
}

export const loadModBusinessSchedule = (content) => {
    return {
        type: actionTypes.LOAD_MOD_BUS_SCHEDULE,
        modBusinessSchedule: content,
    }
 }

 export const fetchModScheduleBusiness = (id) => {
    let schedule = [];
    return dispatch => {
        axios.get('api/schedule/business/' + id )
        .then(res => {
            for (let key in res.data) {
                schedule.push({
                    ...res.data[key]
                });
            }
            dispatch(loadModBusinessSchedule(schedule));
        })
        .catch(err => {
            console.log(err);
            //dispatch(loadModFail(err));
        });
    } 
}

export const updateScheduleBusinessDay = (newScheduleHour,dayId) => {
    return dispatch => {
        axios.put('api/schedule/update/day/'+ dayId , newScheduleHour)
        .then(response => {
            console.log("updated epitixos", response);
            dispatch(fetchModScheduleBusiness(newScheduleHour.businessId));
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadModFail(err))
        });
    }
}

export const deleteScheduleSetHourDay = (busId,id ) =>{
    return dispatch => {
        axios.delete('api/schedule/delete/hour/' +id )
        .then(response => {
            console.log("deleted", response);
            dispatch(fetchModScheduleBusiness(busId));
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadModFail(err))
        });
    }
}

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

export const creteNewService = (newService) => {
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
export const updateService = (updatedService,id) => {
//http://localhost:8080/api/product_services/services/update/{id}
// {
//     "business_id": 17,
//     "name": "poutso",
//     "value": 120.0,
//     "info": "episkepsh gia gamish"
// }
    return dispatch =>{
        axios.put('api/product_services/services/update/'+ id ,updatedService )
        .then(res =>{
            console.log("updated epitixos", res);
            dispatch(fetchModBusinessServices(updatedService.business_id));
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadFail(err))
        });
    }
}
export const deleteService = (id,busId) => {
//http://localhost:8080/api/product_services/services/delete/{id}
    return dispatch =>{
        axios.delete('api/product_services/services/delete/'+ id)
        .then(res =>{
            console.log("deleted epitixos", res);
            dispatch(fetchModBusinessServices(busId));
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadFail(err))
        });
}

}