import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';

export const failSchedule = (content) => {
    return {
        type: actionTypes.LOAD_SCHEDULE_FAIL,
        failSchedule: content,
    }
 }

//---------------------------------User------------------------------------------------

export const loadUserScheduleBusiness = (content) => {
    return {
        type: actionTypes.LOAD_BUSINESS_SCHEDULE,
        businessUserSchedule: content,
    }
 }

 export const fetchUserScheduleBusiness = (id) => {
    let schedule = [];
    return dispatch => {
        axios.get('api/schedule/business/' + id )
        .then(res => {
            for (let key in res.data) {
                schedule.push({
                    ...res.data[key]
                });
            }
            dispatch(loadUserScheduleBusiness(schedule));
        })
        .catch(err => {
            console.log(err)
            //dispatch(loadFail(err))
        });
    } 
}

//---------------------------------Moderator------------------------------------------------

export const loadModBusinessSchedule = (content) => {
    return {
        type: actionTypes.LOAD_MOD_BUS_SCHEDULE,
        modBusinessSchedule: content,
    }
 }

 export const fetchModScheduleBusiness = (id) => {
    let schedule = [];
    return dispatch => {
        axios.get('api/schedule/business/' + id )
        .then(res => {
            for (let key in res.data) {
                schedule.push({
                    ...res.data[key]
                });
            }
            dispatch(loadModBusinessSchedule(schedule));
        })
        .catch(err => {
            console.log(err);
            dispatch(failSchedule(true))
        });
    } 
}

export const updateModScheduleBusinessDay = (newScheduleHour,dayId) => {
    return dispatch => {
        axios.put('api/schedule/update/day/'+ dayId , newScheduleHour)
        .then(response => {
            console.log("updated epitixos", response);
            dispatch(fetchModScheduleBusiness(newScheduleHour.businessId));
        })
        .catch(err => {
            console.log(err)
            dispatch(failSchedule(true))
        });
    }
}

export const deleteModScheduleSetHourDay = (busId,id ) =>{
    return dispatch => {
        axios.delete('api/schedule/delete/hour/' +id )
        .then(response => {
            console.log("deleted", response);
            dispatch(fetchModScheduleBusiness(busId));
        })
        .catch(err => {
            console.log(err)
            dispatch(failSchedule(true))
        });
    }
}