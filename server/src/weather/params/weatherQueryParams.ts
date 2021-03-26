import { Transform } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

import { IsDayInMonth } from 'src/shared/validators';
import { ForecastQueryParams } from './forecastQueryParams';

export class WeatherQueryParams extends ForecastQueryParams {
  @Transform(({ value }) => +value)
  @IsInt()
  @IsDayInMonth()
  @Min(new Date().getDate(), {
    message: 'To read historical data a paid API is required',
  })
  @IsDefined()
  day: number;
}
