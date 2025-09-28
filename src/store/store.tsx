// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import zodiacReducer from './slices/zodiac_slice';

export const store = configureStore({
  reducer: {
    zodiac: zodiacReducer,
    // other reducers...
  },
});

// Export RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
