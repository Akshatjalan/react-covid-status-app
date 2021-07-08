//some utility helper function
import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      mulitiplier: 600,
    },
  };
  
export const sortData = (data) => {
    const sortedData = [...data]; //copy the array

    sortedData.sort((a, b ) =>{
        if(a.cases > b.cases){
            return -1;
        }
        else{
            return 1;
        }
    })
    return sortedData;
};

//circles on map
export const showDataOnMap = (data, casesType = 'cases') => (
    data.map(country => (
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color= {casesTypeColors[casesType].hex}
        fillColor= {casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType] / 10) * casesTypeColors[casesType].mulitiplier
      } 
      >
          <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
        </Circle>
    ))
)

