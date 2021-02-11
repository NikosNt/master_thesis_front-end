import React,{useState} from 'react';
import { connect } from 'react-redux';
import classes from './ViewBusiness.module.css';
 
import UIBusiness from './UI_Business'

import { withRouter } from "react-router-dom";
import * as actions from '../../store/actions/index';
import Modal from '../UI/Modal/Modal';
import {getCurDate} from '../../shared/utility';
import { getDistance } from 'geolib';
import * as Icon from 'react-bootstrap-icons';
const ViewBusiness = (props) =>{

    const {OnLoadBusiness} = props;

    const [showModal,setShowModal] = useState(false);
    //const [nearMe,setNearMe] = useState(false);
    
    //console.log(props.lat +" - "+props.long)
 
    // const [open,setOpen] = useState(false)   ;
    // const [closed,setClosed] = useState(false)   ; to many rerenders

    // let addressOutput = props.business.address.map(address =>{
    //         return <div className={classes.SpanStyle} key={address.id}>
    //                <Icon.GeoFill size={20} /> {address.city} {address.zipcode} {address.street} {address.street_number}  
    //             </div>
    //     })    

    // if(!props.business.address.length ){
    //     addressOutput = " Δεν υπάρχει διαθέσιμη διεύθυνση  "
    // }

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

  //  console.log(props.business)
  let nearMe=false;
    if(props.business.address.length){
        for (let i=0;i<props.business.address.length;i++){
         let ap = getDistance(
            { latitude: props.lat , longitude: props.long  },
            { latitude:props.business.address[i].latitude, longitude: props.business.address[i].longitude }
            );
            if(ap <=props.radiousValue ){
                nearMe = true;
              //  console.log(nearMe)
            }
    
          //  console.log("H apostash", ap);
        }
    }

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
            props.history.push({
                pathname:"/viewMap",
                state: {business:props.business,
                        radious:props.radiousValue}
            }); 
    }

    let setComponentBusiness = ( <UIBusiness  business={props.business}
                                                phones={phonesOutput}
                                                schedule={scheduleDay}
                                                open={open}
                                                close={closed}
                                                infoClicked={viewBusinessHandler}
                                                mapClicked={viewMapOfBusinessHandler}/>
                                ); 
    let viewBusiness = '';
    if( !props.checkedOpen &&  props.radiousValue === -1){//den xrisimopoiei ekstra filtra
        viewBusiness = setComponentBusiness
    }
    if(  props.checkedOpen && open  && !nearMe){//mono to open
        viewBusiness = setComponentBusiness
    }
    if (nearMe && !props.checkedOpen){//mono to near me
        viewBusiness = setComponentBusiness 
    }
    if(nearMe && props.checkedOpen && open){//xrhsimopoiei kai ta 2 filtra
        viewBusiness = setComponentBusiness
    }

    // switch (true ) {
    //     case  (!props.checkedOpen &&  props.radiousValue === -1 ) :console.log("1"); viewBusiness = setComponentBusiness ;break;//den xrisimopoiei ekstra filtra
    //     case  (props.checkedOpen && open  && !nearMe) :console.log("2"); viewBusiness = setComponentBusiness ;break;//mono to open
    //     case  (nearMe && !props.checkedOpen) :console.log("3"); viewBusiness = setComponentBusiness ;break;//mono to near me
    //     case  (nearMe && props.checkedOpen && open) :console.log("4"); viewBusiness = setComponentBusiness ;break;//xrhsimopoiei kai ta 2 filtra
    //     default :console.log("5"); viewBusiness = setComponentBusiness;
    // }

 
    return(
        <>
            <Modal show={showModal} modalClosed={() => setShowModal(false)}>
                <h4 style={{textAlign:"center"}}>Please log in first :)</h4>
            </Modal>
            {!viewBusiness ? null : viewBusiness}
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
        checkedOpen:state.userPage.checkedOpen,
        radiousValue:state.userPage.radiousValue
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      OnLoadBusiness: (business)=> dispatch( actions.loadBusiness(business) ),  
    };
  };
export default connect( mapStateToProps,mapDispatchToProps )(withRouter(ViewBusiness));