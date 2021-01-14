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
                citiess = [ { name: "All cities", id: 0 } ]
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
                types = [{ name: "All types", id: 0 }]
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
 
    let all_business = [];
    let message = "" ;
    return dispatch => {
        axios.get('api/services/business/by/' + city + '/' + typeBusiness + '/' + searchText + '/')
            .then(res => {
                for (let key in res.data) {
                    all_business.push({
                        ...res.data[key]
                    });
                }
                if(Object.keys(all_business).length === 0){      
                    message = 'Δεν βρέθηκε κάποιο αποτέλεσμα για τα επιλεγμένα :('
                }
                dispatch(loadServicesCompanies(all_business,message));
            })
            .catch(err => {
                dispatch(loadFail(err))
            });      
    }
}

 export const loadScheduleBusiness = (content) => {
    return {
        type: actionTypes.LOAD_BUSINESS_SCHEDULE,
        businessSchedule: content,
    }
 }

 export const fetchScheduleBusiness = (id) => {
    let schedule = [];
    return dispatch => {
        axios.get('api/schedule/business/' + id )
        .then(res => {
            for (let key in res.data) {
                schedule.push({
                    ...res.data[key]
                });
            }
            dispatch(loadScheduleBusiness(schedule));
        })
        .catch(err => {
            dispatch(loadFail(err))
        });

    } 

}

export const loadBusinessUserMessages = (content) => {
    return {
        type: actionTypes.LOAD_BUSINESS_USER_MESSAGES,
        business_user_messages: content,
    }
 }

 export const fetchdBusinessUserMessages = (userId,busId) => {
    let messages = [];
    return dispatch => {
        //http://localhost:8080/api/messages/view/{userId}/{businessId}
        axios.get('api/messages/view/' + userId + '/' + busId )
        .then(res => {
            for (let key in res.data) {
                messages.push({
                    ...res.data[key]
                });
            }
            dispatch(loadBusinessUserMessages(messages));
        })
        .catch(err => {
            dispatch(loadFail(err))
        });
    } 
}

export const addNewMessageToBusiness = (message) => {
    return dispatch => {
     //http://localhost:8080/api/messages/add
        axios.post('api/messages/add',message)
        .then(res => {
            console.log("added epitixos", res);
            dispatch(fetchdBusinessUserMessages(message.userId,message.businessId));
        })
        .catch(err => {
            dispatch(loadFail(err))
        });
    } 
}

// {
//     "businessId": 16,
//     "userId": 10,
//     "sender": 0,
//     "title": "Re:kkkk",
//     "message": "ooooosdsdsd dssd o",
//     "date_time": "2015-12-28 23:44:52"
// }