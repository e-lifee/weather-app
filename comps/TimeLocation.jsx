import React from 'react';
import { Grid, Typography } from '@mui/material';

function TimeLocation({ time, location }) {
  const typographyStyle = {
    color: 'white',
  };

  return (
    <Grid>
      <Grid>
        <Typography variant='h4' style={typographyStyle}>
          {location && `${location},TURKEY`}
        </Typography>
      </Grid>
      <Grid>
        <Typography variant='h4' style={typographyStyle}>
          {time && `${time}`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default TimeLocation;
