import React ,{useEffect,useState} from 'react';
import { connect } from 'react-redux';

import NewMessage from '../../../Messages/NewMessage/NewMessage';
import ViewMessages from '../../../Messages/ViewMessages/ViewMessages';

import {getCurDate} from '../../../../shared/utility'

import * as actions from '../../../../store/actions/index';
import classes from './Business_messages.module.css' ;

const Business_messages = (props) =>{

    const {OnfetchMessages,OnAddNewMessage} = props;

    useEffect(() => {
        async function fetchData() {
            await OnfetchMessages(props.userId,props.businessID);
        }
        fetchData();
    }, [OnfetchMessages,props.businessID,props.userId]); 

    const [contentTitle,setContentTitle] = useState('')
    const [contentMessage,setContentMessage] = useState('')

    //console.log(props.business_user_messages)

    let messages = props.business_user_messages.map(sms => (
         sms.sender === 0 ?
                <div  key={sms.id} className={classes.Left}>
                    <ViewMessages message={sms}/>
                </div>   
                :                
                <div  key={sms.id} className={classes.Right}>
                    <ViewMessages message={sms}/>
                </div>  
  
    ))
    
    if (!props.business_user_messages.length){
        console.log("mphka")
        messages=(<p style={{textAlign:"center"}}>Send a message and communicate !</p>)
    }

    const sendMessageHandler = () => {
         const m ={
                businessId: props.businessID,
                userId: Number(props.userId),
                sender: 1,
                title: contentTitle,
                message: contentMessage,
                date_time: getCurDate().day_time
         }
         OnAddNewMessage(m);
         setContentTitle('');
         setContentMessage('');
    }

    return(
        <>
        {/* <p style={{textAlign:"center"}} >Ta messages {props.businessID}  kai {props.userId}</p> */}
            <div className={classes.Page}>
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
       userId :state.auth.userId ,
       business_user_messages: state.userPage.business_user_messages
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      OnfetchMessages: (userId,busId)=> dispatch( actions.fetchdBusinessUserMessages(userId,busId) ),
      OnAddNewMessage: (message)=> dispatch( actions.addNewMessageToBusiness(message) ),  
    };
  };
  
export default connect( mapStateToProps,mapDispatchToProps )(Business_messages);

