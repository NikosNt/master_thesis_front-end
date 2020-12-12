import React from 'react';
import { connect } from 'react-redux';
import classes from './ExistingModBusiness.module.css';
import MyButton from '../../../../components/UI/Button/MyButton'

const ExistingModBusiness = (props) =>{

   const propDelete = (id) =>{
        console.log("To id ",id);
    }


    let phoneOutput = props.modBusiness.phones.map(ph =>(
        <div key={ph.id}>
            {/* <input type="text" defaultValue={ph.phone_number} disabled/> */}
            <span>{ph.phone_number}</span>
            <MyButton variant="danger" clicked={() => propDelete(ph.id)}> Delete</MyButton>
        </div>  
    ))




    let ownerOutput = props.modBusiness.owner.map(owner =>{
    return <span className={classes.SpanStyle} key={owner.id}>
                {owner.fname} {owner.lname}
            </span>
    })

    let addressOutput = props.modBusiness.address.map(address =>{
    return <span className={classes.SpanStyle} key={address.id}>
                {address.city} {address.zipcode} {address.street} {address.street_number} 
            </span>
    })  

    let TypeOutput = props.modBusiness.b_type.map(tupos =>{
    return <span className={classes.SpanStyle} key={tupos.id}>
                {tupos.type} 
            </span>
    })  

    return(
        <>
            <h1 className={classes.Title}> Update Business / Service Information</h1>
            <div className={classes.ViewBusiness}>
                <p>Business ID : {props.modBusiness.id}</p>
                <p>Business owner ID : {props.modBusiness.moderatorId}</p>
                <p>Business Name: </p> {props.modBusiness.business_name}
                <p>Business Rating : {props.modBusiness.rating}</p>
                <p>Info: </p> {props.modBusiness.info}
                <br/>
                <MyButton variant="info" > Update </MyButton>
            </div>
            <div className={classes.ViewBusiness}>
                <h5>Phones:</h5>
                {phoneOutput}
                <input maxLength="10" /><MyButton variant="success" > Add</MyButton>
            </div>
            <div className={classes.ViewBusiness}>
                <h5>Owners:</h5>{ownerOutput}
            </div>
            <div className={classes.ViewBusiness}>
                <h5>Address:</h5>{addressOutput}
            </div>
            <div className={classes.ViewBusiness}>
                <h5>Types:</h5>{TypeOutput}
            </div>
           
        </>
    )

}

const mapStateToProps = state => {
    return {
        modBusiness:state.modPage.modBusiness,
        userId:state.auth.userId,
        hasRole:state.auth.role,
        token:state.auth.token,
        isAuthenticated: state.auth.token !== null
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( ExistingModBusiness );