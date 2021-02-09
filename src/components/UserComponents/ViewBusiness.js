import React,{useState} from 'react';
import { connect } from 'react-redux';
import classes from './ViewBusiness.module.css';
import MyButton from '../UI/Button/MyButton';
 
import { withRouter } from "react-router-dom";
import * as actions from '../../store/actions/index';
import Modal from '../UI/Modal/Modal';
import {getDay,getCurDate} from '../../shared/utility';
import {Col,Card} from 'react-bootstrap';
import {Rating} from '@material-ui/lab'; 
import * as Icon from 'react-bootstrap-icons';
const ViewBusiness = (props) =>{

    const {OnLoadBusiness} = props;

    const [showModal,setShowModal] = useState(false);
    // const [open,setOpen] = useState(false)   ;
    // const [closed,setClosed] = useState(false)   ; to many rerenders

    let addressOutput = props.business.address.map(address =>{
            return <div className={classes.SpanStyle} key={address.id}>
                   <Icon.GeoFill size={20} /> {address.city} {address.zipcode} {address.street} {address.street_number}  
                </div>
        })    

    if(!props.business.address.length ){
        addressOutput = " Δεν υπάρχει διαθέσιμη διεύθυνση  "
    }

    let phonesOutput = props.business.phones.map(phone =>{
        return <div className={classes.SpanStyle} key={phone.id}>
              <Icon.TelephoneFill size={20} /> {phone.phone_number}  
            </div>
    })    

    if(!props.business.phones.length ){
        phonesOutput = (<><i> Δεν υπάρχει διαθέσιμο τηλέφωνο </i></>);
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
        if( props.business.state === 0 ){
            closed=true;
        }else{
        scheduleDay =<i>Το ωράριο λειτουργίας δεν είναι διαθέσιμο !</i> }
    }

    //console.log(props.business.address)

    const viewBusinessHandler = () => {   
        if(props.authenticated){
            OnLoadBusiness(props.business)
            props.history.push({
                pathname:"/view_a_business",
            });
            //console.log(props.business)
        } 
        setShowModal(true);      
    }
    const viewMapOfBusinessHandler = () => {   
       //if(props.authenticated){
            props.history.push({
                pathname:"/viewMap",
                state: {business:props.business}
            });
       //} 
       //setShowModal(true);      
    }
    // const mapHandler = () => {
    //     props.history.push({
    //         pathname:"/viewMap",
    //         state: {business:props.business}
    //     });
    // }


    return(
        <>
            <Modal show={showModal} modalClosed={() => setShowModal(false)}>
                <h4 style={{textAlign:"center"}}>Please log in first :)</h4>
            </Modal>
            <Col  sm={12} md={6} lg={6} xl={4} className={classes.Column} >
                <Card  className={classes.ViewBusiness}  >
                    <Card.Header style={{color:"#39a8a8",textAlign:"center",fontSize:"22px"}}>{props.business.business_name}</Card.Header>  
                    <Card.Body>
                        <div className={classes.Rating}>             
                           {props.business.rating === -1 ?<p>Δεν υπάρχει αξιολόγηση</p> : <Rating  name="half-rating" defaultValue={props.business.rating} precision={0.1} readOnly  />} 
                        </div>                      
                        {/* <p>Διεύθυνση :</p> {addressOutput}            */}
                        <p>Τηλέφωνα : </p>{phonesOutput}<br/><br/>
                        <p>Ωράριο λειτουργίας για  {getDay(props.business.day)} :  </p><p>{scheduleDay}</p>
                        {open?<h6 className={classes.Open}>Ανοιχτά</h6>:null}
                        {!open && closed?<h6 className={classes.Closed} >Κλειστά</h6>:null}
                        <hr/>
                        <MyButton  variant="custom"  clicked={viewBusinessHandler } >Δείτε περισσότερες πληροφορίες</MyButton>
                        <MyButton variant="success" clicked={viewMapOfBusinessHandler }>Άνοιγμα στον χάρτη</MyButton>
                    </Card.Body>
                </Card>
            </Col>
             
            <style type="text/css">
                {`
                    .btn-custom {
                        color: #fff;
                        background-color: #9b8554bf;
                        
                    }
                `}
            </style>
        </>
    );
}
const mapStateToProps = state => {
    return {
        userId:state.auth.userId,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      OnLoadBusiness: (business)=> dispatch( actions.loadBusiness(business) ),  
    };
  };
export default connect( mapStateToProps,mapDispatchToProps )(withRouter(ViewBusiness));