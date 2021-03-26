import { Controller, Get, Query } from '@nestjs/common';

import { CityService } from './city.service';
import { CityDecodeParams } from './params';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async decodeCity(
    @Query() params: CityDecodeParams,
  ): Promise<{ city: string }> {
    const city = await this.cityService.reverseGeocode(params);

    return { city };
  }
}
