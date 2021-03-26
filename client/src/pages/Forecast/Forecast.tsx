import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';

import { WeatherCard } from '../../components/WeatherCard/WeatherCard';
import { useForecast, useCityName } from '../../api';
import { usePosition } from '../../shared/hooks';

const useStyles = makeStyles({
  root: {
    height: '100%',
    padding: '4% 0',
  },
});

function Forecast() {
  const classes = useStyles();
  const { position } = usePosition();
  const { data: city } = useCityName(position);
  const { data, isLoading } = useForecast(city);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container justify="space-between" alignItems="center" spacing={4}>
        {data?.map((w) => (
          <Grid key={w.updatedAt} item xs={4}>
            <WeatherCard weather={w} isLoading={isLoading} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export { Forecast };
