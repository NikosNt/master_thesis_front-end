import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';

import classes from './ModFunctions.module.css';
import * as actions from '../../../../store/actions/index';

import BasicBusinessInfo from './BasicInfo/BasicBusinessInfo';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab,Tabs} from 'react-bootstrap'
// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'

const ModFunctions = (props) =>{

    const [key, setKey] = useState('basicInfo');

    return(
        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} >
            <Tab eventKey="basicInfo" title="Information">
                <BasicBusinessInfo  />
            </Tab>
            <Tab eventKey="schedule" title="Schedule">
                <p style={{textAlign:"center"}}>Not available yet !</p>
            </Tab>
            <Tab  eventKey="products" title="Products" >
                <p style={{textAlign:"center"}}>Not available yet !</p>
            </Tab>
            <Tab  eventKey="services" title="Services" >
                <p style={{textAlign:"center"}}>Not available yet !</p>
            </Tab>            
            <Tab eventKey="messages" title="Messages" >
                <p style={{textAlign:"center"}}>Not available yet !</p>
            </Tab>
        </Tabs>
    )
}

const mapStateToProps = state => {
    return {
 
        hasRole:state.auth.role,
        token:state.auth.token,
        isAuthenticated: state.auth.token !== null
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        
    };
  };

export default connect( mapStateToProps,mapDispatchToProps )( ModFunctions );