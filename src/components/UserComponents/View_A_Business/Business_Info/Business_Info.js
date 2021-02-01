import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './Business_Info.module.css' ;
import {getDay} from '../../../../shared/utility';
import {Row,Col} from 'react-bootstrap'
import * as actions from '../../../../store/actions/index';
import {Rating} from '@material-ui/lab';

const Business_Info = (props) =>{
 

   const {OnFetchScheduleBusiness,} = props;

   const [valueRating, setValueRating] = React.useState(props.businesRatingOfUser);//GIA TO RATING

    useEffect(() => {
        async function fetchData() {
            await OnFetchScheduleBusiness(props.business.business_id);
        }
        fetchData();
    }, [OnFetchScheduleBusiness,props.business.business_id]); 
  
    let phoneOutput = props.business.phones.map(ph =>{
            return <React.Fragment key={ph.id}><span  className={classes.SpanStyle} >
                    {ph.phone_number}
                </span><br/></React.Fragment>
        })
    let ownerOutput = props.business.owner.map(owner =>{
            return <span className={classes.SpanStyle} key={owner.id}>
                    {owner.fname} {owner.lname}
                </span>
        })
    let addressOutput = props.business.address.map(address =>{
        return <React.Fragment key={address.id}><span className={classes.SpanStyle}>
                {address.city} {address.zipcode} {address.street} {address.street_number} 
            </span><br/></React.Fragment>
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
                                : days.state === 0 ? <span>Το κατάστημα  είναι κλειστό </span>:
                                    <span> Το ωράριο δεν είναι διαθέσιμο !</span>
                            }
                        </Col>
                    </Row><br/>
                </React.Fragment>
    })


    console.log(props.businesRatingOfUser);
    return(
        <>
            <div className={classes.Rating}>
                <span>
                    <p>Αξιολόγηση : </p>   
                    <Rating name="half-rating" defaultValue={valueRating} precision={0.1} onChange={(event, newValue) => {console.log(newValue) }} />
                </span>            
            </div>
            <div className={classes.ViewBusiness}>
                <p><b>Πληροφορίες</b> : </p> <p>{props.business.info}</p> 
            </div>
            <p className={classes.Rows}><b>Ιδιοκτήτες</b> : {ownerOutput}</p>

            <Row className={classes.Rows}>
                <Col sm={12} md={6} className={classes.Cols}   >
                    <p><b>Ωράριο λειτουργίας</b> : </p> 
                    {schedule}                   
                </Col>
                <Col sm={12} md={6}  className={classes.Cols} >
                    <p><b>Τηλέφωνα επικοινωνίας :</b></p> <p>  {phoneOutput}</p>
                    <p><b>Διεύθυνση</b> : </p> <p>{addressOutput}</p>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => {
    return {
        businessSchedule: state.schedule.businessUserSchedule,
        businesRatingOfUser:state.rating.businesRatingOfUser
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      OnFetchScheduleBusiness: (id)=> dispatch( actions.fetchUserScheduleBusiness(id) ),
    };
  };
  
  export default connect( mapStateToProps,mapDispatchToProps )(  Business_Info);

//npm install @material-ui/lab