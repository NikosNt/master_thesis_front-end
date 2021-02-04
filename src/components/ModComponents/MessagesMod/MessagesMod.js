import React,{useState} from 'react';
import { connect } from 'react-redux';

import Message from './Message/Message';
import ViewSenders from './ViewSenders/ViewSenders';
import Modal from '../../UI/Modal/Modal';
import * as actions from '../../../store/actions/index';

import classes from './MessagesMod.module.css';
import {Row,Col} from 'react-bootstrap';
 

const MessagesMod = (props) =>{

    const {OnLoadFail} = props;
  
    const [senderSelected,setSenderSelected] = useState(-1)

    return(
        <>
        <Modal show={props.failMessage} modalClosed={() => OnLoadFail(false) }>
          <p style={{textAlign:"center"}}>An error has occured !</p>
        </Modal>
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

const mapStateToProps = state => {
    return {
        failMessage:state.messages.failMessage
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnLoadFail:(err)=>dispatch(actions.failMessage(err))
    };
  };
export default connect( mapStateToProps,mapDispatchToProps )(  MessagesMod);