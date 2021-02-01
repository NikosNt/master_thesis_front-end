import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './UserPage.module.css';
import SearchBar from '../../../components/UI/SearchBar/SearchBar'
import MyButton from '../../../components/UI/Button/MyButton';
import Info from '../../../components/StartingInfo/StartingInfo';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import ViewBusiness from '../../../components/UserComponents/ViewBusiness'
import {CardDeck} from 'react-bootstrap'
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


  // for(let klidi in props.loadedServices_Companies){
  //       console.log(props.loadedServices_Companies[klidi]);
  // }

  let  selected_services = null;

  //console.log(props.loadedServices_Companies)

  selected_services = props.loadedServices_Companies.map(buss =>(
    <ViewBusiness key={buss.business_id}
                  business={buss}
                  authenticated={props.isAuthenticated}
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
          <MyButton variant="outline-info" size="xxl" clicked={()=> { OnfetchServicesCompanies(props.cityContent.name,props.serviceContent.name,props.searchText); } } >Search !</MyButton>
        </div>
        <br/> 
        <h4 className={classes.NoResult} > {props.resultMessage} </h4>
        <CardDeck >
          {selected_services}
        </CardDeck>
        
       
      </div>
      <style type="text/css">
        {`
          .btn-xxl {
            padding: 0.7rem 4.5rem;
            font-size: 1.3rem;
          }
        `}
      </style>
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