import React,{useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './MainPage.module.css';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import MyButton from '../../components/UI/Button/MyButton';
import Info from '../../components/StartingInfo/StartingInfo';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import Footer from '../../components/Footer/Footer';

import * as actions from '../../store/actions/index';


const Mainpage = (props) =>{


  const { OnfetchCities,
          OnfetchServices,
          OnInitSearchText,
          onInitUpdateCityContent,
          onInitUpdateServiceContent } = props;

  useEffect(()=>{
    OnfetchCities();
    OnfetchServices();
  },[OnfetchCities,OnfetchServices])


  const onSubmitHandler = () =>{
    console.log(props.searchText)
    console.log(props.cityContent)
    console.log(props.serviceContent)

  }
  let page = (
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
      </div>
      <Footer/>
    </React.Fragment>
    )

  if(props.hasRole ==='ROLE_MODERATOR'){
    page=(
      <div><p>Mod Page</p></div>
    )
  }

  if(props.hasRole ==='ROLE_ADMIN'){
    page=(
      <div><p>Admin Page</p></div>
    )
  }

  return(
    <React.Fragment>
      {page}
    </React.Fragment>
)

}

const mapStateToProps = state => {
  return {
      cities: state.mainPage.cities,
      services: state.mainPage.services,  
      searchText:state.mainPage.searchText,
      cityContent:state.mainPage.cityContent,
      serviceContent:state.mainPage.serviceContent,
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
  };
};

//export default Mainpage;
export default connect( mapStateToProps,mapDispatchToProps )( Mainpage );