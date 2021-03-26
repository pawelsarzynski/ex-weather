import {
  BadRequestException,
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Cache } from 'cache-manager';

import { WeatherApiResponseDto } from './dto/weatherApiResponse.dto';
import { ForecastQueryParams, WeatherQueryParams } from './params';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getWeatherForDay({
    city,
    day,
  }: WeatherQueryParams): Promise<WeatherApiResponseDto> {
    const { url, key } = this.configService.get('weatherApi');

    const cachedWeather = (await this.cacheManager.get(
      `${city}-weather-${day}`,
    )) as WeatherApiResponseDto;

    if (cachedWeather) return cachedWeather;

    try {
      const weatherTimestamp = new Date().setDate(day);
      const weatherDate = new Date(weatherTimestamp).toISOString().slice(0, 10);

      const { data } = await axios.get(
        `${url}/forecast.json?key=${key}&q=${city}&dt=${weatherDate}`,
      );

      await this.cacheManager.set(`${city}-weather-${day}`, data);

      return data;
    } catch (error) {
      this.handleError(error, 'Weather');
    }
  }

  async getFiveDaysForecast({
    city,
  }: ForecastQueryParams): Promise<WeatherApiResponseDto[]> {
    const { url, key } = this.configService.get('weatherApi');

    const cachedForecast = (await this.cacheManager.get(
      `${city}-forecast`,
    )) as WeatherApiResponseDto[];

    if (cachedForecast) return cachedForecast;

    try {
      const {
        data: {
          forecast: { forecastday: days },
          location,
        },
      } = await axios.get(`${url}/forecast.json?key=${key}&q=${city}&days=5`);

      const dailyForecast = days.map(({ date, day }) => ({
        current: { date, ...day },
        location,
      }));

      await this.cacheManager.set(`${city}-forecast`, dailyForecast);

      return dailyForecast;
    } catch (error) {
      this.handleError(error, 'Forecast');
    }
  }

  private handleError = (error, resource: 'Forecast' | 'Weather') => {
    this.logger.error(error);

    if (error?.response?.status === 400) throw new BadRequestException();
    if (error?.response?.status === 404)
      throw new NotFoundException(`${resource} not found.`);

    throw new InternalServerErrorException(
      `Something went wrong while getting ${resource.toLocaleLowerCase()}.`,
    );
  };
}
