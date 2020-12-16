import React from 'react';

import classes from './ViewAllServices.module.css';
import MyButton from '../../UI/Button/MyButton';

const ViewAllServices = (props) =>{

    return(
        <div className={classes.ViewBusiness}>
            <h4>{props.name}</h4>
            <p>ID : {props.business_id}</p> 
            <p>Moderator ID:{props.id_buss_mod}</p>
            <hr/>
            <MyButton clicked={props.onClick}  variant="danger"> Delete</MyButton> 
        </div>
    );

}
export default ViewAllServices