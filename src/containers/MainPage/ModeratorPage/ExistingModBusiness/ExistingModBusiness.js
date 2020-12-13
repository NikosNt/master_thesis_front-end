import React,{useState} from 'react';
import { connect } from 'react-redux';
import classes from './ExistingModBusiness.module.css';
import MyButton from '../../../../components/UI/Button/MyButton'

const ExistingModBusiness = (props) =>{
    const[businessUpdate,setBusinessUpdate]=useState({
        moderatorId: props.modBusiness.moderatorId,
        business_name:props.modBusiness.business_name,
        rating:props.modBusiness.rating,
        info:props.modBusiness.info,
        ref:props.modBusiness.ref,
        owner:{fname:'',lname:''} ,
        b_type:{type:''},
        address:{city:'',street:'',street_numberv:null,zip_code:null,latitude:null,longitude:null},
        phones:{phone_number:''} 
    })


    let phoneOutput = props.modBusiness.phones.map(ph =>(
        <div key={ph.id}>
            <span>{ph.phone_number}</span>
            <MyButton variant="danger" clicked={() => propDelete(ph.id)}> Delete</MyButton>
        </div>  
    ))

    let ownerOutput = props.modBusiness.owner.map(owner =>(
        <div key={owner.id}>
            <span>{owner.fname} {owner.lname}</span>
            <MyButton variant="danger" clicked={() => propDelete(owner.id)}> Delete</MyButton>
        </div>  
    ))

    let addressOutput = props.modBusiness.address.map(address =>(
        <div key={address.id}>
            <span> {address.city} {address.zipcode} {address.street} {address.street_number} </span>
            <MyButton variant="danger" clicked={() => propDelete(address.id)}> Delete</MyButton>
        </div>  
    ))

    let TypeOutput = props.modBusiness.b_type.map(tupos =>(
        <div key={tupos.id}>
            <span>{tupos.type}</span>
            <MyButton variant="danger" clicked={() => propDelete(tupos.id)}> Delete</MyButton>
        </div>  
    ))

    const propDelete = (id) =>{
        console.log("To id ",id);
    }

    const onAddProp = (propName ) =>{

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
        console.log(props.updateBusiness);
        console.log(businessUpdate);

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
                <span>Business Name: </span> <input style={{width:"70%"}} defaultValue={props.modBusiness.business_name} onChange={ (event) =>{setBusinessUpdate(prevState => ({ ...prevState,business_name:event.target.value  }))} }/><p/>
                <span>Reference Site: </span> <input style={{width:"70%"}}   defaultValue={props.modBusiness.ref}/>
                <p>Description : </p> <textarea style={{width:"100%",height:"130px" }} defaultValue={props.modBusiness.info} />   
                <br/>
                <MyButton variant="info"  > Update </MyButton>
            </div>
            <div className={classes.View}>
                <h5>Phones:</h5>
                {phoneOutput}
                <hr/>
                <input className={classes.InputStyle}  /><MyButton variant="success" > Add </MyButton>
            </div>
            <div className={classes.View}>
                <h5>Owners:</h5>
                {ownerOutput}
                <hr/>
                <input className={classes.InputStyle} placeholder="Name" onChange={ (event) =>{setBusinessUpdate(prevState => ({ ...prevState, owner:{...prevState.owner,fname:event.target.value} }))} }/>
                <input  className={classes.InputStyle} placeholder="Last Name" onChange={ (event) =>{setBusinessUpdate(prevState => ({ ...prevState, owner:{...prevState.owner,lname:event.target.value} }))}  }/> 
                <MyButton variant="success"  clicked={() => onAddProp("owner")} > Add</MyButton>
            </div>
            <div className={classes.View}>
                <h5>Address:</h5>
                {addressOutput}
                <hr/>
                <input className={classes.InputStyle} placeholder="City"/>
                <input className={classes.InputStyle} placeholder="Zip Code"/>
                <input className={classes.InputStyle} placeholder="street"/><br/>
                <input className={classes.InputStyle} placeholder="street number"/>
                <input className={classes.InputStyle} placeholder="Latitude"/>
                <input className={classes.InputStyle} placeholder="Longitude"/><br/>
                <MyButton variant="success" > Add </MyButton>
            </div>
            <div className={classes.View}>
                <h5>Types:</h5>
                {TypeOutput}
                <hr/>
                <input  className={classes.InputStyle} /><MyButton variant="success" > Add </MyButton>
            </div>
           
        </>
    )

}

const mapStateToProps = state => {
    return {
        updateBusiness:state.modPage.updateBusiness,
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