import React,{useEffect,useState} from 'react';

import classes from './ModFunctions.module.css';
import * as actions from '../../../../store/actions/index';

import BasicBusinessInfo from './BasicInfo/BasicBusinessInfo';
import BusinessModSchedule from './BusinessModSchedule/BusinessModSchedule';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab,Tabs} from 'react-bootstrap'

const ModFunctions = (props) =>{

    const [key, setKey] = useState('basicInfo');

    return(
        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} >
            <Tab eventKey="basicInfo" title="Information">
                <BasicBusinessInfo modBusiness={props.business} />
            </Tab>
            <Tab eventKey="schedule" title="Schedule">
                 <BusinessModSchedule  modBusiness={props.business}/>
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


export default ModFunctions ;