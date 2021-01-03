import React from 'react';

import classes from './ViewBusiness.module.css';
import MyButton from '../../UI/Button/MyButton';
import { withRouter } from "react-router-dom";

//import { connect } from 'react-redux';

//import ViewProductsServices from '../View_Products_Services/ViewProductsServices';

const ViewBusiness = (props) =>{

    
    let phoneOutput = props.phones.map(ph =>{
            return <span  className={classes.SpanStyle} key={ph.id}>
                    {ph.phone_number}
                </span>
        })

    let ownerOutput = props.owners.map(owner =>{
            return <span className={classes.SpanStyle} key={owner.id}>
                    {owner.fname} {owner.lname}
                </span>
        })

    let addressOutput = props.address.map(address =>{
            return <span className={classes.SpanStyle} key={address.id}>
                    {address.city} {address.zipcode} {address.street} {address.street_number} 
                </span>
        })    

    if(!props.phones.length ){
        phoneOutput = "  No phone available yet "
    }

    if(!props.owners.length ){
        ownerOutput = "  No owners available yet "
    }
    if(!props.address.length ){
        addressOutput = " No address available yet "
    }

    const viewBusinessHandler = () => {   
       
        if(props.authenticated){
            props.history.push({
                pathname:"/viewProductsServices",
                businessIdSelected:props.business.id
            });
        }else{
            console.log("Not auhtenticated");
        }



    }
 
    return(
        <div className={classes.ViewBusiness}>
            <h4>{props.business.name}</h4>
            <p>Description : </p> <p>{props.business.info}</p> 
            <p>Phones:{phoneOutput}</p>
            <p>Owners:{ownerOutput}</p>
            <p>Address:{addressOutput}</p>
            <hr/>
            <MyButton  variant="info"  clicked={viewBusinessHandler } > View more information</MyButton> 
            {/* <MyButton variant="secondary">Open in Map</MyButton> */}

        </div>
    );
}

export default withRouter(ViewBusiness);