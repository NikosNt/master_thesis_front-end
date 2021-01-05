import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './Business_Info.module.css' ;
import {getDay} from '../../../../shared/utility';
import {Row,Col} from 'react-bootstrap'
import * as actions from '../../../../store/actions/index';



const Business_Info = (props) =>{

   const {OnFetchScheduleBusiness} = props;

    useEffect(() => {
        async function fetchData() {
            await OnFetchScheduleBusiness(props.business.business_id);
        }
        fetchData();
    }, [OnFetchScheduleBusiness,props.business.business_id]); 

    // useEffect( ()=>{
    //     OnFetchScheduleBusiness(props.business.business_id);
    // },[OnFetchScheduleBusiness,props.business.business_id])

    

    let phoneOutput = props.business.phones.map(ph =>{
            return <span  className={classes.SpanStyle} key={ph.id}>
                    {ph.phone_number}
                </span>
        })
    let ownerOutput = props.business.owner.map(owner =>{
            return <span className={classes.SpanStyle} key={owner.id}>
                    {owner.fname} {owner.lname}
                </span>
        })
    let addressOutput = props.business.address.map(address =>{
        return <span className={classes.SpanStyle} key={address.id}>
                {address.city} {address.zipcode} {address.street} {address.street_number} 
            </span>
    })    

    if(!props.business.phones.length ){
        phoneOutput = "  No phones available yet "
    }

    if(!props.business.owner.length ){
        ownerOutput = "  No owners available yet "
    }
    if(!props.business.address.length ){
        addressOutput = " No address available yet "
    }

 
    let schedule =props.businessSchedule.map(days => {
        return  <React.Fragment key={days.id}>
                    <Row >
                        <Col  sm={2} md={3} lg={3}>
                            {getDay(days.day)} 
                        </Col>
                        <Col    sm={10} md={9} lg={9}>
                            {days.state ===1 
                                ? days.hours.map(hour=>{
                                    return <span key={hour.id}  > {hour.opening} - {hour.closing} </span>})
                                :  
                                <span> Το ωράριο δεν είναι διαθέσιμο !</span>
                            }
                        </Col>
                    </Row>   
                    <br/>
                </React.Fragment>
    })




    return(
        <>
            <div className={classes.ViewBusiness}>
                <p><b>Πληροφορίες</b> : </p> <p>{props.business.info}</p> 
            </div>
            <Row className={classes.Rows}>
                <Col sm={12} md={6} className={classes.Cols}   >
                    <p><b>Ιδιοκτήτης</b> : {ownerOutput}</p>
                    <p><b>Τηλέφωνο</b> : {phoneOutput}</p>
                    <p><b>Διεύθυνση</b> : {addressOutput}</p>
                </Col>
                <Col sm={12} md={6}  className={classes.Cols} >
                    <p><b>Ωράριο λειτουργίας</b> : </p> 
                    {schedule}
                </Col>
            </Row>
            {/* <div className={classes.Rows}>
                <div >
                    <p><b>Ιδιοκτήτης</b> : {ownerOutput}</p>
                    <p><b>Τηλέφωνο</b> : {phoneOutput}</p>
                    <p><b>Διεύθυνση</b> : {addressOutput}</p>
                </div>
                <div >
                    <p><b>Ωράριο λειτουργίας</b> : </p> 
                    {schedule}
                </div>
            </div> */}

        </>
    )
}


const mapStateToProps = state => {
    return {
        businessSchedule: state.userPage.businessSchedule,
        isAuthenticated: state.auth.token !== null
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      OnFetchScheduleBusiness: (id)=> dispatch( actions.fetchScheduleBusiness(id) ),

    };
  };
  
  export default connect( mapStateToProps,mapDispatchToProps )(  Business_Info);

