import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import NewModBusiness from './NewModBusiness/NewModBusiness';
import ModFunctions from './ExistingModBusiness/ModFunctions';

//import classes from './ModeratorPage.module.css';
import * as actions from '../../../store/actions/index';

const ModeratorPage = (props) =>{

    const {OnfetchBusiness,OnLoadModBusinessInit} = props;

    useEffect(()=>{
        OnLoadModBusinessInit([]);
        OnfetchBusiness(props.userId);
    },[OnLoadModBusinessInit,OnfetchBusiness,props.userId])

    let modPage;

    console.log("------------------")    
    console.log(props.userId)
    console.log( props.modBusiness )
    console.log("------------------")   

    if(Object.keys(props.modBusiness).length === 0){
        modPage=<NewModBusiness/>
    }else{
        modPage=<ModFunctions business={props.modBusiness}/>
    }
    return( 
        <>  
            {modPage}
        </>  
    )

}

const mapStateToProps = state => {
    return {
        modBusiness:state.modPage.modBusiness,
        userId:state.auth.userId,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnfetchBusiness: (modId)=> dispatch( actions.fetchBusiness(modId) ),
        OnLoadModBusinessInit: (bus)=> dispatch( actions.loadModBusinessInit(bus) ),
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( ModeratorPage );