import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './Business_Info.module.css' ;
import {getDay} from '../../../../shared/utility';
import {Row,Col} from 'react-bootstrap'
import * as actions from '../../../../store/actions/index';
import {Rating} from '@material-ui/lab';
import axios from '../../../../axios-orders';
import * as Icon from 'react-bootstrap-icons';

const Business_Info = (props) =>{
 

   const {OnFetchScheduleBusiness,OnUserUpdateRatingToBusiness} = props;

   const [valueRating, setValueRating] = React.useState(0);
   const [isRated,setIsRated] = useState(false);
   const [ratingId,setRatingId] = useState(-1);

   const getData = async () =>{
        await axios.get('api/rating/by/' + props.business.business_id +'/'+props.userId)
        .then(res => {
            const data = res.data;
           // console.log(data)
            if(data){
                setValueRating(data.rating);
                setIsRated(true);
                setRatingId(data.id)
            }
        })
        .catch(err => {
            console.log(err)
        });
   }

    useEffect(() => {
        getData();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        async function fetchData() {
            await OnFetchScheduleBusiness(props.business.business_id);
        }
        fetchData();
    }, [OnFetchScheduleBusiness,props.business.business_id,]); 
  
    let phoneOutput = props.business.phones.map(ph =>{
            return <React.Fragment key={ph.id}><span  className={classes.SpanStyle} >
                    <Icon.TelephoneFill  /> {ph.phone_number}
                </span><br/></React.Fragment>
        })
    let ownerOutput = props.business.owner.map(owner =>{
            return <span className={classes.SpanStyle} key={owner.id}>
                    {owner.fname} {owner.lname}
                </span>
        })
    let addressOutput = props.business.address.map(address =>{
        return <React.Fragment key={address.id}><span className={classes.SpanStyle}>
                  <Icon.GeoFill size={20} /> {address.city} {address.zipcode} {address.street} {address.street_number} 
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


    const addNewRating = async (newRating) =>{
       // console.log(newRating);
        await axios.post('api/rating/add' , newRating)
        .then(res => {
            console.log("added epitixos", res);
            setIsRated(true);
            setRatingId(res.data.id)
        })
        .catch(err => {
            console.log(err)
        });
   }

    const changeRatingHandler = (newValue) =>{
        setValueRating(newValue);
        if(isRated){
            console.log("Exei eidh ginei")
            const updateRating ={
                businessId:props.business.business_id,
                userId:Number(props.userId),
                rating:newValue
            }
           // console.log(updateRating)
            OnUserUpdateRatingToBusiness(updateRating,ratingId);
        }else{
            console.log("Den exei ginei")
            const newRating ={
                businessId:props.business.business_id,
                userId:Number(props.userId),
                rating:newValue
            }
            addNewRating(newRating);           
        }
        
    }

    return(
        <>

            <div className={classes.ViewBusiness}>
                <Icon.InfoCircle size={30}  />  
                <p style={{marginTop:"10px"}}>{props.business.info}</p> 
            </div>
            <p className={classes.Rows}><b>Ιδιοκτήτες</b> : {ownerOutput}</p>
            

            <Row className={classes.Rows}>
                <Col sm={12} md={6} className={classes.Cols}   >
                    <p><b>Ωράριο λειτουργίας</b> : </p> 
                    {schedule}                   
                </Col>
                <Col sm={12} md={6}  className={classes.Cols} >

                    <p><b>Τηλέφωνα επικοινωνίας :</b></p><p>{phoneOutput}</p>
                    { props.business.ref === null ?
                                <p> Δεν υπάρχει ιστοσελίδα διαθέσιμη</p>
                                :<><p><b>Σύνδεσμος :</b> </p><a href={props.business.ref} target="_blank" rel="noreferrer">  {props.business.ref} </a></>
                    }
                    {/* <p><b>E-mail :</b> </p><p><Icon.EnvelopeFill/> {props.business.ref}</p> */}
                    <p><b>Διεύθυνση :</b></p><p>{addressOutput}</p>
                </Col>
            </Row>
            <div className={classes.Rating}>
                <span>
                    <p>Αξιολόγηση : </p>   
                    <Rating name="half-rating" value={valueRating} precision={0.5} onChange={(event, newValue) => {changeRatingHandler(newValue) }} />
                </span>            
            </div>            
        </>
    )
}

const mapStateToProps = state => {
    return {
        businessSchedule: state.schedule.businessUserSchedule,
        userId:state.auth.userId,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnFetchScheduleBusiness: (id)=> dispatch( actions.fetchUserScheduleBusiness(id) ),
        OnUserUpdateRatingToBusiness: (rating,id)=> dispatch( actions.userUpdateRatingToBusiness(rating,id) ),
    };
  };
  
  export default connect( mapStateToProps,mapDispatchToProps )(  Business_Info);

