import { BadRequestException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { CityService } from './city.service';

const reverseGeocodeMock = jest.fn();

jest.mock('@googlemaps/google-maps-services-js', () => ({
  Client: jest.fn(() => ({ reverseGeocode: reverseGeocodeMock })),
  Language: {
    en: 'eng',
  },
  Status: { OK: 'OK' },
  AddressType: {
    political: 'political',
  },
}));

describe('CityService', () => {
  let service: CityService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [CityService],
    }).compile();

    service = module.get<CityService>(CityService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('reverseGeocode', () => {
    const params = { lat: 30, lng: 9 };

    beforeEach(() => {
      jest
        .spyOn(configService, 'get')
        .mockImplementation(() => ({ key: 'api-key' }));
    });

    it('should call api with expected params and return city', async () => {
      reverseGeocodeMock.mockResolvedValueOnce({
        data: {
          status: 'OK',
          results: [
            {
              formatted_address: 'Neverwhere',
              address_components: [
                { types: ['street_number'], long_name: '221' },
                { types: ['route'], long_name: 'Baker Street' },
                { types: ['country'], long_name: 'United Kingdom' },
                { types: ['political'], long_name: 'London' },
                { types: ['neighborhood'], long_name: 'Greater London' },
              ],
            },
          ],
        },
      });

      const result = await service.reverseGeocode(params);

      expect(result).toBe('London');
      expect(reverseGeocodeMock).toHaveBeenCalledWith({
        params: {
          latlng: { lat: 30, lng: 9 },
          key: 'api-key',
          language: 'eng',
        },
      });
    });

    it('should call api with expected params and return empty string when response status is not OK', async () => {
      reverseGeocodeMock.mockResolvedValueOnce({
        data: {
          status: ':(',
          results: [],
        },
      });

      const result = await service.reverseGeocode(params);

      expect(result).toBe('');
      expect(reverseGeocodeMock).toHaveBeenCalledWith({
        params: {
          latlng: { lat: 30, lng: 9 },
          key: 'api-key',
          language: 'eng',
        },
      });
    });

    it('should call api with expected params and throw BadRequestException when error ocurred', async () => {
      reverseGeocodeMock.mockRejectedValueOnce('error');
      try {
        expect(await service.reverseGeocode(params)).toThrowError();
      } catch (error) {
        expect(error).toEqual(new BadRequestException('error'));
        expect(reverseGeocodeMock).toHaveBeenCalledWith({
          params: {
            latlng: { lat: 30, lng: 9 },
            key: 'api-key',
            language: 'eng',
          },
        });
      }
    });
  });
});
