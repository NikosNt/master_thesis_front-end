import React,{useEffect} from 'react';
import { connect } from 'react-redux';


const NewModBusiness = (props) =>{


    return(
        <>
            <p>Neo Business</p>
        </>
    )

}

const mapStateToProps = state => {
    return {
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

export default connect( mapStateToProps,mapDispatchToProps )( NewModBusiness );