import React, { useState } from 'react';
import { Grid, Button, Typography, Dialog } from '@mui/material';
import WeatherForecast from './WeatherForecast';

const topCities = [
  {
    id: 1,
    title: 'İstanbul',
  },
  {
    id: 2,
    title: 'Ankara',
  },
  {
    id: 3,
    title: 'İzmir',
  },
  {
    id: 4,
    title: 'Bursa',
  },
  {
    id: 5,
    title: 'Samsun',
  },
];

function TopButtons({ onSelectCity }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecastModalOpen, setForecastModalOpen] = useState(false);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setForecastModalOpen(true);
    onSelectCity(city);
  };

  const handleCloseForecastModal = () => {
    setSelectedCity(null);
    setForecastModalOpen(false);
  };

  return (
    <Grid container justifyContent="center" mt={6} spacing={2}>
      {topCities.map((topCity) => (
        <Grid item key={topCity.id}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              borderRadius: '16px',
              backgroundColor: 'transparent',
              backdropFilter: 'blur(10px)',
              border: 'none',
            }}
            onClick={() => handleCityClick(topCity.title)}
          >
            <Typography variant="body1" sx={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>
              {topCity.title}
            </Typography>
          </Button>
        </Grid>
      ))}
      <Dialog
        open={forecastModalOpen}
        onClose={handleCloseForecastModal}
        fullWidth
        maxWidth="md"
      >
        {selectedCity && (
          <>
            <WeatherForecast selectedCity={selectedCity} onClose={handleCloseForecastModal} />
            <Button onClick={handleCloseForecastModal} color="primary">
              Close
            </Button>
          </>
        )}
      </Dialog>
    </Grid>
  );
}

export default TopButtons;
