import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import Product from './Product/Product'
import * as actions from '../../../../store/actions/index';
//import classes from './Products.module.css' ;
import {CardDeck} from 'react-bootstrap'

const Products = (props) =>{

    const {OnfetchBusinessProducts} = props;

    useEffect(() => {
        async function fetchData() {
            await OnfetchBusinessProducts(props.businessID);
        }
        fetchData();
    }, [OnfetchBusinessProducts,props.businessID]); 

  //console.log(props.business_products);

   let showProducts =  props.business_products.map( product =>(
    <Product key={product.id}  product={product}/>
  ))

  let noProducts='';
  if(!props.business_products.length ){
    noProducts =<p style={{textAlign:"center",marginTop:"10%"}}>Δεν υπάρχουν διαθέσιμα προιοντα</p>
  }
    return(
      <>  
        <CardDeck >
            {showProducts}
        </CardDeck> 
        {noProducts}
      </>
    )
}

const mapStateToProps = state => {
    return {
       business_products: state.userPage.loadBusinessProducts
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      OnfetchBusinessProducts: (busId)=> dispatch( actions.fetchBusinessProducts(busId) ),  
    };
  };
export default connect( mapStateToProps,mapDispatchToProps )(Products);

