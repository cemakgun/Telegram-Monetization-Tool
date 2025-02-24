import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

export interface AnalyticsData {
  channelId: string;
  views: number;
  subscribers: number;
  revenue: number;
}

export interface AnalyticsState {
  data: AnalyticsData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AnalyticsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async ({ channelId, period }: { channelId: string; period: string }) => {
    const response = await api.getAnalytics(channelId, period);
    return response;
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch analytics';
      });
  },
});

export default analyticsSlice.reducer;
