import React,{useState} from 'react';
import { connect } from 'react-redux';
import {Card,Col} from 'react-bootstrap';
import classes from './ServiceMod.module.css' ;
import MyButton from '../../../UI/Button/MyButton';
import * as actions from '../../../../store/actions/index';

const ServiceMod = (props) => {

    const {OnUpdateModService,OnDeleteModService}=props;

    const [name,setName] = useState(props.serviceMod.name);
    const [value,setValue] = useState(props.serviceMod.value);
    const [info,setInfo] = useState(props.serviceMod.info);

    const updateServiceHandler = () =>{
        const updatedService ={
                business_id: props.serviceMod.business_id,
                name: name,
                value:Number(value),
                info: info
        }
        OnUpdateModService(updatedService,props.serviceMod.id);
    }
    const deleteServiceHandler = () =>{
        // console.log("Delete Service me id -> ",props.serviceMod.id);
        OnDeleteModService(props.serviceMod.id, props.serviceMod.business_id)
    }

    return(
        <> 
            <Col   md={12} lg={6} className={classes.Column}> 
                <Card key={props.serviceMod.id} className={classes.ViewService}  >
                    <Card.Header style={{/*color:"#39a8a8",*/textAlign:"center"}}>
                        <input style={{width:"50%"}} value={name} onChange={(e)=> setName(e.target.value)}></input>
                    </Card.Header>
                    <Card.Body>
                        <span> Τιμή :  </span> 
                        <input  style={{width:"20%"}} value={value} onChange={(e)=> setValue(e.target.value)}/> 
                        <p> Πληροφορίες :</p> 
                        <textarea style={{width:"80%",height:"70px" }} value={info} onChange={(e)=> setInfo(e.target.value)} /><br/>
                        <MyButton variant="info" clicked={updateServiceHandler}>Update</MyButton>
                        <MyButton variant="danger" clicked={deleteServiceHandler}>Delete</MyButton>
                   </Card.Body>
                </Card>
            </Col>
        </>
    )
}
// const mapStateToProps = state => {
//     return {

//     };
//   };
  
  const mapDispatchToProps = dispatch => {
    return {
      OnUpdateModService: (updatedService,id)=> dispatch( actions.updateService(updatedService,id)),
      OnDeleteModService: (id,busId)=> dispatch( actions.deleteService(id,busId)),
    };
  };
  

export default  connect( null,mapDispatchToProps )(ServiceMod);