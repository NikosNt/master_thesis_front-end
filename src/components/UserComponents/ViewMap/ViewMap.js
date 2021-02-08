import React,{useEffect}  from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {geolocated} from 'react-geolocated';

 
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const DEFAULT_LATITUDE = 35.318825;
const DEFAULT_LONGITUDE =25.102363

const ViewMap = (props) => {

    // const position = [35.318825, 25.102363]
    // const position2 = [35.337727, 25.136318]

    

    const  latitude = props.coords ? props.coords.latitude : DEFAULT_LATITUDE;
    const  longitude = props.coords ? props.coords.longitude : DEFAULT_LONGITUDE;
       
   


    console.log(longitude+" , "+latitude)
    return(
        <>
            <p style={{textAlign:"center"}}> Map</p>
             
                <MapContainer center={[latitude,longitude]} zoom={13} style={{height: '85vh'}}>
                    <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        !props.coords ?
                        <div>loading</div>
                        :
                        <Marker position={[latitude,longitude]}>
                            <Popup>
                                <span>You are here</span>
                            </Popup>
                        </Marker>                         
                    }
                </MapContainer>
             
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