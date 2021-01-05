import React,{useState} from 'react';

import classes from './ViewBusiness.module.css';
import MyButton from '../../UI/Button/MyButton';
import { withRouter } from "react-router-dom";

import Modal from '../../UI/Modal/Modal';
import {getDay,getCurDate} from '../../../shared/utility';
import {Row,Col} from 'react-bootstrap';

const ViewBusiness = (props) =>{


    const [messageAuthenticate,setMessageAuthenticate] = useState('');
    const [showModal,setShowModal] = useState(false);   
    // const [open,setOpen] = useState('');


    let addressOutput = props.business.address.map(address =>{

            return <span className={classes.SpanStyle} key={address.id}>
                    {address.city} {address.zipcode} {address.street} {address.street_number} 
                </span>
        })    

    if(!props.business.address.length ){
        addressOutput = " No address available yet "
    }


    let open = false;
    let closed = false;
    let scheduleDay = props.business.hours.map(hours =>{
        const wra = getCurDate();
        return <span className={classes.SpanStyle} key={hours.id}>
              <u>{hours.opening} : {hours.closing}</u>
              {wra.hour > hours.opening && wra.hour < hours.closing ? open = true : closed = true}
            </span>
    })    

    if(!props.business.hours.length){
        scheduleDay =<i>Το ωράριο λειτουργίας δεν είναι διαθέσιμο !</i> 
    }


    // if(props.business.hours.length){
    //     const wra = getCurDate();
    //     console.log("wra : ",wra.hour);
    //     props.business.hours.map(hours => {
    //         console.log(wra.hour+ " > "+ hours.opening+ " && "+ wra.hour +" < "+ hours.closing)
    //         if(wra.hour > hours.opening && wra.hour < hours.closing){
    //           //  setOpen("OPEN")
    //             console.log("eimai anoixta ")
    //         }else{
    //             console.log("eimai kleista")
    //         }
    //     })
    //     //na ftiaksw edw ti sin8ikh me to wrario
        
    // }

    const viewBusinessHandler = () => {   
        if(props.authenticated){
            props.history.push({
                pathname:"/view_a_business",
                business:props.business
            });
        } 
        setMessageAuthenticate ("Please log in first");
        setShowModal(true);
         
    }

    return(
        <>
            <Modal show={showModal} modalClosed={() => setShowModal(false)}>
                <h4 style={{textAlign:"center"}}>{messageAuthenticate}</h4>
            </Modal>
            <div className={classes.ViewBusiness}>
                <h4>{props.business.business_name}</h4>
                <p>Πληροφορίες : </p> <p>{props.business.info}</p> 
                <p>Διεύθυνση :{addressOutput}</p>            
                <Row>
                    <Col xs={8} sm={9} md={10}>
                         <p>Ωράριο λειτουργίας για  {getDay(props.business.day)} :  {scheduleDay}</p>
                    </Col>
                    <Col xs={4} sm={3} md={2} >
                        {open?<h6 className={classes.Open}>Ανοιχτά</h6>:null}
                        {!open && closed?<h6 className={classes.Closed} >Κλειστά</h6>:null}
                    </Col>
                </Row>
                 <hr/><MyButton  variant="info"  clicked={viewBusinessHandler } > View more information</MyButton>
                {/* <MyButton variant="secondary">Open in Map</MyButton> */}
            </div>
        </>
    );
}

export default withRouter(ViewBusiness);