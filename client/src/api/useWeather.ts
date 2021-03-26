import { useQuery } from 'react-query';

import { Weather } from '../shared/types';

export function useWeather(city: string = '', day?: number) {
  return useQuery<Weather, Error>(
    ['weather', city, day],
    async () => {
      if (!city || !day) return;

      const response = await fetch(`api/weather/?city=${city}&day=${day}`);

      return response.json();
    },
    { enabled: !!city },
  );
}
