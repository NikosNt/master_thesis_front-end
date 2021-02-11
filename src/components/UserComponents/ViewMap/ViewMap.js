import React   from 'react';

import { MapContainer, TileLayer, Marker, Popup ,Circle, } from 'react-leaflet';
import {geolocated} from 'react-geolocated';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

//import Routing from "./RoutingMachine";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
 
const DEFAULT_LATITUDE = 0;
const DEFAULT_LONGITUDE = 0;

const ViewMap = (props) => {
    //const [isMapInit,setIsMapInit] = useState(false);
   
    const  mylatitude = props.coords ? props.coords.latitude : DEFAULT_LATITUDE;
    const  mylongitude = props.coords ? props.coords.longitude : DEFAULT_LONGITUDE;
        
    // const redMarker = L.icon({ iconUrl:  '/marker-icon-red.png',
    //                            shadowUrl:'/marker-shadow.png' ,})
    const greenMarker = L.icon({ iconUrl:  '/marker-icon-green.png',
                                shadowUrl:'/marker-shadow.png' ,})

    let address = props.location.state.business.address.map(add =>{
        return <Marker key={add.id} position={[add.latitude,add.longitude]}  icon={greenMarker} >
                    <Popup>
                        <span>{props.location.state.business.business_name} <br/>{add.street} {add.street_number} <br/>ΤΚ:{add.zip_code} </span>
                    </Popup>
                </Marker>
    })

    // const saveMap = map => {
    //     props.map = map;
    //     // this.setState({
    //     //   isMapInit: true
    //     // });
    //     setIsMapInit(true);
    //   };

   // console.log(mylatitude+" , "+mylongitude)
   // console.log(props.location.state.radious)

    return(
        <>  
        {  mylatitude === 0 && mylongitude === 0
            ?
            <div>
                <p style={{textAlign:"center"}}> Loading...</p>
            </div> 
            :
            <MapContainer center={[mylatitude,mylongitude]} zoom={13} style={{height: '92vh'}}  >
                <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    !props.coords ?
                        <div>loading</div>
                    :   
                        <Marker position={[mylatitude,mylongitude]}  >
                            <Popup >
                                <span  >Είσαι εδώ !</span>
                            </Popup>
                        </Marker> 
                           
                }
                {
                    props.location.state.radious !== -1  
                    ? <Circle center={[mylatitude,mylongitude]}  radius={props.location.state.radious} /> : null
                }
                {address}

                {/* {isMapInit&& <Routing map={isMapInit} />} */}
            </MapContainer>
            } 
        </>
    );
}
export default geolocated({
    positionOptions:{
        enableHighAccuracy: false
       
    },
     userDecisionTimeout:10000
})(ViewMap)
//export default ViewMap;