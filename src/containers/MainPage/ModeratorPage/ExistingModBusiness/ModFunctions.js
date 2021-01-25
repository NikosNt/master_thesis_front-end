import React,{useState} from 'react';

//import classes from './ModFunctions.module.css';
//import * as actions from '../../../../store/actions/index';

import BasicBusinessInfo from '../../../../components/ModComponents/BasicInfo/BasicBusinessInfo';
import BusinessModSchedule from '../../../../components/ModComponents/BusinessModSchedule/BusinessModSchedule';
import Products from '../../../../components/ModComponents/ProductsMod/ProductsMod';
import Services from '../../../../components/ModComponents/ServicesMod/ServicesMod';
import Messages from '../../../../components/ModComponents/MessagesMod/MessagesMod';

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
                 <BusinessModSchedule  modBusiness={props.business} />
            </Tab>
            <Tab  eventKey="products" title="Products" >
                <Products />
            </Tab>
            <Tab  eventKey="services" title="Services" >
                <Services  modBusiness={props.business} />
            </Tab>            
            <Tab eventKey="messages" title="Messages" >
                <Messages modBusiness={props.business}/>
            </Tab>
        </Tabs>
    )
}


export default ModFunctions ;