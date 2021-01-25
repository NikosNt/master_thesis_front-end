import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';

//---------------------------------User------------------------------------------------

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
            console.log(err)
        //    dispatch(loadFail(err))
        });
    } 
}

export const addUserNewMessageToBusiness = (message) => {
    return dispatch => {
     //http://localhost:8080/api/messages/add
        axios.post('api/messages/add',message)
        .then(res => {
            console.log("added epitixos", res);
            dispatch(fetchdBusinessUserMessages(message.userId,message.businessId));
        })
        .catch(err => {
            console.log(err)
          //  dispatch(loadFail(err))
        });
    } 
}

//---------------------------------Moderator------------------------------------------------



export const loadModMessages = (content) => {
    return {
        type: actionTypes.LOAD_MOD_MESSAGES,
        modMessages: content,
    }
 }

 export const fetchedModMessages = (id) => {
    let messages = [];
    return dispatch => {
        //http://localhost:8080/api/messages/view/{businessId}
        axios.get('api/messages/view/'+ id )
        .then(res => {
            for (let key in res.data) {
                messages.push({
                    ...res.data[key]
                });
            }
            dispatch(loadModMessages(messages));
        })
        .catch(err => {
            console.log(err)
        //    dispatch(loadFail(err))
        });
    } 
} 

//http://localhost:8080/api/messages/view/{businessId}