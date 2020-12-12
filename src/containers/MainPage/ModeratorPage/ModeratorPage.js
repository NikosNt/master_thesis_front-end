import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import NewModBusiness from './NewModBusiness/NewModBusiness';
import ExistingModBusiness from './ExistingModBusiness/ExistingModBusiness';

//import classes from './ModeratorPage.module.css';
import * as actions from '../../../store/actions/index';

const ModeratorPage = (props) =>{

    const {OnfetchBusiness} = props;

    useEffect(()=>{
        OnfetchBusiness(props.userId)
    },[OnfetchBusiness,props.userId])

    let modPage;

    console.log(props.modBusiness)

    if(Object.keys(props.modBusiness).length === 0){
        modPage=<NewModBusiness/>
    }else{
        modPage=<ExistingModBusiness  />
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
        hasRole:state.auth.role,
        token:state.auth.token,
        isAuthenticated: state.auth.token !== null
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        OnfetchBusiness: (modId)=> dispatch( actions.fetchBusiness(modId) ),
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( ModeratorPage );