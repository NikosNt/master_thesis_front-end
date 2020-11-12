import React from 'react';

import classes from './StartingInfo.module.css'
//import Jumbotron  from 'react-bootstrap/Jumbotron';
//import Container  from 'react-bootstrap/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';

const startingInfo = (props) =>{

    return(
        <div className={classes.Info} >
                <h1 >Search any type of business, store you want !! </h1>
                <p> _____ can help you search and find any type o business/store like <br/>
                 doctors, restaurants, bars, hotels etc.. in your area</p> 
        </div>
    )

}

export default startingInfo;