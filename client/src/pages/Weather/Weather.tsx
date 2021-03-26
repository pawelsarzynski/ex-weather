import React, { useEffect, useState } from 'react';
import { Container, TextField, Grid, makeStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { endOfMonth, add } from 'date-fns';

import { WeatherCard } from '../../components/WeatherCard/WeatherCard';
import { useCityName, useWeather } from '../../api';
import { useDebounce, usePosition } from '../../shared/hooks';

const useStyles = makeStyles({
  root: {
    height: '100%',
    padding: '4% 0',
  },
  card: {
    flexBasis: 'unset',
  },
  datePicker: { height: 72, display: 'flex', alignItems: 'flex-end' },
});

function Weather() {
  const classes = useStyles();
  const { position } = usePosition();
  const [searchedCity, setSearchedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { data: city } = useCityName(position);
  const debouncedSearchedCity = useDebounce(searchedCity, 300);
  const { data, isLoading } = useWeather(
    debouncedSearchedCity,
    selectedDate?.getDate(),
  );

  useEffect(() => {
    if (!searchedCity && city) setSearchedCity(city);
  }, [city]);

  const handleCityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchedCity(event.target.value);
  };

  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
  };

  const maxDate =
    new Date().getDate() > 10
      ? endOfMonth(new Date())
      : add(new Date(), { days: 10 });

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid container spacing={3} justify="center" alignItems="flex-start">
        <Grid item xs={6}>
          <TextField
            id="city"
            label="City"
            value={searchedCity}
            onChange={handleCityChange}
          />
        </Grid>
        <Grid item xs={6} className={classes.datePicker}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            maxDate={maxDate}
          />
        </Grid>
        <Grid item xs={12} className={classes.card}>
          <WeatherCard weather={data} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Container>
  );
}

export { Weather };
