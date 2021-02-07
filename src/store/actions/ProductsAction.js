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
  
  export const createModNewProduct = (newProduct) => {
    return dispatch =>{
        axios.post('api/product_services/products/add',newProduct )
        .then(res =>{
            console.log("added epitixos", res);
            dispatch(fetchUserBusinessProducts(newProduct.business_id));
        })
        .catch(err => {
            console.log(err)
          //  dispatch(failMod(true));
        });
    }
}
  export const updateModProduct = (updatedProduct,id) => {
    return dispatch =>{
        axios.put('api/product_services/products/update/'+ id ,updatedProduct )
        .then(res =>{
            console.log("updated epitixos", res);
            dispatch(fetchUserBusinessProducts(updatedProduct.business_id ));
        })
        .catch(err => {
            console.log(err)
          //  dispatch(failMod(true));
        });
    }
}
export const deleteModProduct = (id,busId) => {
    return dispatch =>{
        axios.delete('api/product_services/products/delete/'+ id)
        .then(res =>{
            console.log("deleted epitixos", res);
            dispatch(fetchUserBusinessProducts(busId));
        })
        .catch(err => {
            console.log(err)
           // dispatch(failMod(true));
        });
    }
}

export const deleteModImageProduct = (id,busId) => {
    return dispatch =>{
        axios.delete('api/product_services/products/image/delete/'+ id)
        .then(res =>{
            console.log("deleted epitixos", res);
            dispatch(fetchUserBusinessProducts(busId));
        })
        .catch(err => {
            console.log(err)
           // dispatch(failMod(true));
        });
    }
}