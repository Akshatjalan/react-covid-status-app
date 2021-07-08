import React, {useState, useEffect} from 'react';
import { MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import StatsBox from './StatsBox';
import Map from './Map';
import Table from './Table';
import './App.css';
import { sortData } from './util';
import LineGraph from './LineGraph';
import Navbars from './Navbar';
import "leaflet/dist/leaflet.css";

function App() {

    //state- variable in react
  const [countries, setCountries] = useState([]); //use site disease.sh for countries api, api used - https://disease.sh/v3/covid-19/countries
  const [country, setCountry] = useState('Global'); //default
  const [countryInfo, setCountryInfo] = useState({});   //state for country info
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 31.768318, lng: 35.213711});
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);


//useEffect runs a code which runs 1 time when App component is run, or run when [] condition's value is changed

useEffect(() => {
  fetch('https://disease.sh/v3/covid-19/all')
  .then(response =>response.json())
  .then(data =>{
  setCountryInfo(data);
});
}, []);

useEffect(() => {
 //async code bcoz we need to send a req to server and wait for its response
  const getCountriesData = async () => {
    await fetch ("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => ( //map is like loop in javascript
        {
          name: country.country, //INDIA, United states
          value: country.countryInfo.iso2,  //IN, USA
        }));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
    });
  };
  getCountriesData();
}, []);

const onClickCountry= async (event) => {  //function for onchanging country in dropdown
  const countryCode = event.target.value;
  console.log("Working", countryCode);

  setCountry(countryCode);


  const url = countryCode === 'Global' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  // https://disease.sh/v3/covid-19/all                         //if global stats
  // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]    //else if other countries stats

  await fetch (url)
  .then(response => response.json())
  .then(data =>{
    setCountry(countryCode);
    //all data from the country response

    setCountryInfo(data);

    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(4);
  });
console.log('Country INFO -', countryInfo);
};


return (
  <div>
  <Navbars />
    <div className="app">   
     
      <div className="app_main">

      <div className="app_header">
      <h1>Cases Overview</h1>
    <FormControl className="app_dropdown">
      <Select variant= "outlined"
      onChange={onClickCountry}  
       value={country}>
      <MenuItem value="Global"><b>All Countries</b></MenuItem>
        {
          countries.map(country =>(
          <MenuItem value={country.value}>{country.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
    </div>

{/* boxes*/}


    <div className="app_stats">
        <StatsBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
        <StatsBox title="Recovered"  cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
        <StatsBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
    </div>

{/* map */}

        <Map countries = {mapCountries}  center={mapCenter} zoom={mapZoom}/>
     </div>
<br/>
    
{/* Side app start */}    

    <Card className="app_side">
        <CardContent>
        <h4>Live Cases by Country</h4>
        <Table countries = {tableData} />
        <hr />
        <h4><b>Statistics Graph</b></h4>
        <LineGraph />
        </CardContent>
    </Card>
    </div>  
    </div>
 
  );
}

export default App;
