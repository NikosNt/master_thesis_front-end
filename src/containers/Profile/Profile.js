import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './Profile.module.css';
import {Row,Col,Table } from 'react-bootstrap';
import * as actions from '../../store/actions/index';

const Profile = (props) =>{

  const {onGetUserData} = props;

  useEffect (()=>{
    async function fetchData() {
      onGetUserData(props.userId);
    }
    fetchData();
  },[onGetUserData,props.userId])

  console.log(props.userData);

  let loading = true;

  if(props.userData){
    console.log("exw")
    loading = false;
  }
  
  return(
    <>
    <div className={classes.Profile}>
    
      <div style={{marginTop:"25px"}}>
        <h3 style={{textAlign:"center"}}>Βασικές Πληροφορίες Χρήστη</h3>
      </div>
      <img src="no-person-image.png" height='300px' className={classes.Image}></img>
      <br/><br/>
      <div className={classes.Row}>
        <Row  >
          <Col lg={6} > <p className={classes.Headings}> Όνομα χρήστη : </p></Col>
          <Col lg={6}  ><p>{ props.userData.username} </p></Col>
        </Row>
        <Row >
          <Col lg={6}> <p className={classes.Headings}> Όνομα : </p></Col>
          <Col lg={6}><p >{props.userData.fname} </p></Col>
        </Row>
        <Row> <Col lg={6}><p className={classes.Headings}> Επώνυμο : </p></Col>
          <Col lg={6}><p>{ props.userData.lname}</p></Col>
        </Row>
        <Row>
          <Col lg={6}><p className={classes.Headings} > Ηλεκτρονική διεύθυνση :  </p></Col>
          <Col lg={6}><p >{ props.userData.email} </p></Col>
        </Row>
        
      </div>
    </div>
    </>

  )

}

const mapStateToProps = state => {
  return {
    userData:state.auth.userData,
    userId:state.auth.userId,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUserData: (id) => dispatch(actions.getUserData(id)),
  };
};

export default connect( mapStateToProps,mapDispatchToProps )(Profile);