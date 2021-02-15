import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const initialState={
    loading:false,
    searchText:'',
    cities:[],
    services:[],
    cityContent:-1,
    serviceContent:-1,
    error: null,
    loadedServices_Companies:[],
    resultMessage:'',
    loadBusiness:[],
    userlat:0,
    userlong:0,
    viewFilters:false,
    checkedOpen:false,
    radiousValue:0,
    // radiousOptions:[{name:1000,id:1},
    //                 {name:2000,id:2},
    //                 {name:3000,id:3},
    //                 {name:4000,id:4},
    //                 {name:5000,id:5},
    //                 {name:10000,id:6},
    //                 {name:20000,id:7},
    //                 {name:50000,id:8},
    //                 {name:'Χωρίς ακτίνα',id:9}]
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

const setResultMessage = (state, action) => {
    return updateObject( state, {
        resultMessage: action.resultMessage,
    });
};

const loadServicesCompanies = ( state, action ) => {
    return updateObject( state,{
        loadedServices_Companies:action.loadedServices_Companies,
        resultMessage:action.resultMessage
    });
};
const loadBusiness = ( state, action ) => {
    return updateObject( state,{
        loadBusiness:action.loadBusiness
    });
};
const setViewUserFilters = ( state, action ) => {
    return updateObject( state,{
        viewFilters:action.viewFilters
    });
};
const setCheckedOpen = ( state, action ) => {
    return updateObject( state,{
        checkedOpen:action.checkedOpen
    });
};
const setRadiousValue = ( state, action ) => {
    return updateObject( state,{
        radiousValue:action.radiousValue
    });
};
const setUserLat = ( state, action ) => {
    return updateObject( state,{
        userlat:action.userlat
    });
};
const setUserLong = ( state, action ) => {
    return updateObject( state,{
        userlong:action.userlong
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
        case actionTypes.LOAD_BUSINESS: return loadBusiness(state,action);
        case actionTypes.RESULT_MESSAGE: return setResultMessage(state,action);
        case actionTypes.USER_LAT : return setUserLat(state,action);
        case actionTypes.USER_LONG : return setUserLong(state,action);
        case actionTypes.VIEW_USER_FILTERS : return setViewUserFilters(state,action);
        case actionTypes.CHECKED_OPEN : return setCheckedOpen(state,action);
        case actionTypes.RADIOUS_VALUE : return setRadiousValue(state,action);
        default: return state;
    }

}

export default reducer
