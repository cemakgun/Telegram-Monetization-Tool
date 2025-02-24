import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

interface Subscription {
  id: string;
  channelId: string;
  planName: string;
  price: number;
  subscriberCount: number;
}

interface SubscriptionsState {
  items: Subscription[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SubscriptionsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async () => {
    const response = await api.getSubscriptions();
    return response;
  }
);

export const createSubscription = createAsyncThunk(
  'subscriptions/createSubscription',
  async (planData: Partial<Subscription>) => {
    const response = await api.createSubscription(planData);
    return response;
  }
);

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch subscriptions';
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default subscriptionsSlice.reducer;
