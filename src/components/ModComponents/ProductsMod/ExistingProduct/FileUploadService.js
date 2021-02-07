import axios from '../../../../axios-orders';


 const uploadImage = (file,businessId,productId, onUploadProgress) => {
    let formData = new FormData();
  
    formData.append("file", file);
    // /products/image/upload/{businessId}/{productId}
    return axios.post('/api/product_services/products/image/upload/' + businessId + '/' + productId, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  };

  export default {uploadImage};
  