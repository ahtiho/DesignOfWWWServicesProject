import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import jsonData from './unidata.json'

class MapComponent extends React.Component {
    render() {
        // Define the position with latitude and longitude
        const position = [51.505, -0.09];
        const customIcon = L.icon({
            iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
        });
        const mapStyle = {
            height: "50vh",
            width: "80%",
            border: "2px solid #000", 
            borderRadius: "10px", 
            margin: "0 auto",
            padding: "20px 0 0 0",
        };
        return (
            <MapContainer center={position} zoom={13} style={mapStyle} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {jsonData.map((data, index) => (
                    <Marker key={index} position={[data.Latitude, data.Longitude]} icon={customIcon}> 
                        <Popup>{data.University}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        );
    }
}

export default MapComponent;
