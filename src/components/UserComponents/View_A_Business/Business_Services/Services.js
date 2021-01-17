import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import classes from './Services.module.css' ;

const Services = (props) =>{

    const {OnfetchBusinessServices} = props;

    useEffect(() => {
        async function fetchData() {
            await OnfetchBusinessServices(props.businessID);
        }
        fetchData();
    }, [OnfetchBusinessServices,props.businessID]); 

    //console.log(props.business_services);

    let showServices =  props.business_services.map( service =>(
      <div key={service.id} className={classes.ViewServices}>
        <h5>{service.name}</h5>
        <p> value: {service.value}</p>
        <p> Plhrofories: {service.info}</p>
       
      </div>
    ))

    if(!props.business_services.length ){
      showServices =<p style={{textAlign:"center",marginTop:"10%"}}>Δεν υπάρχουν διαθέσιμες υπηρεσίες</p>
    }
    

    return(
      <>
        {showServices}
      </>
    )
}

const mapStateToProps = state => {
    return {
       business_services: state.userPage.loadBusinessServices
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      OnfetchBusinessServices: (busId)=> dispatch( actions.fetchBusinessServices(busId) ),  
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )(Services);



