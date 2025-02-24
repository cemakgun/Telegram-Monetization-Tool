import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice';
import analyticsReducer from './slices/analyticsSlice';
import subscriptionsReducer from './slices/subscriptionsSlice';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    analytics: analyticsReducer,
    subscriptions: subscriptionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
