import React,{useState} from 'react';
import { connect } from 'react-redux';
import classes from './BasicBusinessInfo.module.css';
import MyButton from '../../../components/UI/Button/MyButton'
import DeleteProp from '../../../components/ModComponents/DeleteProp'
import Modal from '../../../components/UI/Modal/Modal'
import * as Icon from 'react-bootstrap-icons';

import * as actions from '../../../store/actions/index';

const BasicBusinessInfo = (props) =>{

    const {OnupdateModBusiness,OnupdateBusiness,OndeletePropBusiness,OnLoadModFail} = props;

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
            <Icon.TelephoneFill  /> {ph.phone_number}
        </DeleteProp>
    ))
     
    let ownerOutput = props.modBusiness.owner.map(owner =>(
        <DeleteProp key={owner.id} onClick={() => propDelete(owner.id,"owner")}>
            <Icon.FilePerson  /> {owner.fname} {owner.lname}
        </DeleteProp>
    ))

    let addressOutput = props.modBusiness.address.map(address =>(
        <DeleteProp key={address.id} onClick={() => propDelete(address.id,"address")}>
            <Icon.GeoFill   /> {address.city} {address.zip_code} {address.street} {address.street_number}
        </DeleteProp>
    ))

    let TypeOutput = props.modBusiness.b_type.map(tupos =>(
        <DeleteProp key={tupos.id} onClick={() => propDelete(tupos.id,"type")}>
           <Icon.Filter  /> {tupos.type}
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
            <Modal show={props.error} modalClosed={() => OnLoadModFail(false) }>
                <p style={{textAlign:"center"}}>An error has occured !</p>
            </Modal>
            <div className={classes.Title}>
                <h1 >Επεξεργασία βασικών πληροφοριών</h1>
                <h5 style={{marginTop:"20px"}}>Σε αυτό το βήμα μπορείς να αλλάξεις διάφορες τιμές.</h5>
                <p>Άλλαξε τιμές για το όνομα της επιχείρησης, τις πληροφορίες και τον ιστότοπο και διέγραψε ή πρόσθεσε ένα τηλέφωνο, κάτοχο, διεύθυνση, τύπο</p>

            </div>
            <div className={classes.View}>
                {/* <p>Business ID : {props.modBusiness.id}</p>
                <p>Business owner ID : {props.modBusiness.moderatorId}</p> */}
                <p >Αξιολόγηση επιχείρησης : {props.modBusiness.rating === -1 ? "Δεν υπάρχει αξιολόγηση ακομα" :props.modBusiness.rating}</p>
                <span>Επωνυμία Επιχείρησης : </span> <input style={{width:"70%"}} defaultValue={props.modBusiness.business_name}
                                                                          onChange={ (event) =>{updateBasicValueHandler(event.target.value,"business_name")} }/><p/>
                <span>Ιστότοπος : </span> <input style={{width:"70%"}}  defaultValue={props.modBusiness.ref}
                                                                            onChange={ (event) =>{updateBasicValueHandler(event.target.value,"ref")}}/>
                <p>Περιγραφή : </p> <textarea style={{width:"100%",height:"130px" }} defaultValue={props.modBusiness.info}  
                                                                                       onChange={ (event) =>{updateBasicValueHandler(event.target.value,"info")}}/>  
                <br/>
                <MyButton variant="info"  clicked={() => addBasicInfoHandler()} > Update </MyButton>
            </div>
            <div className={classes.View}>
                <h5>Τηλέφωνα:</h5>
                {phoneOutput}
                <hr/>
                <input className={classes.InputStyle}  maxLength="10" placeholder="Τηλέφωνο" onChange={ (event) => {updatePropValueHandler(event.target.value,"phones","phone_number") }}/>
                <br/>
                <MyButton variant="success"  clicked={() => addPropHandler("phone")} > <Icon.Plus  /> </MyButton>
            </div>
            <div className={classes.View}>
                <h5>Ιδιοκτήτες:</h5>
                {ownerOutput}
                <hr/>
                <input className={classes.InputStyle} placeholder="Όνομα" onChange={ (event) => {updatePropValueHandler(event.target.value,"owner","fname") }}/>
                <input className={classes.InputStyle} placeholder="Επώνυμο" onChange={ (event) => {updatePropValueHandler(event.target.value,"owner","lname")}}/> 
                        {/* onChange={ (event) =>{setBusinessUpdate(prevState => ({ ...prevState, owner:{...prevState.owner,lname:event.target.value} }))}  } */}
                <br/><MyButton variant="success"  clicked={() => addPropHandler("owner")} >  <Icon.Plus  /></MyButton>
            </div>
            <div className={classes.View}>
                <h5>Διευθύνσεις:</h5>
                {addressOutput}
                <hr/>
                <input className={classes.InputStyle} placeholder="Πόλη" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","city")} }/>
                <input className={classes.InputStyle} maxLength="5" placeholder="Ταχυδρομικός κώδικας" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","zip_code")} }/>
                <input className={classes.InputStyle} placeholder="Δρόμος" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","street")} }/><br/>
                <input className={classes.InputStyle} placeholder="Αριθμός" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","street_number")} }/>
                <input className={classes.InputStyle} maxLength="10" placeholder="Γεωγραφικό πλάτος" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","latitude")} }/>
                <input className={classes.InputStyle} maxLength="10" placeholder="Γεωγραφικό μήκος" onChange={ (event) => {updatePropValueHandler(event.target.value,"address","longitude")} }/><br/>
                <MyButton variant="success" clicked={() => addPropHandler("address")} > <Icon.Plus  /></MyButton>
            </div>
            <div className={classes.View}>
                <h5>Τύποι επιχείρησης:</h5>
                {TypeOutput}
                <hr/>
                <input  className={classes.InputStyle} placeholder="Τύπος" onChange={ (event) => {updatePropValueHandler(event.target.value,"b_type","type") }}/>
                <br/><MyButton variant="success"  clicked={() => addPropHandler("type")}> <Icon.Plus  /></MyButton>
            </div> 
            <br/>
            <br/><br/>
        </>
    )

}

const mapStateToProps = state => {
    return {
        updateBusiness:state.modPage.updateBusiness,
        error:state.modPage.error
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnupdateModBusiness: ()=> dispatch( actions.updateModBusiness() ),
        OnupdateBusiness: (updatedBusiness,id)=> dispatch( actions.updateBusiness(updatedBusiness,id) ),
        OndeletePropBusiness: (id,prop,modId)=> dispatch( actions.deletePropBusiness(id,prop,modId) ),
        OnLoadModFail:(err)=>dispatch(actions.loadModFail(err))
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( BasicBusinessInfo );