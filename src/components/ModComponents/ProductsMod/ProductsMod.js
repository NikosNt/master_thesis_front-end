import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import ExistingProductMod from './ProductMod/ExistingProductMod';

import Modal from '../../UI/Modal/Modal';
import classes from './ProductsMod.module.css';
import {Button} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const ProductsMod = (props) =>{

  const {OnfetchBusinessProducts} = props;

  const [showModal,setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
        await OnfetchBusinessProducts(props.modBusiness.id);
    }
    fetchData();
  }, [OnfetchBusinessProducts,props.modBusiness.id]); 

  let showProducts =  props.business_products.map( product =>(
    <ExistingProductMod key={product.productId}  product={product} businessId={props.modBusiness.id}/>
  ))

  let noProducts='';
  if(!props.business_products.length ){
    noProducts =<p style={{textAlign:"center",marginTop:"10%"}}>Δεν υπάρχουν διαθέσιμα προιοντα</p>
  }


  return(

      <>
      <p style={{textAlign:'center'}}> Ta Products</p>
      <Modal  show={showModal} modalClosed={() => setShowModal(false)}>
          <p style={{textAlign:"center"}}>Add a new product</p>
      </Modal>

      <div  >
        {showProducts}
      </div>            
         {noProducts}

      <div className={classes.DivButton}>
        <Button variant="success" className={classes.Button} onClick={()=>setShowModal(true)}><Icon.Plus  size={25}/></Button>
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
    };
  };
export default connect( mapStateToProps,mapDispatchToProps )(ProductsMod);
