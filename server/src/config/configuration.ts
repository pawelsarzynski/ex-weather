export default () => ({
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    ttl: parseInt(process.env.REDIS_TTL),
  },
  google: {
    key: process.env.GOOGLE_GEOCODING_KEY,
  },
  weatherApi: {
    url: process.env.WEATHER_API_URL,
    key: process.env.WEATHER_API_KEY,
  },
});
