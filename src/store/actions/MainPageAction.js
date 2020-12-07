import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';

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

