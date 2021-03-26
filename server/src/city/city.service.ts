import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Client,
  Status,
  AddressType,
  Language,
} from '@googlemaps/google-maps-services-js';
import { remove as removeAccents } from 'remove-accents';

import { CityDecodeParams } from './params';

@Injectable()
export class CityService {
  private readonly logger = new Logger(CityService.name);

  constructor(private configService: ConfigService) {}

  async reverseGeocode({ lat, lng }: CityDecodeParams): Promise<string> {
    const { key } = this.configService.get('google');

    try {
      const googleApiClient = new Client();
      const result = await googleApiClient.reverseGeocode({
        params: {
          latlng: { lat, lng },
          key,
          language: Language.en,
        },
      });

      if (result?.data?.status === Status.OK) {
        const city = result?.data?.results[0]?.address_components.find(
          ({ types }) => types.includes(AddressType.political),
        ).long_name;

        return removeAccents(city);
      } else {
        this.logger.warn('Geocoding: No results found', result?.data?.status);

        return '';
      }
    } catch (error) {
      this.logger.error('Geocoding: Error', error);
      throw new BadRequestException(error);
    }
  }
}
