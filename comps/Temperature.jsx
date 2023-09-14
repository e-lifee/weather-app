import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';

function Temperature({ selectedCity }) {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const getWeatherInfo = () => {
      const apiKey = 'd51550fbd4c3de0e02bfdb3bf380ae37';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.list[0].weather[0])
          setWeatherData(data.list);
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    };
    getWeatherInfo();
  }, [selectedCity]);

  const transparentCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    maxWidth: '300px',
    margin: 'auto',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  };

  const whiteTextStyle = {
    color: 'white',
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} sm={4}>
        <Card sx={{ ...transparentCardStyle }}>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Hava Durumu İkonu */}
            {weatherData[0]?.weather && weatherData[0]?.weather[0] && <img src={`https://openweathermap.org/img/wn/${weatherData[0]?.weather[0]?.icon}.png`} alt="Weather Icon" style={{ width: '60px', height: '60px' }} />}
            {/* Hava Durumu Açıklaması */}
            {weatherData[0]?.weather && weatherData[0]?.weather[0] && <Typography variant='h4' sx={whiteTextStyle}>{weatherData[0]?.weather[0]?.description}</Typography>}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} sm={4}>
        <Card sx={{ ...transparentCardStyle }}>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Sıcaklık */}
            {weatherData[0]?.main && <Typography variant='h3' sx={whiteTextStyle}> {weatherData[0]?.main.temp.toFixed()}°C</Typography>}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} sm={4}>
        <Card sx={{ ...transparentCardStyle }}>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Gerçek Sıcaklık */}
            {weatherData[0]?.main && <Typography variant='h5' sx={whiteTextStyle}>Real Felt: {weatherData[0]?.main.feels_like}°C</Typography>}
            {/* Rüzgar Hızı */}
            {weatherData[0]?.wind && <Typography variant='h5' sx={whiteTextStyle}>Wind Speed: {weatherData[0]?.wind.speed} MPH</Typography>}
            {/* Nem */}
            {weatherData[0]?.main && <Typography variant='h5' sx={whiteTextStyle}>Humidity: {weatherData[0]?.main.humidity}%</Typography>}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Temperature;
