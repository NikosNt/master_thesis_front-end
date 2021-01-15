import React from 'react';

const ViewMessages = (props) =>{
    return(
            <div >
                <p><b>Title : </b>{props.message.title}  </p>               
                <p><b>Message :</b> </p><p>{props.message.message}</p>
                <p> {props.message.date_time}</p>
            </div>  
    )
}

export default ViewMessages;

