import React from 'react';

import classes from './ViewMessages.module.css' ;

const ViewMessages = (props) =>{



    return(
            <div className={classes.ViewMessage}>
                <p><b>Title : </b>{props.message.title}  </p>               
                <p><b>Message :</b> </p><p>{props.message.message}</p>
                <p> {props.message.date_time}</p>
            </div>  
    )
}

export default ViewMessages;

