import React from 'react';

import classes from './ViewBusiness.module.css';
import MyButton from '../UI/Button/MyButton';

const ViewBusiness = (props) =>{

    return(
        <div className={classes.ViewBusiness}>
            <p>Business Name</p>
            <p>Phones:</p>
            <p>Owners:</p>
            <p>Phones:</p>

            <MyButton variant="success"> View more information</MyButton><br/>
            <MyButton variant="outline-warning">Open in Map</MyButton>
            
        </div>
    );
}
export default ViewBusiness