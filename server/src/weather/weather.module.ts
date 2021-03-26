import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { WeatherMapper } from './weather.mapper';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        ...config.get('redis'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherMapper],
})
export class WeatherModule {}
