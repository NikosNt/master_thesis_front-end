import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';

export const loadFail = (error) => {
    return {
        type: actionTypes.LOAD_FAIL,
        error: error
    };
};

export const setResultMessage = (message) => {
    return {
        type: actionTypes.RESULT_MESSAGE,
        resultMessage : message
    };
};

export const setSearchText = (text) => {
    return {
        type: actionTypes.SEARCH_TEXT,
        searchText: text
    }
}

export const citiesInit = (cities) => {
    return {
        type: actionTypes.CITIES_INIT,
        cities: cities
    }
}
export const fetchCities = () => {
    return dispatch => {
        axios.get('api/services/business/by/cities')
            .then(res => {
                let citiess = [];
                citiess = [
                    { name: "All cities", id: 0 },
                ]
                for (let key in res.data) {
                    citiess.push({
                        name: res.data[key],
                        id: parseInt(res.data[key].id) + 1,
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

export const servicesInit = (services) => {
    return {
        type: actionTypes.SERVICES_INIT,
        services: services
    }
}

export const fetchServices = () => {
    return dispatch => {
        axios.get('api/services/business/by/types')
            .then(res => {
                let types = [];
                types = [
                    { name: "All types", id: 0 },
                    // {name:"none" ,id:1},
                ]
                for (let key in res.data) {
                    types.push({
                        name: res.data[key],
                        id: parseInt(res.data[key].id) + 1,
                    });
                }
                dispatch(servicesInit(types));
            })
            .catch(err => {
                dispatch(loadFail(err))
            });
    }

}

export const updateCityContent = (content) => {
    return {
        type: actionTypes.CITY_CONTENT,
        cityContent: content
    }
}

export const updateServiceContent = (content) => {
    return {
        type: actionTypes.SERVICE_CONTENT,
        serviceContent: content
    }
}


export const loadServicesCompanies = (content,message) => {
    return {
        type: actionTypes.LOAD_SERVICES_COMPANIES,
        loadedServices_Companies: content,
        resultMessage: message
    }
}

export const fetchServicesCompanies = (city, typeBusiness, searchText) => {
 
    if (!city) { city = "empty" }
    if (!typeBusiness) { typeBusiness = "empty" }
    if (searchText === "") { searchText = "empty" }
  
    let message = "" ;
    return dispatch => {
        axios.get('api/services/business/by/' + city + '/' + typeBusiness + '/' + searchText + '/')
            .then(res => {
                const all_business = [];
                for (let key in res.data) {
                    all_business.push({
                        ...res.data[key]
                    });
                }

                if(Object.keys(all_business).length === 0){      
                    message = 'No results for the selected :('
                }
                dispatch(loadServicesCompanies(all_business,message));
            })
            .catch(err => {
                dispatch(loadFail(err))
            });
    }
}

