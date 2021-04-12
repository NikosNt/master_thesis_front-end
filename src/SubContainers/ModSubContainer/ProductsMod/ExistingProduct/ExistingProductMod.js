import React,{useState} from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {Row,Col} from 'react-bootstrap';
import classes from './ExistingProductMod.module.css' ;
import MyButton from '../../../../components/UI/Button/MyButton'; 

import UploadService from './FileUploadService';

const ProductMod = (props) => {
    const {OnfetchBusinessProducts,OnUpdateProduct,OnDeleteProduct,OnDeleteImage} = props;

    const [name,setName] = useState(props.product.name);
    const [number,setNumber] = useState(props.product.number);
    const [value,setValue] = useState(props.product.value);
    const [info,setInfo] = useState(props.product.info);

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    
 
    let images = props.product.files.map( (img,index) =>(
        <div  key={index} style={{marginTop:"20px"}}>
        <Row>
            <Col sm={12} md={6} lg={8}>
                <img src={img.url}  alt="" height={150} />
            </Col>
            <Col sm={12} md={6} lg={4}>
                <MyButton variant="danger" clicked={()=> deleteImageHanler(img.id)} >Delete</MyButton>
            </Col>
        </Row>
           
           
        </div>
    ))

    if(!props.product.files.length ){ images=( <img src="/logo512.png" alt="" height={150} />) }

    const deleteImageHanler = (id) =>{OnDeleteImage(id,props.businessId)}

    const updateProductHandler = () =>{
        const updatedProduct ={
                business_id: props.businessId,
                name: name,
                number:number,
                value:Number(value),
                info: info
        }
        console.log(updatedProduct);
        OnUpdateProduct(updatedProduct,props.product.productId)
    }
   
    const deleteProductHandler = () =>{OnDeleteProduct(props.product.productId,props.businessId)}

    
    const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);
    UploadService.uploadImage(currentFile,props.businessId,props.product.productId, (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
    })
    .then((response) => {
        setMessage(response.data.message);
        return OnfetchBusinessProducts(props.businessId);
    //return UploadService.getFiles();
    })
    .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
    });

    setSelectedFiles(undefined);
    setProgress(0);
    };

    return(
        <> 
            <div className={classes.Product}>
                <div>
                    <input style={{width:"40%", margin:"auto",display:"block"}} value={name} onChange={(e)=> setName(e.target.value)}></input>
                </div>
                <hr/>
                <div className={classes.Images}>
                        {images}
                        <hr/>
                        {currentFile && (
                        <div className="progress">
                            <div className="progress-bar progress-bar-info progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progress + "%" }}
                            >
                                {progress}%
                            </div>
                        </div>
                        )}

                    <label className="btn btn-default">
                        <input type="file" onChange={(event)=> setSelectedFiles(event.target.files)} />
                    </label>
                    <button className="btn btn-success" disabled={!selectedFiles} onClick={upload} >Upload</button>
                    <div className="alert alert-light" role="alert">{message}</div>
                </div>
                <hr/>
                <div style={{marginTop:"20px"}}>
                    <span> Διαθέσιμα : </span>
                    <input  style={{width:"15%"}} value={number} onChange={(e)=> setNumber(e.target.value)}/> 
                    <span> Τιμή :  </span> 
                    <input  style={{width:"15%"}} value={value} onChange={(e)=> setValue(e.target.value)}/> 
                    <p> Πληροφορίες :</p> 
                    <textarea style={{width:"90%",height:"100px" }} value={info} onChange={(e)=> setInfo(e.target.value)} /><br/>
                    <MyButton variant="info" clicked={updateProductHandler}>Update</MyButton>
                    <MyButton variant="danger" clicked={deleteProductHandler}>Delete</MyButton>
                </div> 
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        business_products: state.products.loadUserBusinessProducts
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnfetchBusinessProducts: (busId)=> dispatch( actions.fetchUserBusinessProducts(busId) ), 
       // OnUploadImage: (file,businessId,productId, onUploadProgress)=> dispatch( actions.uploadImage(file,businessId,productId, onUploadProgress) ),  
        OnUpdateProduct: (product,id)=> dispatch( actions.updateModProduct(product,id) ), 
        OnDeleteProduct: (id,businessId)=> dispatch( actions.deleteModProduct(id,businessId) ), 
        OnDeleteImage: (id,businessId)=> dispatch( actions.deleteModImageProduct(id,businessId) ), 

    };
  };
export default connect( mapStateToProps,mapDispatchToProps )(ProductMod) ;