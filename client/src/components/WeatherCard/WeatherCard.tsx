import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import {
  WbSunny as SunIcon,
  Brightness2 as MoonIcon,
} from '@material-ui/icons/';

import { Weather } from '../../shared/types';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 180,
  },
});

type Props = {
  weather?: Weather;
  isLoading: boolean;
};

function WeatherCard({ weather, isLoading }: Props): React.ReactElement {
  const classes = useStyles();

  if (isLoading || !weather) return <CircularProgress />;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`http:${weather.icon}`}
          title="Weather icon"
        />
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={8}>
              <Typography gutterBottom align="left" variant="h5" component="h2">
                {weather.city}
                {weather.isDay ? (
                  <SunIcon style={{ color: '#ece13f' }} />
                ) : (
                  <MoonIcon style={{ color: '#19145e' }} />
                )}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom variant="body2" component="p">
                {weather.updatedAt}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                color="textSecondary"
                align="left"
                variant="h4"
                component="h4"
              >
                {weather.tempC}°C
              </Typography>
              <Typography
                align="left"
                color="textSecondary"
                variant="h6"
                component="h6"
              >
                {weather.tempF}°F
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="textSecondary" component="p">
                {weather.pressureMb ? `${weather.pressureMb} hPa ` : ''}
                {weather.condition}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" component="h6">
                {weather.country}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export { WeatherCard };
