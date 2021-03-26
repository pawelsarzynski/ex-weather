import { Controller, Get, Query } from '@nestjs/common';

import { WeatherDto } from './dto/weather.dto';
import { ForecastQueryParams, WeatherQueryParams } from './params';
import { WeatherMapper } from './weather.mapper';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly weatherMapper: WeatherMapper,
  ) {}

  @Get()
  async getWeather(@Query() params: WeatherQueryParams): Promise<WeatherDto> {
    const weatherRes = await this.weatherService.getWeatherForDay(params);

    return this.weatherMapper.fromResponseToDto(weatherRes);
  }

  @Get('/forecast')
  async getForecast(@Query() params: ForecastQueryParams) {
    const forecast = await this.weatherService.getFiveDaysForecast(params);

    return forecast.map(this.weatherMapper.fromResponseToDto);
  }
}
