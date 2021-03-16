import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import ViewAllServices from '../../../components/AdminComponents/ViewAllServices/VIewAllServices'
import classes from './AdminPage.module.css';
import * as actions from '../../../store/actions/index';

const AdminPage = (props) =>{

    const { OnfetchAdminServicesCompanies,OnDeleteAdminServicesCompanies} = props;

    useEffect(()=>{
        OnfetchAdminServicesCompanies();
    },[OnfetchAdminServicesCompanies])

    let loaded_services = props.loadedServices_Companies.map(buss =>(
        <ViewAllServices    key={buss.id}
                            name={buss.business_name} 
                            business_id ={buss.id}
                            id_buss_mod={buss.moderatorId}
                            onClick={()=> deleteServiceHandler(buss.id)}
        />
      ))

    const deleteServiceHandler = (id) =>{
        console.log("clicked -> ",id)
        OnDeleteAdminServicesCompanies(id);
    }   

    return(
        <React.Fragment>
            <div className={classes.Title}>
                <h1 > Admin Page</h1>
                <h5 style={{marginTop:"20px"}}>Προς το παρόν, ο διαχειριστής της ιστοσελίδας <br/> μπορεί να διαγράψει οποιαδήποτε επιχείρηση / υπηρεσία υπάρχει. </h5>
            </div>
            <br/>
            {loaded_services}
            <br/> <br/><br/>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
  return {
    loadedServices_Companies:state.adminPage.loadedServices_Companies,
    hasRole:state.auth.role,
    token:state.auth.token,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    OnfetchAdminServicesCompanies: ()=> dispatch( actions.fetchAdminServicesCompanies() ),
    OnDeleteAdminServicesCompanies: (id)=> dispatch( actions.deleteAdminServicesCompanies(id) ),

  };
};

export default connect( mapStateToProps,mapDispatchToProps )( AdminPage );






















