import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './UserPage.module.css';
import SearchBar from '../../../components/UI/SearchBar/SearchBar'
import MyButton from '../../../components/UI/Button/MyButton';
import Info from '../../../components/StartingInfo/StartingInfo';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import ViewBusiness from '../../../components/ViewBusiness/ViewBusiness'

import * as actions from '../../../store/actions/index';

const UserPage = (props) =>{

  const { OnfetchCities,
          OnfetchServices,
          OnInitSearchText,
          onInitUpdateCityContent,
          onInitUpdateServiceContent,
          OnfetchServicesCompanies } = props;

  useEffect(()=>{
    OnfetchCities();
    OnfetchServices();
  },[OnfetchCities,OnfetchServices])


  const onSubmitHandler = () =>{
    // console.log(props.searchText)
    // console.log(props.cityContent.name)
    // console.log(props.serviceContent.name)
    OnfetchServicesCompanies(props.cityContent.name,props.serviceContent.name,props.searchText)
  }

  let selected_services = (
    <React.Fragment>
      <ViewBusiness/>
      <ViewBusiness/>
      <ViewBusiness/>
      <ViewBusiness/>
      <ViewBusiness/>
      <ViewBusiness/>
      </React.Fragment>
  )

  return(
    <React.Fragment>
    <div className={classes.Main}>
      <Info /> 
      <br/> 
      <div className={classes.Dropdown}>
        {/* <Dropdown list={props.countries} label={"country"} changed={(value)=> onInitUpdateCountryContent(value)}></Dropdown> */}
        <Dropdown list={props.cities} label={"city"} changed={(value)=> onInitUpdateCityContent(value)}></Dropdown>
        <Dropdown list={props.services} label={"type of business"} changed={(value)=> onInitUpdateServiceContent(value)}></Dropdown> 
      </div>
      <br/>   
      <SearchBar textS={props.searchText} changed={(event)=> OnInitSearchText(event.target.value) }/>
      <br/>
      <div className={classes.Button}>
        <MyButton variant="outline-info" size="lg" clicked={ onSubmitHandler } >Search !</MyButton>
      </div>
      <br/> 
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
    onInitUpdateCityContent:(content) => dispatch( actions.updateCityContent(content) ),
    onInitUpdateServiceContent:(content) => dispatch( actions.updateServiceContent(content) ),
    OnfetchServicesCompanies: (city,typeBusiness,searchText)=> dispatch( actions.fetchServicesCompanies(city,typeBusiness,searchText) ),
  };
};

//export default Mainpage;
export default connect( mapStateToProps,mapDispatchToProps )( UserPage );