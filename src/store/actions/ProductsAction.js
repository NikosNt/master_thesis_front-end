import axios from '../../axios-orders'
import * as actionTypes from './actionTypes';

//---------------------------------User------------------------------------------------

export const loadUserBusinessProducts = (content) => {
    return {
        type: actionTypes.LOAD_BUSINESS_PRODUCTS,
        loadUserBusinessProducts: content,
    }
 }

 export const fetchUserBusinessProducts = (busId) => {
    let products = [];
    return dispatch => {
        //http://localhost:8080/api/product_services/products/{business_id}
        axios.get('api/product_services/products/' + busId )
        .then(res => {
            for (let key in res.data) {
                products.push({
                    ...res.data[key]
                });
            }
            dispatch(loadUserBusinessProducts(products));
        })
        .catch(err => {
            console.log(err)
        //    dispatch(loadFail(err))
        });
    } 
}

//---------------------------------Moderator------------------------------------------------

