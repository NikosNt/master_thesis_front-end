import React,{useState} from 'react';
import { connect } from 'react-redux';
//import * as actions from '../../../store/actions/index';

import Modal from '../../UI/Modal/Modal';
import classes from './ProductsMod.module.css';
import {Button} from 'react-bootstrap';
const ProductsMod = (props) =>{

    const [showModal,setShowModal] = useState(false);

    return(

        <>
        <p style={{textAlign:'center'}}> Ta Products</p>
        <Modal  show={showModal} modalClosed={() => setShowModal(false)}>
            <p style={{textAlign:"center"}}>Add a new product</p>
        </Modal>
        <div className={classes.DivButton}>
          <Button variant="success" className={classes.Button} onClick={()=>setShowModal(true)}>Add</Button>
        </div>
        </>
       
    )
}

const mapStateToProps = state => {
    return {

    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {

    };
  };
export default connect( mapStateToProps,mapDispatchToProps )(ProductsMod);