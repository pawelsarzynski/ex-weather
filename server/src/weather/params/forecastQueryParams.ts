import { IsDefined, IsString } from 'class-validator';

export class ForecastQueryParams {
  @IsString()
  @IsDefined()
  city: string;
}
