import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import classes from './Products.module.css' ;
import {Card} from 'react-bootstrap'

const Products = (props) =>{

    const {OnfetchBusinessProducts} = props;

    useEffect(() => {
        async function fetchData() {
            await OnfetchBusinessProducts(props.businessID);
        }
        fetchData();
    }, [OnfetchBusinessProducts,props.businessID]); 

    console.log(props.business_products);
   let showProducts =  props.business_products.map( product =>(
    <Card key={product.id} className={classes.ViewProducts}>
      <Card.Img    variant="top" src="\thesis_photos\silver_chain1.jpg" /> 
      <Card.Title>{product.name}</Card.Title>
   
    
            <p> Diathesima : {product.number}</p>
      <p> Timh : {product.value}</p>
      <p> Plhrofories: {product.info}</p>
   
      {/* <img src={require("C:\thesis_photos\silver_chain1.jpg")} height="200" width="200"/> */}
      
     {/* {product.photos_path.map(ph =>( */}
      {/* <img key={ph.id} src={ph.path} height="200" width="200"/> */}
       {/* <Card.Img  key={ph.id} variant="top" src="holder.js/100px180" /> */}

     {/* ))
    } */}
    </Card>
  ))

  if(!props.business_products.length ){
    showProducts =<p style={{textAlign:"center",marginTop:"10%"}}>Δεν υπάρχουν διαθέσιμα προιοντα</p>
  }
    return(
      <> 
        {showProducts}
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

