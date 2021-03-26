export type Weather = {
  city: string;
  date: string;
  country: string;
  tempC: number;
  tempF: number;
  condition: string;
  icon: string;
  isDay: boolean;
  windKph: number;
  pressureMb?: number;
  updatedAt: string;
};
