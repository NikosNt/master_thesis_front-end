import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import ExistingProductMod from './ExistingProduct/ExistingProductMod';
import NewProduct from './NewProduct/NewProduct';
import Modal from '../../UI/Modal/Modal';
import classes from './ProductsMod.module.css';
import {Button} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const ProductsMod = (props) =>{

  const {OnfetchBusinessProducts,onAddNewProduct} = props;

  const [showModal,setShowModal] = useState(false);
  const [newName,setNewName] = useState('');
  const [newValue,setNewValue] = useState('');
  const [newInfo,setNewInfo] = useState('');
  const [newNumber,setNewNumber] = useState('');

  useEffect(() => {
    async function fetchData() {
        await OnfetchBusinessProducts(props.modBusiness.id);
    }
    fetchData();
  }, [OnfetchBusinessProducts,props.modBusiness.id]); 

  let showProducts =  props.business_products.map( product =>(
    <ExistingProductMod key={product.productId}  product={product} businessId={props.modBusiness.id}/>
  ))

  let noProducts='';
  if(!props.business_products.length ){
    noProducts =<p style={{textAlign:"center",marginTop:"10%"}}>Δεν υπάρχουν διαθέσιμα προιοντα</p>
  }

  const addNewProductHandler = () =>{
    const newProduct ={
            business_id: props.modBusiness.id,
            name: newName,
            number:Number(newNumber),
            value:Number(newValue),
            info: newInfo
    }
    console.log(newProduct)
    onAddNewProduct(newProduct);
    setShowModal(false);
    setNewNumber('');
    setNewName('');
    setNewValue('');
    setNewInfo('');
  }

  return(

      <>
      <br/><h4 style={{textAlign:'center'}}> Προσθήκη, Διαγραφή και Επεξεργασία Προϊόντων </h4><br/>
      <Modal style={{height:"1000px"}} show={showModal} modalClosed={() => setShowModal(false)}>
      <NewProduct  businessId={props.modBusiness.id}
                    name={newName}
                    nameChange={(e)=>setNewName(e.target.value)}
                    value={newValue}
                    priceChange={(e)=>setNewValue(e.target.value)}
                    number={newNumber}
                    numberChange={(e)=>setNewNumber(e.target.value)}                    
                    info={newInfo}
                    infoChange={(e)=>setNewInfo(e.target.value)}
                    addNewService={()=> addNewProductHandler()}
          />
      </Modal>

      <div  >
        {showProducts}
      </div>            
         {noProducts}

      <div className={classes.DivButton}>
        <Button variant="success" className={classes.Button} onClick={()=>setShowModal(true)}><Icon.Plus  size={25}/></Button>
      </div>
      </>
      
  )
}

const mapStateToProps = state => {
    return {
        business_products: state.products.loadUserBusinessProducts
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      OnfetchBusinessProducts: (busId)=> dispatch( actions.fetchUserBusinessProducts(busId) ),  
      onAddNewProduct: (newProduct)=> dispatch( actions.createModNewProduct(newProduct) ),  
    };
  };
export default connect( mapStateToProps,mapDispatchToProps )(ProductsMod);
