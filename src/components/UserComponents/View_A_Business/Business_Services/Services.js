import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import Service from './Service/Service'
import * as actions from '../../../../store/actions/index';
//import classes from './Services.module.css' ;
import {CardDeck} from 'react-bootstrap'

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
      <Service key={service.id} service={service} />
    ))

    let noServices='';
    if(!props.business_services.length ){
       noServices =<p style={{textAlign:"center",marginTop:"10%"}}>Δεν υπάρχουν διαθέσιμες υπηρεσίες</p>
    }
    

    return(
      <>
        <CardDeck >
          {showServices}
        </CardDeck>
        {noServices}
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



