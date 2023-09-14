import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CITY_LIST from './cities.json';

function Selection({ onSelectCity }) {
  const handleCityChange = (event) => {
    onSelectCity(event.target.value);
  };

  return (
    <FormControl variant='outlined' sx={{ m: 1, width: 400, marginBottom: 15 }}>
      <InputLabel id='demo-simple-select-outlined-label'>City</InputLabel>
      <Select
        label='City'
        defaultValue=''
        sx={{ width: '100%', height: 70, backgroundColor: 'white' }}
        onChange={handleCityChange}
      >
        <MenuItem value=''>
          <em>Choose a city...</em>
        </MenuItem>
        {CITY_LIST.map((city) => {
          return (
            <MenuItem key={city.id} value={city.name}>
              {city.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default Selection;
