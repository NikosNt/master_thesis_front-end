import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';

export const loadFail = (error) => {
    return {
        type: actionTypes.LOAD_FAIL,
        error: error
    };
};

export const setSearchText =(text)=>{
    return{
      type:actionTypes.SEARCH_TEXT  ,
      searchText:text
    }   
}

export const citiesInit =(cities)=>{
    return{
        type:actionTypes.CITIES_INIT,
        cities:cities 
    }
}
export const fetchCities = () => {
    return dispatch => {
        axios.get('api/services/business/by/cities')
        .then( res => {
            const citiess = [];
            for(let key in res.data){
                citiess.push({
                    name:res.data[key],
                    id:parseInt(key)+1,
                });
            }
        dispatch(citiesInit(citiess));
        })
        .catch(err => {
            console.log(err)
            dispatch(loadFail(err))
        });
    }

}

export const servicesInit =(services)=>{
    return{
        type:actionTypes.SERVICES_INIT,
        services:services 
    }
}

export const fetchServices = () => {
    return dispatch => {
        axios.get('api/services/business/by/types')
        .then( res => {
            const types = [];
            for(let key in res.data){
                types.push({
                    name:res.data[key],
                    id:parseInt(key)+1,
                });
            }
        dispatch(servicesInit(types));
        })
        .catch(err => {
            dispatch(loadFail(err))
        });
    }

}

export const updateCityContent =(content)=>{
    return{
      type:actionTypes.CITY_CONTENT  ,
      cityContent:content
    }   
}

export const updateServiceContent =(content)=>{
    return{
      type:actionTypes.SERVICE_CONTENT  ,
      serviceContent:content
    }   
}


export const loadServicesCompanies =(content)=>{
    return{
      type:actionTypes.LOAD_SERVICES_COMPANIES  ,
      loadedServices_Companies:content
    }   
}

export const fetchServicesCompanies=(city,typeBusiness,searchText)=>{
    console.log("city ->",city," typeBusiness ->",typeBusiness," typeBusiness ->",searchText)
    return dispatch => {
        axios.get('api/services/business/all')
        .then( res => {
            const all_business = [];
            for(let key in res.data){
                all_business.push({
                    ...res.data[key]
                });
            }
            for(let klidi in all_business){
                console.log(all_business[klidi]);
            }
           // dispatch(loadServicesCompanies(business));
        })
        .catch(err => {
            dispatch(loadFail(err))
        });
    }
}
