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
        axios.get('api/product_services/products-images/' + busId )
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

export const uploadImage = (file,businessId,productId, onUploadProgress) => {
    let formData = new FormData();
  
    formData.append("file", file);
    // /products/image/upload/{businessId}/{productId}
    return axios.post("/api/product_services/products/image/upload/"+businessId+'/'+productId, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  };
  