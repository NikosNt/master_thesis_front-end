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
    console.log("city ->",city," typeBusiness ->",typeBusiness," searchText ->",searchText)
    return dispatch => {
        axios.get('api/services/business/all')
        .then( res => {
            const all_business = [];
            if( !city && !typeBusiness  && searchText === "Or search" ){//an den exw epilogh
                for(let key in res.data){
                    all_business.push({
                        ...res.data[key]
                    });
                }
            }else if ( city && !typeBusiness  && searchText === "Or search" ){//an exw epileksh mono polh
                for(let key in res.data){
                    let counter = 0;
                    for (let polh in res.data[key].address){
                        if(res.data[key].address[polh].city === city && counter ===0){
                            counter=1;
                            all_business.push({
                                ...res.data[key]
                            });                            
                        }
                    }
                }
            }else if  (!city && typeBusiness  && searchText === "Or search" ){//an exw epileksh mono type
                for(let key in res.data){
                    for (let tupos in res.data[key].b_type){
                        if(res.data[key].b_type[tupos].type === typeBusiness ){
                            all_business.push({
                                ...res.data[key]
                            });                            
                        }
                    }
                }
            }else if  (!city && !typeBusiness  && searchText !== "Or search" ){//an exei epileksi mono search bar
                for(let key in res.data){
                    for (let tupos in res.data[key].b_type){
                        if(res.data[key].b_type[tupos].type === searchText ){
                            all_business.push({
                                ...res.data[key]
                            });                            
                        }
                    }
                }
            }else if  (city && typeBusiness  && searchText === "Or search" ){//an exei epileksi polh kai type
                const temp_business= [];
                for(let key in res.data){
                    let counter = 0;
                    for (let polh in res.data[key].address){
                        if(res.data[key].address[polh].city === city && counter ===0){
                            counter=1;
                            temp_business.push({
                                ...res.data[key]
                            });                            
                        }
                    }
                }
                for(let key in temp_business){
                    for (let tupos in temp_business[key].b_type){
                        if(temp_business[key].b_type[tupos].type === typeBusiness ){
                            all_business.push({
                                ...temp_business[key]
                            });                            
                        }
                    }
                }

            }else if  (city && !typeBusiness  && searchText !== "Or search" ){//an exei epileksi polh kai type
                console.log("kai polh kai searchbar")
            }
            dispatch(loadServicesCompanies(all_business));
        })
        .catch(err => {
            dispatch(loadFail(err))
        });
    }
}
