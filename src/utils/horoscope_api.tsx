import horoscopeData from '../data/horoscope';
import type { ZodiacSign } from '../store/slices/zodiac_slice';

export const fetchHoroscope = async (sign: ZodiacSign): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(horoscopeData[sign]);
    }, 500);
  });
};
