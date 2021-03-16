import React from 'react';

import classes from './ViewAllServices.module.css';
import MyButton from '../../UI/Button/MyButton';

const ViewAllServices = (props) =>{

    return(
        <div className={classes.ViewBusiness}>
            <h4 style={{textAlign:'center'}}>{props.name}</h4>
            <p>Tο id της επηχείρησης ειναι : {props.business_id}</p> 
            <p>Το id του ιδιοκτήτη της επιχείρησης είναι : {props.id_buss_mod}</p>
            <hr/>
            <MyButton clicked={props.onClick}  variant="danger"> Διαγραφή</MyButton> 
        </div>
    );

}
export default ViewAllServices