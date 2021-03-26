import { useState, useEffect } from 'react';

import { Coords } from '../types';

export function usePosition() {
  const [position, setPosition] = useState<Coords | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onLocationChange = ({ coords }: GeolocationPosition) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setError(null);
  };
  const onError = (err: { message: string }) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;
    const options = { timeout: 10000, maximumAge: 30000 };

    if (!geolocation) {
      setError('NOT SUPPORTED');
      return;
    }

    geolocation.getCurrentPosition(onLocationChange, onError, options);
  }, []);

  return { position, error };
}
