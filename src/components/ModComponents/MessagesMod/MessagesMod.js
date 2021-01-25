import React,{useState} from 'react';
import Message from './Message/Message';
import ViewSenders from './ViewSenders/ViewSenders';
import classes from './MessagesMod.module.css';
import {Row,Col} from 'react-bootstrap';
 

const MessagesMod = (props) =>{

    const [senderSelected,setSenderSelected] = useState(-1)

    return(
        <>
        <h4 className={classes.Header}> Ta Messages</h4>
        <div style={{margin:"10px"}}>
            <Row  className={classes.Row}>
                <Col xs={12} md={6}  lg={4}  className={classes.Left}  >
                    <ViewSenders businessId={props.modBusiness.id}  valueSender={(id)=> setSenderSelected(id)} />
                </Col>
                <Col xs={12} md={6} lg={8} className={classes.Right}  >
                    <Message  businessId={props.modBusiness.id} valueSender={senderSelected}/>
                </Col>       
            </Row>
        </div>
        </> 
    )
}

export default  MessagesMod;