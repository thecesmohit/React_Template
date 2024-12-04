import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

export const getUsers = createAsyncThunk(
  'getUsers/getUsers',
  async (_, thunkAPI) => {
    try {
      console.log("thunk call",apiClient);
      const response = await apiClient.get('/Users');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch Users');
    }
  }
);

const getUsersSlice = createSlice({
  name: 'getUsers',
  initialState: {
    users: [],
    loading: false,
    error: '' as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        console.log("thunk call slice");
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? String(action.payload) : null;
      
      });
  },
});

export default getUsersSlice.reducer;