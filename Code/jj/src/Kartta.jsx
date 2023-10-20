import React from 'react'; // Import React
//import {
  //MapContainer,
  //TileLayer,
  //useMap,
  //Marker,
  //Popup
//} from 'https://cdn.esm.sh/react-leaflet'
//import herokuva from "/src/photos/herokuva.png"
//import nuoli from "/src/photos/arrow.png"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import herokuva from "./photos/herokuva.png";
import nuoli from "./photos/arrow.png";


const position = [120, 120]
class MapComponent extends React.Component {
   
    render() {
      return (
        <div>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        )
    }
  } 

  <div id="map-wrap">
  <div id="map"></div>
</div>

<script>
  window.onload = function() {
      var map = L.map('map').setView([0,0], 1);
      L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=K0eLj6ZMBtwt8Ig1KrD1', {
          attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      }).addTo(map);
  };
</script>


  export default MapComponent;