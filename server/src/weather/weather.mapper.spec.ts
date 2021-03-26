import { WeatherApiResponseDto } from './dto/weatherApiResponse.dto';
import { WeatherDto } from './dto/weather.dto';
import { WeatherMapper } from './weather.mapper';

const response = {
  location: {
    name: 'rzeszow',
    country: 'usa',
  },
  current: {
    is_day: 0,
    pressure_mb: 999,
    temp_c: 15,
    temp_f: 50,
    wind_kph: 35,
    last_updated: '10-12-2020',
    condition: {
      text: 'sunny',
      icon: '//url',
      code: 100,
    },
  },
} as WeatherApiResponseDto;

const dtoFixture = new WeatherDto();
Object.assign(dtoFixture, {
  city: 'rzeszow',
  updatedAt: '10-12-2020',
  country: 'usa',
  tempC: 15,
  tempF: 50,
  condition: 'sunny',
  icon: '//url',
  isDay: false,
  windKph: 35,
  pressureMb: 999,
});

describe('WeatherMapper', () => {
  let weatherMapper: WeatherMapper;

  beforeEach(() => {
    weatherMapper = new WeatherMapper();
  });

  describe('fromResponseToDto', () => {
    it('should map response to dto', () => {
      const dto = weatherMapper.fromResponseToDto(response);

      expect(dto).toStrictEqual(dtoFixture);
    });
  });
});
