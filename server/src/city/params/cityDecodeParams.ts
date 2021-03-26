import { Transform } from 'class-transformer';
import { IsDefined, IsLatitude, IsLongitude } from 'class-validator';

export class CityDecodeParams {
  @Transform(({ value }) => +value)
  @IsLatitude()
  @IsDefined()
  lat: number;

  @Transform(({ value }) => +value)
  @IsLongitude()
  @IsDefined()
  lng: number;
}
