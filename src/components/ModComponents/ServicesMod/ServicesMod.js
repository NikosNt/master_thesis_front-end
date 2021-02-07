import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import ExistingService from './ExistingService/ExistingService';
import NewService from './NewService/NewService';
import Modal from '../../UI/Modal/Modal';
import classes from './ServicesMod.module.css';
import {CardDeck,Button} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';


const ServicesMod = (props) =>{

    const {OnFetchModBusinessServices,OnAddModService,OnLoadModFail} = props;

    useEffect(() => {
        async function fetchData() {
            await OnFetchModBusinessServices(props.modBusiness.id);
        }
        fetchData();
    }, [OnFetchModBusinessServices,props.modBusiness.id]); 

    const [newName,setNewName] = useState('');
    const [newValue,setNewValue] = useState('');
    const [newInfo,setNewInfo] = useState('');
    const [showModal,setShowModal] = useState(false);

    let showModServices =  props.modBusinessServices.map( service =>(
        <ExistingService key={service.id} serviceMod={service}/>
      ))

    let noModServices='';
    if(!props.modBusinessServices.length ){
        noModServices =<p style={{textAlign:"center",marginTop:"10%"}}>Δεν υπάρχουν διαθέσιμες υπηρεσίες</p>
    }

    const addNewServiceHandler = () =>{
      const newService ={
              business_id: props.modBusiness.id,
              name: newName,
              value:Number(newValue),
              info: newInfo
      }
      OnAddModService(newService);
      setShowModal(false);
      setNewName('');
      setNewValue('');
      setNewInfo('');
    }

    return(
      <>
      <br/><h4 style={{textAlign:'center'}}>Προσθήκη, Διαγραφή και Επεξεργασία Υπηρεσιών  </h4><br/>
        <Modal show={props.failModError} modalClosed={() => OnLoadModFail(false) }>
          <p style={{textAlign:"center"}}>An error has occured !</p>
        </Modal>
        <Modal style={{height:"1000px"}} show={showModal} modalClosed={() => setShowModal(false)}>
          <NewService businessId={props.modBusiness.id}
                      name={newName}
                      nameChange={(e)=>setNewName(e.target.value)}
                      value={newValue}
                      priceChange={(e)=>setNewValue(e.target.value)}
                      info={newInfo}
                      infoChange={(e)=>setNewInfo(e.target.value)}
                      addNewService={()=> addNewServiceHandler()}
          />
        </Modal>
        <div className={classes.Deck}>
          <CardDeck >
            {showModServices}
          </CardDeck>
          {noModServices}
        </div> 
        <div className={classes.DivButton}>
          <Button variant="success" className={classes.Button} onClick={()=>setShowModal(true)}><Icon.Plus size={25} /></Button>
        </div>
        <br/><br/><br/>

      </>
    )
}
const mapStateToProps = state => {
    return {
        modBusinessServices:state.services.modBusinessServices,
        failModError:state.services.failModError
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnFetchModBusinessServices: (id)=> dispatch( actions.fetchModBusinessServices(id) ),
        OnAddModService: (newService)=> dispatch( actions.creteModNewService(newService)),
        OnLoadModFail:(err)=>dispatch(actions.failMod(err))
    };
  };
export default connect( mapStateToProps,mapDispatchToProps )( ServicesMod);