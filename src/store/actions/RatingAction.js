import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

//---------------------------------User------------------------------------------------
export const businesRatingOfUser = (content) => {
    return {
        type: actionTypes.RATING_OF_USER_TO_BUSINESS,
        businesRatingOfUser: content,
    }
}

//pros to parwn den to xrhsimopopiw to kanw apeu8eias sto Business_Info
export const fetchBusinesRatingOfUser = (businessId,userId) => {
    return dispatch => {
        //http://localhost:8080/api/product_services/products/{business_id}
        axios.get('api/rating/by/' + businessId +'/'+userId)
        .then(res => {
            if(res.data){
                dispatch(businesRatingOfUser(res.data.rating));
            }else{
                dispatch(businesRatingOfUser(0));
            }
        })
        .catch(err => {
            console.log(err)
        //    dispatch(loadFail(err))
        });
    } 
}

export const getNewRatingId = (content) => {
    return {
        type: actionTypes.NEW_RATING_ID,
        newRatingId: content,
    }
}

//pros to parwn den to xrhsimopopiw to kanw apeu8eias sto Business_Info
export  const  userAddRatingToBusiness = async (rating) =>{
  //  return dispatch =>{
        axios.post('api/rating/add',rating )
        .then(res =>{
            console.log("added epitixos", res);
           // dispatch(getNewRatingId(res.data.id));
        })
        .catch(err => {
            console.log(err)
        });
   // }
}

export  const userUpdateRatingToBusiness = (rating,ratingId) =>{
    return dispatch =>{
        axios.put('api/rating/update/'+ ratingId ,rating )
        .then(res =>{
            console.log("updated epitixos", res);
        })
        .catch(err => {
            console.log(err)
        });
    }
}
//---------------------------------Moderator------------------------------------------------