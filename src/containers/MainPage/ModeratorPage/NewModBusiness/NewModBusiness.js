import React from 'react';
import { connect } from 'react-redux';

import classes from './NewModBusiness.module.css';
import MyButton from '../../../../components/UI/Button/MyButton'

import * as actions from '../../../../store/actions/index';

const NewModBusiness = (props) =>{

    const {onCreateBusiness} = props;

    const changeValueForm = () => {
        props.newModBusiness.moderatorId = props.userId;
        onCreateBusiness(props.newModBusiness);
    } 

    return(
        <>
            <div className={classes.Title}>
                <h1 > Create new Business or Service</h1>
                <h5 style={{marginTop:"20px"}}>First step for creating your new Business / Service</h5>
                <p>Add Business name, Information and your Reference Site </p>
            </div>
            <div className={classes.Form}>
                <br/>
                <div className={classes.View}> 
                    <span>Business owner ID : {props.userId} </span>    
                </div>
                <div className={classes.View}>
                    <span>Business Name: </span>
                    <input style={{width:"70%"}}  onChange={ (event) =>{props.newModBusiness.business_name = event.target.value} } /> 
                </div>
                <div className={classes.View}>
                    <p>Information: </p>   
                    <textarea style={{width:"100%",height:"130px"}} onChange={ (event) =>{props.newModBusiness.info = event.target.value} }/>  
                </div>
                <div className={classes.View}>
                    <span>Reference Site: </span>
                    <input style={{width:"70%"}} onChange={ (event) =>{props.newModBusiness.ref = event.target.value} } /> 
                </div>
                <br/>
                <MyButton variant="success"  clicked={changeValueForm} > Create Business </MyButton>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        newModBusiness:state.modPage.newModBusiness,
        userId:state.auth.userId,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onCreateBusiness: (newModBusiness)=> dispatch( actions.createBusiness(newModBusiness) ),
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( NewModBusiness );