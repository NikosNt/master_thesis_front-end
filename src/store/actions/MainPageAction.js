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
        //cities:cities 
        //cities:[{id:5,name:'Athens'}]
        cities:[    { id: 1, name: 'Chania'},
                    { id: 2, name: 'Rethimno'},
                    { id: 3, name: 'Hrakleio' },
                    { id: 4, name: 'Agios Nikolaos' },],
    }
}

export const countriesInit =(countries)=>{
    return{
        type:actionTypes.COUNTRIES_INIT,
        //countries:countries
        countries:[{id: 4, name: 'Cyprous' },
                   {id: 5, name:'Austria'}]
    }
}

export const servicesInit =(services)=>{
    return{
        type:actionTypes.SERVICES_INIT,
        //services:services 
        services:[  { id: 1, name: 'Doctor'},
                    { id: 2, name: 'Bars'},
                    { id: 3, name: 'Restaurants' },
                    { id: 4, name: 'Hotel' },
                    { id: 5, name: 'Mechanics'}
                 ],
    }
}

export const updateCountryContent =(content)=>{
    return{
      type:actionTypes.COUNTRY_CONTENT  ,
      countryContent:content
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

