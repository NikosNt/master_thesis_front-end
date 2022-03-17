import React from 'react';
import { connect } from 'react-redux';

import classes from './NewModBusiness.module.css';
import MyButton from '../../../../components/UI/Button/MyButton'

import * as actions from '../../../../store/actions/index';

const NewModBusiness = (props) =>{

    const {onCreateBusiness} = props;

    const changeValueForm = () => {
        props.newModBusiness.moderatorId = props.userId;
        props.newModBusiness.rating = -1 ;
        onCreateBusiness(props.newModBusiness);
    } 

    return(
        <>
            <div className={classes.Title}>
                <h1 >Δημιουργία νέας επιχείρησης ή υπηρεσίας</h1>
                <h5 style={{marginTop:"20px"}}>Πρώτο βήμα για τη δημιουργία της νέας επιχείρησης / υπηρεσίας σας</h5>
                <p>Προσθέστε το όνομα της επιχείρησης, τις πληροφορίες και τον ιστότοπο αναφοράς σας</p>
            </div>
            <div className={classes.Form}>
                <br/>
                <div className={classes.View}>
                    <span>Επωνυμία Επιχείρησης: </span>
                    <input style={{width:"70%"}}  onChange={ (event) =>{props.newModBusiness.business_name = event.target.value} } /> 
                </div>
                <div className={classes.View}>
                    <p>Πληροφορίες: </p>   
                    <textarea style={{width:"100%",height:"130px"}} onChange={ (event) =>{props.newModBusiness.info = event.target.value} }/>  
                </div>
                <div className={classes.View}>
                    <span>Ιστότοπος αναφοράς: </span>
                    <input style={{width:"70%"}} onChange={ (event) =>{props.newModBusiness.ref = event.target.value} } /> 
                </div>
                <br/>
                <MyButton variant="success"  clicked={changeValueForm} > Δημιουργία επιχείρησης </MyButton>
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