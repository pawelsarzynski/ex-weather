import { useQuery } from 'react-query';

import { Weather } from '../shared/types';

export function useForecast(city?: string) {
  return useQuery<Weather[], Error>(
    'forecast',
    async () => {
      const response = await fetch(`api/weather/forecast?city=${city}`);

      return response.json();
    },
    { enabled: !!city },
  );
}
