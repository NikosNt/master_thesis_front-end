import React from 'react';
import { connect } from 'react-redux';


//import Footer from '../../components/Footer/Footer';
import UserPage from './UserPage/UserPage'
import ModeratorPage from './ModeratorPage/ModeratorPage'
import AdminPage from './AdminPage/AdminPage'


const Mainpage = (props) =>{

  let page = (
    <React.Fragment>
      <div>
        <p>Loading ...</p>
      </div>
    </React.Fragment>
  )

  if(props.hasRole ==='ROLE_USER' || props.hasRole === null){
    page=( <UserPage/> )
  }

  if(props.hasRole ==='ROLE_MODERATOR'){
    page=( <ModeratorPage/> )
  }

  if(props.hasRole ==='ROLE_ADMIN'){
    page=(<AdminPage /> )
  }

  return(
    <React.Fragment>
      {page}
      {/* <Footer/> */}
    </React.Fragment>
  )

}

const mapStateToProps = state => {
  return {
      hasRole:state.auth.role,
      token:state.auth.token,
      isAuthenticated: state.auth.token !== null
  };
};

export default connect( mapStateToProps )( Mainpage );