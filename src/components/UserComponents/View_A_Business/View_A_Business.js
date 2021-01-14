import React,{useState} from 'react';

import Products from './Business_Products/Products';
import Services from './Business_Services/Services';
import Business_Info from './Business_Info/Business_Info';
import Business_messages from './Business_messages/Business_messages';

import classes from './View_A_Business.module.css' ;
import {Tab,Tabs} from 'react-bootstrap'

const ViewProductsServices = (props) =>{

    const [key, setKey] = useState('info');

  

    return(
        <>
            <h2 className={classes.Heading} > {props.location.business.business_name}</h2>
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} >
                <Tab  eventKey="products" title="Products" >
                    <Products/>
                </Tab>
                <Tab  eventKey="services" title="Services" >
                    <Services/>
                </Tab> 
                <Tab eventKey="info" title="Information">
                     <Business_Info business={props.location.business}/>
                </Tab>           
                <Tab eventKey="messages" title="Messages" >
                    <Business_messages businessID={props.location.business.business_id}/>
                </Tab>
            </Tabs>
        </>
    )
}


export default ViewProductsServices;

