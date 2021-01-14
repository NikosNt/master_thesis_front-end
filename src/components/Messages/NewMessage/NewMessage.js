import React from 'react';

import MyButton from '../../UI/Button/MyButton'
import classes from './NewMessage.module.css' ;

const NewMessage = (props) =>{

    return(
        <>
            <div className={classes.NewMessage}>
                <p>Title :</p>
                <input  style={{width:"95%"}} value={props.cTitle} onChange={props.titleChanged}></input>
                <p>New Message :</p>
                <textarea style={{width:"95%",height:"130px" }} value={props.cMessage}  onChange={props.messageChanged} ></textarea> 
                <MyButton variant="info" clicked={props.changed}> Add Message</MyButton>
            </div>    
        </>
    )
        
}

export default NewMessage;

