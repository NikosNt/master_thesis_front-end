import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

//---------------------------------User------------------------------------------------
export const businesRatingOfUser = (content) => {
    return {
        type: actionTypes.RATING_OF_USER_TO_BUSINESS,
        businesRatingOfUser: content,
    }
}

export const fetchBusinesRatingOfUser = (businessId,userId) => {
    return dispatch => {
        //http://localhost:8080/api/product_services/products/{business_id}
        axios.get('api/rating/by/' + businessId +'/'+userId)
        .then(res => {

            dispatch(businesRatingOfUser(res.data.rating));
        })
        .catch(err => {
            console.log(err)
        //    dispatch(loadFail(err))
        });
    } 
}
//---------------------------------Moderator------------------------------------------------