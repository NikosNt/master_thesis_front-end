import React from 'react';
import classes from './Footer.module.css';

const footer = (props) =>{
    return(
        <div className={classes.Footer}>
            <p>© 2020 Copyright Nikos Ntantinakis, Nile Lab</p>
        </div>
    )
}

export default footer;