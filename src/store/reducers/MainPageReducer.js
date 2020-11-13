import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const initialState={
    loading:false,
    searchText:'Or search',
    countries:[ { id: 1, name: 'Greece'},
                { id: 2, name: 'USA'},
                { id: 3, name: 'Germany' },],

    // cities:[    { id: 1, name: 'Chania'},
    //             { id: 2, name: 'Rethimno'},
    //             { id: 3, name: 'Hrakleio' },
    //             { id: 4, name: 'Agios Nikolaos' },],
    cities:[],
    services:[],
    // services:[  { id: 1, name: 'Doctor'},
    //             { id: 2, name: 'Bars'},
    //             { id: 3, name: 'Restaurants' },
    //             { id: 4, name: 'Hotel' },],

    countryContent:'',
    cityContent:'',
    serviceContent:''
    
};


const setSearchText =(state,action) =>{
    return updateObject( state,{
       searchText:action.searchText
    });
}

const countriesInit = ( state, action ) => {
    return updateObject(state,{
        countries:state.countries.concat(action.countries)
    });

};


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


const updateCountryContent =(state,action) =>{
    return updateObject( state,{
        countryContent:action.countryContent
    });
}

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



const reducer = (state=initialState,action) =>{
    switch(action.type) {
        case actionTypes.CITIES_INIT: return citiesInit( state, action );
        case actionTypes.COUNTRIES_INIT: return countriesInit( state, action );
        case actionTypes.SERVICES_INIT: return servicesInit( state, action );
        case actionTypes.SEARCH_TEXT: return setSearchText(state,action);
        case actionTypes.COUNTRY_CONTENT: return updateCountryContent(state,action);
        case actionTypes.CITY_CONTENT: return updateCityContent(state,action);
        case actionTypes.SERVICE_CONTENT: return updateServiceContent(state,action);

        default: return state;
    }
;
}

export default reducer
