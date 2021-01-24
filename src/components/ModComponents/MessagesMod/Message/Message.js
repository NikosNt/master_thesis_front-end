import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import classes from './Message.module.css';
import * as actions from '../../../../store/actions/index';

import {getCurDate} from '../../../../shared/utility'
import ViewMessages from '../../../Messages/ViewMessages/ViewMessages';
import NewMessage from '../../../Messages/NewMessage/NewMessage';
const Message = (props) =>{

    const {OnFetchdBusinessUserMessages} = props;

    const [contentTitle,setContentTitle] = useState('')
    const [contentMessage,setContentMessage] = useState('')

    useEffect(() => {
        async function fetchData() {
             
                await OnFetchdBusinessUserMessages(props.valueSender,props.businessId);
             
        }
        fetchData();
    }, [OnFetchdBusinessUserMessages,props.businessId,props.valueSender]); 


    let messages = props.business_user_messages.map(sms => (
        sms.sender === 1 ?
               <div  key={sms.id} className={classes.Left}>
               <p>User:</p>
                   <ViewMessages message={sms}/>
               </div>   
               :                
               <div  key={sms.id} className={classes.Right}>
                   <p>You:</p>
                   <ViewMessages message={sms}/>
               </div>  
 
    ))
   
    if (!props.business_user_messages.length){
       messages=(<p style={{textAlign:"center"}}>No messages Available  </p>)
    }

    const sendMessageHandler = () => {
        const m ={
            businessId: props.businessId,
            userId: Number(props.valueSender),
            sender: 0,
            title: contentTitle,
            message: contentMessage,
            date_time: getCurDate().day_time
        }
        console.log(m);
        //OnAddNewMessage(m);
        setContentTitle('');
        setContentMessage('');
    }

    return(
        <>  
            <div>
                {messages}
            </div>
            <div className={classes.NewM}>
                <NewMessage 
                            changed={sendMessageHandler}
                            cTitle={contentTitle}
                            titleChanged={(e)=>setContentTitle(e.target.value)}
                            cMessage={contentMessage}
                            messageChanged={(e)=> setContentMessage(e.target.value)}
                            />
            </div>
        </> 
    )
}

const mapStateToProps = state => {
    return {
        business_user_messages:state.messages.business_user_messages
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnFetchdBusinessUserMessages : (userId,busId) => dispatch(actions.fetchdBusinessUserMessages(userId,busId)),
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )(Message);