import React,{useState} from 'react';
import { connect } from 'react-redux';
import classes from './BasicBusinessInfo.module.css';
import MyButton from '../../../../../components/UI/Button/MyButton'
import DeleteProp from '../../../../../components/ModComponents/DeleteProp'


import * as actions from '../../../../../store/actions/index';

const BasicBusinessInfo = (props) =>{

    const {OnupdateModBusiness,OnupdateBusiness,OndeletePropBusiness} = props;

    const[businessUpdate,setBusinessUpdate]=useState({
        moderatorId: props.modBusiness.moderatorId,
        business_name:props.modBusiness.business_name,
        rating:props.modBusiness.rating,
        info:props.modBusiness.info,
        ref:props.modBusiness.ref,
        owner:{fname:'',lname:''} ,
        b_type:{type:''},
        address:{city:'',street:'',street_number:null,zip_code:null,latitude:null,longitude:null},
        phones:{phone_number:''} 
    })

    let phoneOutput=props.modBusiness.phones.map(ph =>(
        <DeleteProp key={ph.id} onClick={() => propDelete(ph.id,"phone")}>
            {ph.phone_number}
        </DeleteProp>
    ))
     
    let ownerOutput = props.modBusiness.owner.map(owner =>(
        <DeleteProp key={owner.id} onClick={() => propDelete(owner.id,"owner")}>
            {owner.fname} {owner.lname}
        </DeleteProp>
    ))

    let addressOutput = props.modBusiness.address.map(address =>(
        <DeleteProp key={address.id} onClick={() => propDelete(address.id,"address")}>
            {address.city} {address.zip_code} {address.street} {address.street_number}
        </DeleteProp>
    ))

    let TypeOutput = props.modBusiness.b_type.map(tupos =>(
        <DeleteProp key={tupos.id} onClick={() => propDelete(tupos.id,"type")}>
           {tupos.type}
        </DeleteProp>
    ))

    const propDelete = (id,prop) =>{
        OndeletePropBusiness(id,prop,props.modBusiness.moderatorId);
    }

    const addPropHandler = (propName ) =>{

        props.updateBusiness.moderatorId= props.modBusiness.moderatorId;
        props.updateBusiness.business_name=props.modBusiness.business_name;
        props.updateBusiness.rating=props.modBusiness.rating;
        props.updateBusiness.info=props.modBusiness.info;
        props.updateBusiness.ref=props.modBusiness.ref;

        if(propName === "owner"){
            props.updateBusiness.owner =[ businessUpdate.owner];
        }
        if(propName === "phone"){
            props.updateBusiness.phones =[ businessUpdate.phones];
        }
        if(propName === "address"){
            props.updateBusiness.address =[ businessUpdate.address];
        }
        if(propName === "type"){
            props.updateBusiness.b_type =[ businessUpdate.b_type];
        }
        OnupdateBusiness(props.updateBusiness,props.modBusiness.id);
        OnupdateModBusiness();
        console.log(businessUpdate);
    }

    const addBasicInfoHandler = () =>{
        props.updateBusiness.moderatorId = businessUpdate.moderatorId;
        props.updateBusiness.business_name = businessUpdate.business_name;
        props.updateBusiness.rating = businessUpdate.rating;
        props.updateBusiness.info = businessUpdate.info;
        props.updateBusiness.ref = businessUpdate.ref;
        OnupdateBusiness( props.updateBusiness,props.modBusiness.id);
    }

    const updatePropValueHandler = (value,parentProp,prop) => {
        
        setBusinessUpdate(prevState => ({ ...prevState, [parentProp]:{...prevState[parentProp],[prop]:value} }))
    }

    const updateBasicValueHandler = (value,prop) => {
        setBusinessUpdate(prevState => ({ ...prevState,[prop]:value  }))
    }
    

    return(
        <>
            <div className={classes.Title}>
                <h1 > Update Business or Service</h1>
                <h5 style={{marginTop:"20px"}}>In this step you can change some values of your Business / Service</h5>
                <p>Change values for Business name, Information and your Reference Site and delete or add a phone, owner, address, type</p>
            </div>
            <div className={classes.View}>
                <p>Business ID : {props.modBusiness.id}</p>
                <p>Business owner ID : {props.modBusiness.moderatorId}</p>
                <p >Business Rating : {props.modBusiness.rating}</p>
                <span>Business Name: </span> <input style={{width:"70%"}} defaultValue={props.modBusiness.business_name}
                                                                          onChange={ (event) =>{updateBasicValueHandler(event.target.value,"business_name")} }/><p/>
                <span>Reference Site: </span> <input style={{width:"70%"}}  defaultValue={props.modBusiness.ref}
                                                                            onChange={ (event) =>{updateBasicValueHandler(event.target.value,"ref")}}/>
                <p>Description : </p> <textarea style={{width:"100%",height:"130px" }} defaultValue={props.modBusiness.info}  
                                                                                       onChange={ (event) =>{updateBasicValueHandler(event.target.value,"info")}}/>  
                <br/>
                <MyButton variant="info"  clicked={() => addBasicInfoHandler()} > Update </MyButton>
            </div>
            <div className={classes.View}>
                <h5>Phones:</h5>
                {phoneOutput}
                <hr/>
                <input className={classes.InputStyle}  maxLength="10" placeholder="Phone" onChange={ (event) => {updatePropValueHandler(event.target.value,"phones","phone_number") }}/>
                <br/>
                <MyButton variant="success"  clicked={() => addPropHandler("phone")} > Add </MyButton>
            </div>
            <div className={classes.View}>
                <h5>Owners:</h5>
                {ownerOutput}
                <hr/>
                <input className={classes.InputStyle} placeholder="Name" onChange={ (event) => {updatePropValueHandler(event.target.value,"owner","fname") }}/>
                <input className={classes.InputStyle} placeholder="Last Name" onChange={ (event) => {updatePropValueHandler(event.target.value,"owner","lname")}}/> 
                        {/* onChange={ (event) =>{setBusinessUpdate(prevState => ({ ...prevState, owner:{...prevState.owner,lname:event.target.value} }))}  } */}
                <br/><MyButton variant="success"  clicked={() => addPropHandler("owner")} > Add</MyButton>
            </div>
            <div className={classes.View}>
                <h5>Address:</h5>
                {addressOutput}
                <hr/>
                <input className={classes.InputStyle} placeholder="City" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","city")} }/>
                <input className={classes.InputStyle} maxLength="5" placeholder="Zip Code" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","zip_code")} }/>
                <input className={classes.InputStyle} placeholder="street" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","street")} }/><br/>
                <input className={classes.InputStyle} placeholder="street number" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","street_number")} }/>
                <input className={classes.InputStyle} maxLength="7" placeholder="Latitude" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","latitude")} }/>
                <input className={classes.InputStyle} maxLength="7" placeholder="Longitude" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","longitude")} }/><br/>
                <MyButton variant="success" clicked={() => addPropHandler("address")} > Add </MyButton>
            </div>
            <div className={classes.View}>
                <h5>Types:</h5>
                {TypeOutput}
                <hr/>
                <input  className={classes.InputStyle} placeholder="type" onChange={ (event) => {updatePropValueHandler(event.target.value,"b_type","type") }}/>
                <br/><MyButton variant="success"  clicked={() => addPropHandler("type")}> Add </MyButton>
            </div> 
            <br/>
            <br/><br/>
        </>
    )

}

const mapStateToProps = state => {
    return {
        updateBusiness:state.modPage.updateBusiness,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnupdateModBusiness: ()=> dispatch( actions.updateModBusiness() ),
        OnupdateBusiness: (updatedBusiness,id)=> dispatch( actions.updateBusiness(updatedBusiness,id) ),
        OndeletePropBusiness: (id,prop,modId)=> dispatch( actions.deletePropBusiness(id,prop,modId) ),

    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( BasicBusinessInfo );