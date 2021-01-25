import React from 'react';
import {Card} from 'react-bootstrap';

const ViewMessages = (props) =>{
    return(
            <Card >
                <Card.Header><p><b>  {props.message.title} </b> </p> </Card.Header>
                <Card.Body>
                                  
                    {/* <p><b>Message :</b> </p> */}
                    <p>{props.message.message}</p>
                    <p> {props.message.date_time}</p>
                </Card.Body>
            </Card>  
    )
}

export default ViewMessages;

