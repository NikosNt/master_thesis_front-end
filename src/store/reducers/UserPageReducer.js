import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const initialState={
    loading:false,
    searchText:'',
    cities:[],
    services:[],
    cityContent:'',
    serviceContent:'',
    error: null,
    loadedServices_Companies:[]
    
};

const setSearchText =(state,action) =>{
    return updateObject( state,{
       searchText:action.searchText
    });
}

//to 8ema edw einai oti prosteti sti palia lista ksana kai ksana kai exeis
// ta idia polles fores 
// const citiesInit = ( state, action ) => {
//     return updateObject( state,{
//         cities:state.cities.concat(action.cities)
//     });
// };

const citiesInit = ( state, action ) => {
    return updateObject( state,{
        cities:action.cities
    });
};

//to idio me ta cities
// const servicesInit = ( state, action ) => {
//     return updateObject( state, {
//         services:state.services.concat(action.services)
//     });
// };

const servicesInit = ( state, action ) => {
    return updateObject( state, {
        services:action.services
    });
};

const updateCityContent =(state,action) =>{
    return updateObject( state,{
        cityContent:action.cityContent
    });
}

const updateServiceContent =(state,action) =>{
    return updateObject( state,{
        serviceContent:action.serviceContent
    });
}

const loadFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
    });
};

const loadServicesCompanies = ( state, action ) => {
    return updateObject( state,{
        loadedServices_Companies:action.loadedServices_Companies
    });
};

const reducer = (state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.CITIES_INIT: return citiesInit( state, action );
        case actionTypes.SERVICES_INIT: return servicesInit( state, action );
        case actionTypes.SEARCH_TEXT: return setSearchText(state,action);
        case actionTypes.LOAD_FAIL: return loadFail(state,action);
        case actionTypes.CITY_CONTENT: return updateCityContent(state,action);
        case actionTypes.SERVICE_CONTENT: return updateServiceContent(state,action);
        case actionTypes.LOAD_SERVICES_COMPANIES: return loadServicesCompanies(state,action);
        default: return state;
    }

}

export default reducer
