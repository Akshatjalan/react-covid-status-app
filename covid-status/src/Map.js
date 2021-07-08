import React from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import './Map.css';
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
    return (
        <MapContainer className="map"
        center={center}
        zoom={zoom}
        >
            
     <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)} 
         {/*used from util.js */}
        </MapContainer>
    )
    };

export default Map;
