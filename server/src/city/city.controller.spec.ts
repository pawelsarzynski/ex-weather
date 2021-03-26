import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';

describe('CityController', () => {
  let cityController: CityController;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [CityController],
      providers: [CityService],
    }).compile();

    cityService = module.get<CityService>(CityService);
    cityController = module.get<CityController>(CityController);
  });

  describe('decodeCity', () => {
    const params = { lat: 30, lng: 9 };

    it('should call service with params and return city', async () => {
      jest
        .spyOn(cityService, 'reverseGeocode')
        .mockImplementation(async () => 'rzeszow');

      const result = await cityController.decodeCity(params);

      expect(result).toEqual({ city: 'rzeszow' });
      expect(cityService.reverseGeocode).toHaveBeenCalledWith(params);
    });
  });
});
