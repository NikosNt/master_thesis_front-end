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
    loadedServices_Companies:[],
    resultMessage:'',
    businessSchedule:[],
    business_user_messages:[],
    newMessage:[],
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

const loadScheduleBusiness = ( state, action ) => {
    return updateObject( state,{
        businessSchedule:action.businessSchedule
    });
};

const loadBusinessUserMessages = ( state, action ) => {
    return updateObject( state,{
        business_user_messages:action.business_user_messages
    });
};

// const addNewMessageToBusiness = ( state, action ) => {
//     return updateObject( state,{
//         business_user_messages:action.business_user_messages
//     });
// };

const reducer = (state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.CITIES_INIT: return citiesInit( state, action );
        case actionTypes.SERVICES_INIT: return servicesInit( state, action );
        case actionTypes.SEARCH_TEXT: return setSearchText(state,action);
        case actionTypes.LOAD_FAIL: return loadFail(state,action);
        case actionTypes.CITY_CONTENT: return updateCityContent(state,action);
        case actionTypes.SERVICE_CONTENT: return updateServiceContent(state,action);
        case actionTypes.LOAD_SERVICES_COMPANIES: return loadServicesCompanies(state,action);
        case actionTypes.LOAD_BUSINESS_SCHEDULE: return loadScheduleBusiness(state,action);
        case actionTypes.LOAD_BUSINESS_USER_MESSAGES: return loadBusinessUserMessages(state,action);
     //   case actionTypes.ADD_MESSAGE_TO_BUSINESS: return addNewMessageToBusiness(state,action);
        case actionTypes.RESULT_MESSAGE: return setResultMessage(state,action); 
        default: return state;
    }

}

export default reducer
