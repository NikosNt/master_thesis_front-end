import React,{useState} from 'react';
import { connect } from 'react-redux';
import Products from './Business_Products/Products';
import Services from './Business_services/Services';
import BusinessInfo from './Business_Info/Business_Info';
import BusinessMessages from './Business_messages/Business_messages';
// import * as actions from '../../../store/actions/index';
import classes from './View_A_Business.module.css' ;
import {Tab,Tabs} from 'react-bootstrap'

const ViewProductsServices = (props) =>{

    const [key, setKey] = useState('info');

    return(
        <>
            <h2 className={classes.Heading} > {props.loadBusiness.business_name}</h2>
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} >
                <Tab  eventKey="products" title="Προιόντα" >
                    <Products businessID={props.loadBusiness.business_id}/>
                </Tab>
                <Tab  eventKey="services" title="Υπηρεσίες" >
                    <Services businessID={props.loadBusiness.business_id}/>
                </Tab> 
                <Tab eventKey="info" title="Πληροφορίες">
                     <BusinessInfo business={props.loadBusiness}/>
                </Tab>           
                <Tab eventKey="messages" title="Μηνύματα" >
                    <BusinessMessages businessName={props.loadBusiness.business_name} businessID={props.loadBusiness.business_id}/>
                </Tab>
            </Tabs>
        </>
    )
}

const mapStateToProps = state => {
    return {
        loadBusiness: state.userPage.loadBusiness
    };
  };
  
//   const mapDispatchToProps = dispatch => {
//     return {
  
//     };
//   };
export default  connect( mapStateToProps )(ViewProductsServices);

