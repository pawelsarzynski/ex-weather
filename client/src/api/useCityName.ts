import { useQuery } from 'react-query';

import { Coords } from '../shared/types';

export function useCityName(position: Coords | null) {
  return useQuery<string, Error>(
    'cityName',
    async () => {
      if (!position) return;

      const response = await fetch(
        `api/city?lat=${position.latitude}&lng=${position.longitude}`,
      );

      const { city } = await response.json();

      return city;
    },
    { enabled: !!position },
  );
}
