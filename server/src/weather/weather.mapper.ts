import { Injectable } from '@nestjs/common';

import { WeatherDto } from './dto/weather.dto';
import { WeatherApiResponseDto } from './dto/weatherApiResponse.dto';

@Injectable()
export class WeatherMapper {
  fromResponseToDto({ current, location }: WeatherApiResponseDto): WeatherDto {
    const dto = new WeatherDto();

    dto.city = location.name;
    dto.condition = current.condition.text;
    dto.country = location.country;
    dto.icon = current.condition.icon;
    dto.isDay = !!current.is_day;
    dto.pressureMb = current.pressure_mb;
    dto.tempC = current.temp_c ?? current.avgtemp_c;
    dto.tempF = current.temp_f ?? current.avgtemp_f;
    dto.windKph = current.wind_kph;
    dto.updatedAt = current.last_updated ?? current.date;

    return dto;
  }
}
