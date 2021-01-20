import React,{useState} from 'react';
import { connect } from 'react-redux';
import classes from './ViewBusiness.module.css';
import MyButton from '../UI/Button/MyButton';
 
import { withRouter } from "react-router-dom";
import * as actions from '../../store/actions/index';
import Modal from '../UI/Modal/Modal';
import {getDay,getCurDate} from '../../shared/utility';
import {Col,Card} from 'react-bootstrap';
 
const ViewBusiness = (props) =>{

    const {OnLoadBusiness} = props;

    const [showModal,setShowModal] = useState(false);
    // const [open,setOpen] = useState(false)   ;
    // const [closed,setClosed] = useState(false)   ; to many rerenders


    let addressOutput = props.business.address.map(address =>{
            return <span className={classes.SpanStyle} key={address.id}>
                   <li> {address.city} {address.zipcode} {address.street} {address.street_number} </li>
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
        if( props.business.state === 0 ){
            closed=true;
        }else{
        scheduleDay =<i>Το ωράριο λειτουργίας δεν είναι διαθέσιμο !</i> }
    }

    const viewBusinessHandler = () => {   
        if(props.authenticated){
            OnLoadBusiness(props.business)
            props.history.push({
                pathname:"/view_a_business",
            });
            console.log(props.business)
        } 
        setShowModal(true);      
    }



    return(
        <>
            <Modal show={showModal} modalClosed={() => setShowModal(false)}>
                <h4 style={{textAlign:"center"}}>Please log in first :)</h4>
            </Modal>
            <Col  sm={12} md={6} lg={4} className={classes.Column} >
                <Card  className={classes.ViewBusiness}  >
                    <Card.Header style={{color:"#39a8a8",textAlign:"center"}}>{props.business.business_name}</Card.Header>  
                    <Card.Body>
                        {/* <p>Πληροφορίες : </p> <p>{props.business.info}</p>  */}
                        <p>Διεύθυνση :</p> {addressOutput}           
                        <p>Ωράριο λειτουργίας για  {getDay(props.business.day)} :  {scheduleDay}</p>
                        {open?<h6 className={classes.Open}>Ανοιχτά</h6>:null}
                        {!open && closed?<h6 className={classes.Closed} >Κλειστά</h6>:null}

                        <hr/><MyButton  variant="custom"  clicked={viewBusinessHandler } > View more information</MyButton>
                    </Card.Body>
                </Card>
            </Col>
             {/* <Col  sm={12} md={6} lg={4} >
            <div className={classes.ViewBusiness}>
                <h4 style={{color:"#39a8a8",textAlign:"center"}}>{props.business.business_name}</h4>
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
                 <hr/><MyButton  variant="custom"  clicked={viewBusinessHandler } > View more information</MyButton>
               
            </div></Col> */}

             {/* <MyButton variant="secondary">Open in Map</MyButton> */}
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
// const mapStateToProps = state => {
//     return {
    
//     };
//   };
  
  const mapDispatchToProps = dispatch => {
    return {
      OnLoadBusiness: (business)=> dispatch( actions.loadBusiness(business) ),  
    };
  };
export default connect( null,mapDispatchToProps )(withRouter(ViewBusiness));