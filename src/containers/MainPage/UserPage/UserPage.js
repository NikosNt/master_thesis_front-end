import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './UserPage.module.css';
import SearchBar from '../../../components/UI/SearchBar/SearchBar'
import MyButton from '../../../components/UI/Button/MyButton';
import Info from '../../../components/StartingInfo/StartingInfo';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import ViewBusiness from '../../../components/UserComponents/ViewBusiness'
import {CardDeck,Row,Col} from 'react-bootstrap'
import * as actions from '../../../store/actions/index';
import {Rating} from '@material-ui/lab'; 

const UserPage = (props) =>{

  const { OnfetchCities,OnfetchServices,
          OnInitSearchText,
          onInitUpdateCityContent,onInitUpdateServiceContent,
          OnfetchServicesCompanies,
          OnInitSetResultMessage,
          OnSetUserLat,OnSetUserLong,OnSetRatingValue,
          OnSetCheckedOpen, OnSetRadiousValue,OnSetViewUserFilters
        } = props;

  useEffect(()=>{
    OnfetchCities();
    OnfetchServices();
    OnInitSearchText('');
    OnInitSetResultMessage(''); 
  },[OnfetchCities,OnfetchServices,OnInitSearchText,OnInitSetResultMessage])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
     OnSetUserLat(position.coords.latitude);
     OnSetUserLong(position.coords.longitude);
    });
  },[OnSetUserLong,OnSetUserLat])

  // for(let klidi in props.loadedServices_Companies){
  //       console.log(props.loadedServices_Companies[klidi]);
  // }

  let  selected_services = null;
  selected_services = props.loadedServices_Companies.map(buss =>(
    <ViewBusiness key={buss.business_id}
                  business={buss}
                  authenticated={props.isAuthenticated}
                  //lat={latitude}
                  //long={longitude}
                  lat={props.userlat}
                  long={props.userlong}                
    />
  ))
  
 // console.log(selected_services)

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
        <SearchBar textS={props.searchText} changed={(event)=> OnInitSearchText(event.target.value) }/>
        <br/>
        <div className={classes.Button}>
          <MyButton 
                    variant="outline-info" 
                    size="xxl" 
                    clicked={()=> { OnfetchServicesCompanies(props.cityContent.name,props.serviceContent.name,props.searchText);
                    OnSetViewUserFilters(true)} } 
          > 
            Αναζήτηση
          </MyButton>
        </div>
        <br/>
        <Row>
          <Col sm={12} md={4} lg={3} xl={2}>
          {
          props.viewFilters ? 
          <div className={classes.Filters} >
            <div>
              <p className={classes.FilterTitle}>Φίλτρα</p>
            </div>
            <hr/>
            <div>
              <span>Ανοιχτά &nbsp;
                <input type="checkbox" checked={props.checkedOpen}  onChange={ ()=> {OnSetCheckedOpen(!props.checkedOpen)  } }/>&nbsp;
              </span>
            </div>
            <hr/> 
            <div>
              <p>Near Me</p>
                <input type="range" min="0" max="30000" step="1000" 
                      value={props.radiousValue} onChange={(event)=> OnSetRadiousValue(Number(event.target.value))}  >
                </input> 
                <p>{ props.radiousValue === 0 ? 'Ακτίνα (σε m) ': props.radiousValue +'(m)' }</p>
              {/* </span> */}
            </div>
            <hr/> 
            <div>
                <p>Με κριτική από τουλάχιστον</p>
                <Rating  name="half-rating" value={props.ratingValue} precision={1} onChange={(event)=>OnSetRatingValue(Number(event.target.value))}  />
                <br/>
                <span>ή όλα &nbsp; 
                <input type="checkbox" checked={props.ratingValue === 0 ? true :false}  onChange={()=>OnSetRatingValue(0) }/>
                </span>
            </div>
            <hr/> 
          </div>

          : null
          }
          </Col>
          <Col sm={12} md={8} lg={9} xl={10}>
            <CardDeck >
              {selected_services.length ? selected_services:null/*<h4 className={classes.NoResult}>Δεν υπάρχει κάποια διαθέσιμη επιχείρηση η υπηρεσία</h4>*/}
            </CardDeck>
          </Col>
        </Row>
        
       
      </div>
      <style type="text/css">
        {`
          .btn-xxl {
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
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
      ratingValue:state.userPage.ratingValue,
      userlat:state.userPage.userlat,
      userlong:state.userPage.userlong,
      viewFilters:state.userPage.viewFilters,
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
    OnSetViewUserFilters: (state) => dispatch( actions.setViewUserFilters(state) ),
    OnSetCheckedOpen: (state) => dispatch( actions.setCheckedOpen(state) ),
    OnSetRadiousValue: (state) => dispatch( actions.setRadiousValue(state) ),
    OnSetRatingValue: (state) => dispatch( actions.setRatingValue(state) ),
    onInitUpdateCityContent:(content) => dispatch( actions.updateCityContent(content) ),
    onInitUpdateServiceContent:(content) => dispatch( actions.updateServiceContent(content) ),
    OnfetchServicesCompanies: (city,typeBusiness,searchText)=> dispatch( actions.fetchServicesCompanies(city,typeBusiness,searchText) ),
    OnSetUserLat: (state) => dispatch( actions.setUserLat(state) ),
    OnSetUserLong: (state) => dispatch( actions.setUserLong(state) ),
  };
};

export default connect( mapStateToProps,mapDispatchToProps )( UserPage );