import React,{useEffect,useState} from 'react';
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

  const [latitude,setLatitude] =useState(0);
  const [longitude,setLongitude] =useState(0);

  const { OnfetchCities,
          OnfetchServices,
          OnInitSearchText,
          onInitUpdateCityContent,
          onInitUpdateServiceContent,
          OnfetchServicesCompanies,
          OnInitSetResultMessage,
          OnSetCheckedOpen, OnSetRadiousValue,
        } = props;

  useEffect(()=>{
    OnfetchCities();
    OnfetchServices();
    OnInitSearchText('');
    OnInitSetResultMessage(''); 
  },[OnfetchCities,OnfetchServices,OnInitSearchText,OnInitSetResultMessage])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  })

  // for(let klidi in props.loadedServices_Companies){
  //       console.log(props.loadedServices_Companies[klidi]);
  // }

  let  selected_services = null;
  selected_services = props.loadedServices_Companies.map(buss =>(
    <ViewBusiness key={buss.business_id}
                  business={buss}
                  authenticated={props.isAuthenticated}
                  lat={latitude}
                  long={longitude}
    />
  ))

  const radiousHandler = (value) => {
    if(value === 'Χωρίς ακτίνα'){
      OnSetRadiousValue(-1)
    }else{
      OnSetRadiousValue(value)
    } 
  }
 

  return(
    <React.Fragment>
      <div className={classes.Main}>
        <Info /> 
        <br/> 
        <div className={classes.Dropdown}>
          <Dropdown list={props.cities} 
                    label={props.cityContent === -1 ? "Πόλεις" : props.cityContent.name} 
                    changed={(value)=> onInitUpdateCityContent(value)}>
          </Dropdown> &nbsp;
          <Dropdown list={props.services} 
                    label={props.serviceContent === -1 ? "Είδος επιχείρησης ή υπηρεσίας" :props.serviceContent.name} 
                    changed={(value)=> onInitUpdateServiceContent(value)}>
          </Dropdown> 
        </div>
        <br/>  
        <div className={classes.Filters} > 
          <span>Ανοιχτά &nbsp;
            <input type="checkbox" checked={props.checkedOpen}  onChange={ ()=> {OnSetCheckedOpen(!props.checkedOpen)  } }/>&nbsp;
          </span>
          <span> &nbsp;| Near Me&nbsp;</span>
          <Dropdown list={props.radiousOptions} 
                    label={props.radiousValue ===-1 ? 'Χωρίς ακτίνα':props.radiousValue} 
                    changed={(value)=>{radiousHandler(value.name) } }
          /> 
        </div>
        <br/>   
        <SearchBar textS={props.searchText} changed={(event)=> OnInitSearchText(event.target.value) }/>
        <br/>
        <div className={classes.Button}>
          <MyButton variant="outline-info" size="xxl" clicked={()=> { OnfetchServicesCompanies(props.cityContent.name,props.serviceContent.name,props.searchText);} } >Εύρεση !</MyButton>
        </div>
        <br/>
        {/* {searched 
         ?
          <div className={classes.Filters} > 
            <span>Ανοιχτά &nbsp;<input type="checkbox"   checked={props.checkedOpen}  onChange={ ()=> {OnSetCheckedOpen(!props.checkedOpen)  } }/>&nbsp;</span>
            <span> &nbsp;Near Me&nbsp;</span><Dropdown list={props.radiousOptions} label={"Ακτίνα σε (m)"} changed={(value)=>radiousHandler(value.name) }></Dropdown>
          </div>
         : null
        } */}
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
      checkedOpen:state.userPage.checkedOpen,
      radiousValue:state.userPage.radiousValue,
      radiousOptions:state.userPage.radiousOptions,
      isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    OnfetchCities: ()=> dispatch( actions.fetchCities() ),
    OnfetchServices: () => dispatch( actions.fetchServices() ),
    OnInitSearchText: (text) => dispatch( actions.setSearchText(text) ),
    OnInitSetResultMessage: (message) => dispatch( actions.setResultMessage(message) ),
    // OnSetSelectedCity: (state) => dispatch( actions.setSelectedCity(state) ),
    // OnSetSelectedService: (state) => dispatch( actions.setSelectedService(state) ),
    OnSetCheckedOpen: (state) => dispatch( actions.setCheckedOpen(state) ),
    OnSetRadiousValue: (state) => dispatch( actions.setRadiousValue(state) ),
    onInitUpdateCityContent:(content) => dispatch( actions.updateCityContent(content) ),
    onInitUpdateServiceContent:(content) => dispatch( actions.updateServiceContent(content) ),
    OnfetchServicesCompanies: (city,typeBusiness,searchText)=> dispatch( actions.fetchServicesCompanies(city,typeBusiness,searchText) ),
  };
};

export default connect( mapStateToProps,mapDispatchToProps )( UserPage );