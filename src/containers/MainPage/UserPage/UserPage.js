import React,{useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './UserPage.module.css';
import SearchBar from '../../../components/UI/SearchBar/SearchBar'
import MyButton from '../../../components/UI/Button/MyButton';
import Info from '../../../components/StartingInfo/StartingInfo';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import ViewBusiness from '../../../components/UserComponents/ViewBusiness/ViewBusiness'

import * as actions from '../../../store/actions/index';

const UserPage = (props) =>{

  const { OnfetchCities,
          OnfetchServices,
          OnInitSearchText,
          onInitUpdateCityContent,
          onInitUpdateServiceContent,
          OnfetchServicesCompanies,
          OnInitSetResultMessage } = props;

  useEffect(()=>{
    OnfetchCities();
    OnfetchServices();
    OnInitSearchText('');
    OnInitSetResultMessage('');
  },[OnfetchCities,OnfetchServices,OnInitSearchText,OnInitSetResultMessage])



  const onSubmitHandler = () =>{
    //console.log("Sto user Page")
    //na kanw kati gia na leei kati prin klikaristoun oi epixiriseis

  }

  for(let klidi in props.loadedServices_Companies){
        console.log(props.loadedServices_Companies[klidi]);
    }

  let  selected_services = null;

  selected_services = props.loadedServices_Companies.map(buss =>(
    <ViewBusiness key={buss.id}
                  name={buss.business_name} 
                  info={buss.info} 
                  phones={buss.phones} 
                  address={buss.address}
                  owners={buss.owner}
                  rating={buss.rating} 
                  reference={buss.ref}           
    />
  ))



  return(
    <React.Fragment>
      <div className={classes.Main}>
        <Info /> 
        <br/> 
        <div className={classes.Dropdown}>
          <Dropdown list={props.cities} label={"city"} changed={(value)=> onInitUpdateCityContent(value)}></Dropdown>
          <Dropdown list={props.services} label={"type of business"} changed={(value)=> onInitUpdateServiceContent(value)}></Dropdown> 
        </div>
        <br/>   
        <SearchBar textS={props.searchText} changed={(event)=> OnInitSearchText(event.target.value) }/>
        <br/>
        <div className={classes.Button}>
          <MyButton variant="outline-info" size="lg" clicked={()=> { OnfetchServicesCompanies(props.cityContent.name,props.serviceContent.name,props.searchText); onSubmitHandler()} } >Search !</MyButton>
        </div>
        <br/> 
        <h4 className={classes.NoResult} > {props.resultMessage} </h4>
        {selected_services}
       
    </div>
  </React.Fragment>
)

}

const mapStateToProps = state => {
  return {
      cities: state.userPage.cities,
      services: state.userPage.services,  
      searchText:state.userPage.searchText,
      cityContent:state.userPage.cityContent,
      serviceContent:state.userPage.serviceContent,
      loadedServices_Companies:state.userPage.loadedServices_Companies,
      resultMessage:state.userPage.resultMessage,
      
      hasRole:state.auth.role,
      token:state.auth.token,
      isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    OnfetchCities: ()=> dispatch( actions.fetchCities() ),
    OnfetchServices: () => dispatch( actions.fetchServices() ),
    OnInitSearchText: (text) => dispatch( actions.setSearchText(text) ),
    OnInitSetResultMessage: (message) => dispatch( actions.setResultMessage(message) ),
    onInitUpdateCityContent:(content) => dispatch( actions.updateCityContent(content) ),
    onInitUpdateServiceContent:(content) => dispatch( actions.updateServiceContent(content) ),
    OnfetchServicesCompanies: (city,typeBusiness,searchText)=> dispatch( actions.fetchServicesCompanies(city,typeBusiness,searchText) ),
  };
};

export default connect( mapStateToProps,mapDispatchToProps )( UserPage );