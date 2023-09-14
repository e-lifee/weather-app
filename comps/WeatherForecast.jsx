import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AverageTemperature from './AverageTemp';
function WeatherForecast({ selectedCity }) {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalTemp, setTotalTemp] = useState(0);
  const [dailyAverageTemperatures, setDailyAverageTemperatures] = useState();

  useEffect(() => {
    const getWeatherInfo = () => {
      const apiKey = 'd51550fbd4c3de0e02bfdb3bf380ae37';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data.list);
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    };

    getWeatherInfo();
  }, [selectedCity]);

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const checkDay = (day) => {
    const d = new Date();
    if (day + d.getDay() > 6) {
      return day + d.getDay() - 7;
    } else {
      return day + d.getDay();
    }
  };

  const handleDayClick = (dayIndex) => {
    setSelectedDay(dayIndex);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
    setModalOpen(false);
  };

  const gridItemStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '50px',
  };





  const weatherIcons = {
    day: {
      'clear sky': '01d',
      'few clouds': '02d',
      'scattered clouds': '03d',
      'broken clouds': '04d',
      'shower rain': '09d',
      'rain': '10d',
      'thunderstorm': '11d',
      'snow': '13d',
      'mist': '50d',
      'light rain': '10d',
      'overcast clouds': '04d'
    },
    night: {
      'clear sky': '01n',
      'few clouds': '02n',
      'scattered clouds': '03n',
      'broken clouds': '04n',
      'shower rain': '09n',
      'rain': '10n',
      'thunderstorm': '11n',
      'snow': '13n',
      'mist': '50n',
      'light rain': '10d',
      'overcast clouds': '04n'
    }
  };

  const getCurrentDayPeriod = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? 'day' : 'night';
  };

  /* const getTemperatureAtSpecificTime = (dayData, time) => {
    const targetTime = new Date(`${dayData.dt_txt} UTC`).getUTCHours();
    if (targetTime === time) {
      return dayData.main.temp;
    }
    return null;
  }; */



  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          {weatherData && [0, 8, 16, 24, 32].map((startIndex, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} style={gridItemStyle}>
              <Card
                className="cardContainer"
                sx={{ p: 10, minWidth: 250 }}
                onClick={() => handleDayClick(index)}
              >
                <img
                  className="weatherIcon"
                  src={`http://openweathermap.org/img/wn/${weatherIcons[getCurrentDayPeriod()][weatherData[startIndex]?.weather[0]?.description]}.png`}
                  alt="weather icon"
                  style={{ width: '100px', height: '100px' }}
                />

                <Typography className="weatherDate" style={{ fontSize: '1.5rem' }}>
                  <strong>{weekday[checkDay(index)]}</strong>
                </Typography>

                <Typography className="weatherDescription" style={{ fontSize: '1.5rem' }}>
                  {weatherData[startIndex]?.weather[0].description}
                </Typography>

                <Typography className="weatherTemp" style={{ fontSize: '1.5rem' }}>
                  <strong>Temperature: </strong>
                  {Number(weatherData[startIndex]?.main?.temp).toFixed(1)} °C
                </Typography>

                <Typography className="weatherTemp" style={{ fontSize: '1.5rem' }}>
                  <strong>Average Temperature: </strong><AverageTemperature list={weatherData.slice(startIndex, startIndex + 8)} />  °C
                </Typography>


              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        {selectedDay !== null && (
          <>
            <DialogTitle>{weekday[checkDay(selectedDay)]}</DialogTitle>
            <DialogContent>

              <Typography variant='h5'>Real Felt: {weatherData[selectedDay].main.feels_like}°C</Typography>

              <Typography variant='h5'>Wind Speed: {weatherData[selectedDay].wind.speed} MPH</Typography>

              <Typography variant='h5'>Humidity: {weatherData[selectedDay].main.humidity}%</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Grid>
  );
}

export default WeatherForecast;
