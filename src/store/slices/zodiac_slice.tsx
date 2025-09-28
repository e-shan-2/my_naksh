// src/store/slices/zodiac_slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define ZodiacSign type explicitly
export type ZodiacSign = 
  | 'aries' 
  | 'taurus' 
  | 'gemini' 
  | 'cancer' 
  | 'leo' 
  | 'virgo' 
  | 'libra' 
  | 'scorpio' 
  | 'sagittarius' 
  | 'capricorn' 
  | 'aquarius' 
  | 'pisces';

interface ZodiacState {
  selectedSign: ZodiacSign;
}

const initialState: ZodiacState = {
  selectedSign: 'aries',
};

const zodiacSlice = createSlice({
  name: 'zodiac',
  initialState,
  reducers: {
    setSelectedSign: (state, action: PayloadAction<ZodiacSign>) => {
      state.selectedSign = action.payload;
    },
  },
});

export const { setSelectedSign } = zodiacSlice.actions;
export default zodiacSlice.reducer;
