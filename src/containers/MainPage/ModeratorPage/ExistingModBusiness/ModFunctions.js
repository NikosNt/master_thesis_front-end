import React,{useState} from 'react';

//import classes from './ModFunctions.module.css';
//import * as actions from '../../../../store/actions/index';

import BasicBusinessInfo from '../../../../SubContainers/ModSubContainer/BasicInfo/BasicBusinessInfo';
import BusinessModSchedule from '../../../../SubContainers/ModSubContainer/BusinessModSchedule/BusinessModSchedule';
import Products from '../../../../SubContainers/ModSubContainer/ProductsMod/ProductsMod';
import Services from '../../../../SubContainers/ModSubContainer/ServicesMod/ServicesMod';
import Messages from '../../../../SubContainers/ModSubContainer/MessagesMod/MessagesMod';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab,Tabs} from 'react-bootstrap'

const ModFunctions = (props) =>{

    const [key, setKey] = useState('basicInfo');

    return(
        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} >
            <Tab eventKey="basicInfo" title="Πληροφορίες">
                <BasicBusinessInfo modBusiness={props.business} />
            </Tab>
            <Tab eventKey="schedule" title="Πρόγραμμα">
                 <BusinessModSchedule  modBusiness={props.business} />
            </Tab>
            <Tab  eventKey="products" title="Προιόντα" >
                <Products modBusiness={props.business}/>
            </Tab>
            <Tab  eventKey="services" title="Υπηρεσίες" >
                <Services  modBusiness={props.business} />
            </Tab>            
            <Tab eventKey="messages" title="Μηνύματα" >
                <Messages modBusiness={props.business}/>
            </Tab>
        </Tabs>
    )
}


export default ModFunctions ;