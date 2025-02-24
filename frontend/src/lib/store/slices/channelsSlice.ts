import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

interface Channel {
  id: string;
  name: string;
  username: string;
  subscriberCount: number;
  isMonetized: boolean;
}

interface ChannelsState {
  items: Channel[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChannelsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunks
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await api.getChannels();
    return response;
  }
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (channelData: Partial<Channel>) => {
    const response = await api.addChannel(channelData);
    return response;
  }
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch channels';
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default channelsSlice.reducer;
