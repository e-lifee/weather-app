import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import TopButtons from './comps/TopButtons';
import Selection from './comps/Selection';
import TimeLocation from './comps/TimeLocation';
import Temperature from './comps/Temperature';
import WeatherForecast from './comps/WeatherForecast';
import Dates from './comps/Dates';
import AverageTemperature from './comps/AverageTemp';
function E_life_Weather() {
  const [selectedCity, setSelectedCity] = useState('');
  const [data, setData] = useState({});
  const [currentLocalTime, setCurrentLocalTime] = useState('');

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    const apiKey = 'd51550fbd4c3de0e02bfdb3bf380ae37';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${apiKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        console.log(responseData)
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, [selectedCity]);

  useEffect(() => {
    const getLocalTime = async () => {
      const response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Istanbul');
      const timeData = await response.json();
      const localTime = new Date(timeData.utc_datetime);

      const options = { timeZone: 'Europe/Istanbul', hour12: false, hour: '2-digit', minute: '2-digit' };
      setCurrentLocalTime(localTime.toLocaleTimeString('tr-TR', options));
    };

    getLocalTime();
    const interval = setInterval(getLocalTime, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const gridStyle = {
    background: 'linear-gradient(to bottom, blue, cyan)',
    padding: '20px',
    textAlign: 'center',
    minHeight: '100vh',
  };

  return (
    <Grid container justifyContent='center' style={gridStyle}>
      <Grid item xs={12}>
        <TopButtons onSelectCity={handleCitySelect} />
        {data.name && <WeatherForecast selectedCity={selectedCity} />}
        <Selection onSelectCity={handleCitySelect} />
        <TimeLocation
          time={currentLocalTime}
          location={data.city?.name ? data.city.name.split(" ")[0] : ''}
        />
        <Temperature selectedCity={selectedCity} />
        <WeatherForecast selectedCity={selectedCity} />
      </Grid>
    </Grid>
  );
}
// // /* $g =1;
// // foreach($list as $l_key=>$l_val){
// //   $derece += $l_val['main']['temp'];
// //   $g = $g+1;
// // }
// // $ortslsms = $derece/$g; */

export default E_life_Weather;
